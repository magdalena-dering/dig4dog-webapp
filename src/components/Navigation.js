import React from 'react';
import {Container, Row, Col} from 'react-grid-system';

import {Link} from 'react-router-dom';

import * as routes from '../shared/routes';

export class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hidden: true}
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if (window.scrollY >= window.innerHeight) {
      this.setState({hidden: false})
    }
    if (window.scrollY === 0) {
      this.setState({hidden: true})
    }
  };

  render() {
    return (
      <div className="navigation-wrapper">
        <Container>
          <Row>
            <Col>
              <div className="navigation">
                <Link to={routes.DASHBOARD}><h1>Dig4Dog</h1></Link>
                <div>
                  <button type="button" onClick={() => window.scrollTo({top: 0, behavior: "smooth"})} className={this.state.hidden?"hidden":""}>
                    {this.state.hidden ? <div style={{width: 30, height: 30}}/> : <div className="up"/>}
                  </button>
                  <Link to={routes.MAP}>
                    <div className="map"/>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Navigation;
