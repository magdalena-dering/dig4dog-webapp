import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {Link} from 'react-router-dom';

import * as routes from '../shared/routes';


export default () =>
  <Container>
    <Row>
      <Col xs={10} md={6} lg={4} offset={{xs: 1, md: 3, lg: 4}}>
        <div className="full-page landing">
          <h1 className="blink">¡Hello!</h1>
          <h2>This app allows you to view photos of&nbsp;dogs from flickr.</h2>
          <Link to={routes.DASHBOARD} className="button">I want to see these dogs!</Link>
        </div>
      </Col>
    </Row>
  </Container>;