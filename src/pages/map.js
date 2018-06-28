import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {GoogleApiWrapper} from 'google-maps-react' ;

import Loader from '../components/Loader';
import MapStyles from '../media/styles';

class MapPage extends React.Component {
  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    if (this.props) {
      const {google} = this.props;

      const mapConfig = Object.assign({}, {
        center: {lat: 52.237049, lng: 21.017532},
        zoom: 11,
        mapTypeId: 'roadmap',
        styles: MapStyles
      });

      this.map = new google.maps.Map(this.refs.map, mapConfig);
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            <h2 style={{paddingTop: 100}}>Dogs in nearby</h2>
            <div className="full-page">
              <div ref="map" style={{width: '100%', height: '75vh'}}>
                <p>Loading map...</p>
              </div>
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