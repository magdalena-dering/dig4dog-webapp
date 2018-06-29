import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {GoogleApiWrapper} from 'google-maps-react' ;

import {getPicturesWithLocations} from '../api';

import Loader from '../components/Loader';
import MapStyles from '../media/styles';
import Marker from '../media/location-marker.png';


class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ids: [],
      loading: false,
      error: false,
      message: '',
      apiError: false,
      apiMessage: ''
    }
  }

  componentDidMount() {
    const geolocation = navigator.geolocation;

    new Promise((resolve, reject) => {
      if (!geolocation) {
        alert('Gelocation not supported');
      }

      geolocation.getCurrentPosition((position) => {
        resolve(position);
        this.loadMap(position.coords.latitude, position.coords.longitude);
        this.fetchPictures(0, position.coords.latitude, position.coords.longitude);
      }, () => {
        this.loadMap(52.237049, 21.017532);
        this.fetchPictures(0, 52.237049, 21.017532);
      });
    });
  };

  fetchPictures = (page, latitude, longitude) => {
    this.setState({loading: true});

    fetch(getPicturesWithLocations(page, latitude, longitude))
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message) {
          this.setState({loading: false, error: true, message: resp.message});
        }
        else {
          let ids = [];

          resp.photos.photo.forEach(photo => {
            ids.push(photo.id);
          });

          if (ids.length > 0) {
            this.setState({ids: ids, loading: false})
          } else {
            this.setState({loading: false})
          }
        }
      })
      .then(() => this.setMarkers())
  };

  setMarkers = () => {
    this.state.ids.forEach(id =>
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=4c09c61bc069a47addbbaf2b3003c6b2&photo_id=${id}&format=json&nojsoncallback=1`)
        .then(resp => resp.json())
        .then(resp => {
          if (resp.message) {
            this.setState({apiError: true, apiMessage: resp.message})
          } else {

            if (this.props) {
              new this.props.google.maps.Marker({
                position: {lat: parseFloat(resp.photo.location.latitude), lng: parseFloat(resp.photo.location.longitude)},
                map: this.map,
                icon: Marker
              });
            }
          }
        }))
  };

  loadMap(latitude, longitude) {
    if (this.props) {
      const mapConfig = Object.assign({}, {
        center: {lat: latitude, lng: longitude},
        zoom: 11,
        mapTypeId: 'roadmap',
        styles: MapStyles,
        icon: Marker
      });
      this.map = new this.props.google.maps.Map(this.refs.map, mapConfig);
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h2 style={{paddingTop: 100}}>Dogs in nearby</h2>
            {this.state.apiError &&
            <div>
              <p style={{textAlign: 'center'}}>Markers cannot be set</p>
              <p style={{textAlign: 'center'}}>{this.state.apiMessage}</p>
            </div>}
            <div className="full-page">
              {this.state.error ?
                <div>
                  <p>An error occured!</p>
                  <p>{this.state.message}</p>
                </div> :
                <div ref="map" style={{width: '100%', height: '75vh'}}>
                  <div className="full-page"/>
                </div>
              }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAGLEOolFTmtUnGAKOKWKBes5zE3Cqf6bg',
  LoadingContainer: Loader
})(MapPage)