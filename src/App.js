import React from 'react';
import {Container, Row, Col} from 'react-grid-system';


const getPictures = (page) =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=52b91cab9d9970ca63cf75a911377263&text=dogs&per_page=100&page=${page}&format=json&nojsoncallback=1&extras=description, date_taken, owner_name`;


const setPictures = (resp) => ({
  pictures: resp.photos.photo,
  page: resp.photos.page,
  loading: false,
  error: false,
  message: ''
});

const loadPictures = (resp) => (prevState) => ({
  pictures: [...prevState.pictures, ...resp.photos.photo],
  page: resp.photos.page,
  loading: false,
  error: false,
  message: ''
});

class App extends React.Component {
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
      <div className="background">
        <Container>
          <Row>
            <Col xs={12}>
              {this.state.loading ?
                <div className="gallery-loader">
                  <div className="ball"/>
                </div> :
                <div className="gallery-wrapper">
                  {this.state.pictures.length > 0 && this.state.pictures.map(picture => {
                    let path = 'https://farm' + picture.farm + '.staticflickr.com/' + picture.server + '/' + picture.id + '_' + picture.secret + '.jpg';

                    // console.log(picture)

                    let date = picture.datetaken.match(/\d{4}-\d{2}-\d{2}/);

                    return (
                      <div key={picture.id} className="picture">
                        <img src={path} alt={'dogs'}/>
                        <div className="caption">
                          {picture.description._content.length > 0 ? <p>{picture.description._content}</p> : <p>--- no description ---</p>}
                          <div>
                            <p style={{marginRight: 20}}>{picture.ownername}</p>
                            <p>{date}</p>
                          </div>
                        </div>
                      </div>)
                  })}
                  {this.state.error &&
                  <div className="error">
                    <p>An error occured!</p>
                    <p>{this.state.message}</p>
                  </div>
                  }
                </div>
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
