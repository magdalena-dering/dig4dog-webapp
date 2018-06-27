import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pictures: []}
  }

  componentDidMount() {
    fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f30805949d59829de1f62b774103a3c2&text=dogs&per_page=100&page=1&format=json&nojsoncallback=1')
      .then(resp => {
        return resp.json();
      })
      .then(resp => {
        let pictures = resp.photos.photo;

        this.setState({pictures: pictures})
      });
  }

  render() {
    return (
      <div>
        <div className="gallery-wrapper">
          {this.state.pictures.length > 0 && this.state.pictures.map(picture => {
            let path = 'https://farm' + picture.farm + '.staticflickr.com/' + picture.server + '/' + picture.id + '_' + picture.secret + '_s.jpg';
            return <img key={picture.id} src={path} alt={'dogs'}/>
          })}
        </div>
      </div>
    );
  }
}

export default App;
