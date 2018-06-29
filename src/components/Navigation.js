import React from 'react';
import {Container, Row, Col} from 'react-grid-system';

import {Link} from 'react-router-dom';

import * as routes from '../shared/routes';

export default () =>
  <div className="navigation-wrapper">
    <Container>
      <Row>
        <Col>
          <div className="navigation">
            <Link to={routes.DASHBOARD}><h1>Dog4Dog</h1></Link>
            <div>
              <Link to={routes.MAP}>
                <div className="map"/>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>