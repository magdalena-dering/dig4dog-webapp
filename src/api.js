export const getPictures = (page) =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=52b91cab9d9970ca63cf75a911377263&text=dogs&per_page=100&page=${page}&format=json&nojsoncallback=1&extras=description, date_taken, owner_name`;


export const getOther = (page, user) =>
  `https://api.flickr.com/services/rest/?method=flickr.people.getPhotosOf&api_key=52b91cab9d9970ca63cf75a911377263&user_id=${user}&per_page=100&page=${page}&format=json&nojsoncallback=1&extras=description, date_taken, owner_name`;
