export const setPictures = (resp) => ({
  pictures: resp.photos.photo,
  page: resp.photos.page,
  loading: false,
  error: false,
  message: ''
});

export const loadPictures = (resp) => (prevState) => ({
  pictures: [...prevState.pictures, ...resp.photos.photo],
  page: resp.photos.page,
  loading: false,
  error: false,
  message: ''
});