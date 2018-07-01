export const API_KEY = 'ad1550bcddf6da94e4ee8dc9420beb1a';

export const getPictures = (page) =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=dogs&per_page=100&page=${page}&format=json&nojsoncallback=1&extras=description, date_taken, owner_name`;


export const getOther = (page, user) =>
  `https://api.flickr.com/services/rest/?method=flickr.people.getPhotosOf&api_key=${API_KEY}&user_id=${user}&per_page=100&page=${page}&format=json&nojsoncallback=1&extras=description, date_taken, owner_name`;

export const getPicturesWithLocations = (page, lat, lon) =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=dogs&per_page=10&page=${page}&format=json&nojsoncallback=1&lat=${lat}&lon=${lon}`;


export const getLocationsById = (id) =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${API_KEY}&photo_id=${id}&format=json&nojsoncallback=1`;