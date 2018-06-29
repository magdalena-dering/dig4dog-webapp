import React from 'react';
import {Container, Row, Col} from 'react-grid-system';
import {Link, withRouter} from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import * as routes from '../shared/routes';
import {getPictures} from '../api';
import {setPictures, loadPictures} from '../shared/helper';

import Loader from '../components/Loader';

import 'react-datepicker/dist/react-datepicker.css';

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [],
      page: null,
      loading: false,
      error: false,
      message: '',
      filters: false,
      title: '',
      author: '',
      date: null
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

  updateSearch(e) {
    switch (e.target.id) {
      case 'title':
        this.setState({title: e.target.value.substr(0, 20)});
        break;
      case 'author':
        this.setState({author: e.target.value.substr(0, 20)});
        break;
      default:
        this.setState({title: '', author: ''});
    }
  }

  render() {
    let filteredPictures = this.state.pictures.filter(
      picture => {
        if (this.state.title.length > 0) {
          return picture.title.toLowerCase().indexOf(this.state.title.toLowerCase()) !== -1
        }
        if (this.state.author.length > 0) {
          return picture.ownername.toLowerCase().indexOf(this.state.author.toLowerCase()) !== -1
        }
        if (this.state.date) {
          return moment(picture.datetaken).format("YYYY-MM-DD") === moment(this.state.date).format("YYYY-MM-DD")
        }
        else {
          return picture
        }
      }
    );

    return (
      <Container>
        <Row>
          <Col xs={12}>
            {this.state.loading ?
              <Loader/> :
              <div>
                <div className="filters-wrapper">
                  <div className="filters-controls">
                    <h2>Filters</h2>
                    <button type="button" className={`filters-button${this.state.filters ? " active" : ""}`} onClick={() => this.setState({filters: !this.state.filters})}/>
                  </div>
                  {this.state.filters ?
                    <div className="filters">
                      <div className="field">
                        <label htmlFor="title">Title:</label>
                        <input className="input" id="title" type="text"
                               value={this.state.title}
                               placeholder="Search by title"
                               onChange={e => this.updateSearch(e)}/>
                      </div>
                      <div className="field">
                        <label htmlFor="author">Author:</label>
                        <input className="input" id="author" type="text"
                               value={this.state.author}
                               placeholder="Search by author"
                               onChange={e => this.updateSearch(e)}/>
                      </div>
                      <div className="field">
                        <label htmlFor="">Date:</label>
                        <DatePicker selected={this.state.date}
                                    onChange={date => this.setState({date: date})}
                                    placeholderText="Search by date"
                                    dateFormat="YYYY-MM-DD"/>
                      </div>
                    </div> : null
                  }
                </div>
                <div className="gallery-wrapper">
                  {filteredPictures.length > 0 && filteredPictures.map(picture => {
                    let url = 'https://www.flickr.com/photos/' + picture.owner + '/' + picture.id;
                    let path = 'https://farm' + picture.farm + '.staticflickr.com/' + picture.server + '/' + picture.id + '_' + picture.secret + '.jpg';
                    let date = moment(picture.datetaken).format("YYYY-MM-DD");

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
                  {filteredPictures.length === 0 &&
                  <div className="full-page">
                    <p>No results!</p>
                  </div>
                  }
                  {this.state.error &&
                  <div className="full-page">
                    <p>An error occured!</p>
                    <p>{this.state.message}</p>
                  </div>
                  }
                </div>
              </div>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(DashboardPage);