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
    }
  }

  componentDidMount() {
    this.fetchPictures(0)
  }

  fetchPictures = (page) => {
    this.setState({loading: true});

    fetch(getPicturesWithLocations(page, 52.237049, 21.017532))
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
      .then(() => this.loadMap())
      .then(() => this.setMarkers());
  };

  setMarkers = () => {
    this.state.ids.forEach(id => {
      fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=be817c154904ed005a7309931302292b&photo_id=${id}&format=json&nojsoncallback=1`)
        .then(resp => resp.json())
        .then(resp => {
          if (resp.message) {
            this.setState({loading: false, error: true, message: resp.message});
          } else {

            if (this.props) {
              new this.props.google.maps.Marker({
                position: {lat: parseFloat(resp.photo.location.latitude), lng: parseFloat(resp.photo.location.longitude)},
                map: this.map,
                icon: Marker
              });
            }
          }
        })
    })
  };

  loadMap() {
    if (this.props) {
      const mapConfig = Object.assign({}, {
        center: {lat: 52.237049, lng: 21.017532},
        zoom: 11,
        mapTypeId: 'roadmap',
        styles: MapStyles
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
            <div className="full-page">
              {this.state.error ?
                <div>
                  <p>An error occured!</p>
                  <p>{this.state.message}</p>
                </div> :
                <div ref="map" style={{width: '100%', height: '75vh'}}>
                  <div className="full-page">
                    <p>Loading map...</p>
                  </div>
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
  apiKey: 'AIzaSyAR5fkhOWtnrd2SC09-ZKOXjHZKrhElaec',
  LoadingContainer: Loader
})(MapPage)