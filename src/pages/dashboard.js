import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {Link, withRouter} from 'react-router-dom';

import * as routes from '../shared/routes';
import {getPictures} from '../api';
import {setPictures, loadPictures} from '../shared/helper';

import Loader from '../components/Loader';


class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      page: null,
      loading: false,
      error: false,
      message: ''
    }
  }

  componentDidMount() {
    this.fetchPictures(0);
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentDidUpdate() {
    window.scrollTo(0, window.innerHeight * 11 * (this.state.page - 1))
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll = () => {
    if ((window.innerHeight + window.scrollY) === (document.body.offsetHeight) && this.state.pictures.length > 0 && !this.state.loading) {
      this.fetchPictures(this.state.page + 1);
    }
  };

  fetchPictures = (page) => {
    this.setState({loading: true});

    fetch(getPictures(page))
      .then(resp => resp.json())
      .then(resp => {
        if (resp.message) {
          this.setState({loading: false, error: true, message: resp.message});
        }
        else {
          if (page === 0) {
            this.setState(setPictures(resp))
          } else {
            this.setState(loadPictures(resp))
          }
        }
      })
  };

  render() {
    return (
      <Container>
        <Row>
          <Col xs={12}>
            {this.state.loading ?
              <Loader/> :
              <div className="gallery-wrapper" style={{marginTop: 100}}>
                {this.state.pictures.length > 0 && this.state.pictures.map(picture => {
                  let url = 'https://www.flickr.com/photos/' + picture.owner + '/' + picture.id;
                  let path = 'https://farm' + picture.farm + '.staticflickr.com/' + picture.server + '/' + picture.id + '_' + picture.secret + '.jpg';
                  let date = picture.datetaken.match(/\d{4}-\d{2}-\d{2}/);

                  return (
                    <div key={picture.id} className="picture">
                      <a href={url} target="_blank" rel="noopener noreferrer"><img src={path} alt={picture.title}/></a>
                      <div className="caption">
                        <p style={{fontWeight: 700}}>{picture.title}</p>
                        {picture.description._content.length > 0 ? <p>{picture.description._content}</p> : <p>--- no description ---</p>}
                        <div>
                          <Link to={routes.USER + picture.owner}>
                            <p style={{marginRight: 20}}>{picture.ownername}</p>
                          </Link>
                          <p>{date}</p>
                        </div>
                      </div>
                    </div>)
                })}
                {this.state.error &&
                <div className="full-page">
                  <p>An error occured!</p>
                  <p>{this.state.message}</p>
                </div>
                }
              </div>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(DashboardPage);