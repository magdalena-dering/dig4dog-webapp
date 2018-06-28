import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {Link} from 'react-router-dom';

import * as routes from '../shared/routes';


const Landing = () =>
  <Container>
    <Row>
      <Col xs={12}>
        <div className="full-page">
          <Link to={routes.DASHBOARD} className="button">Search</Link>
        </div>
      </Col>
    </Row>
  </Container>;

export default Landing;