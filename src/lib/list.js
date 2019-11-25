import { empty, createImage, createTitle, createThumb } from './helpers'; /* eslint-disable-line */

// const DATA_URL = '/lectures.json';

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.url = '../../lectures.json';
  }

  getLectures() {
    return fetch(this.url)
      .then((response) => {
        if (!response) {
          throw new Error('Villa við að sækja fyrirlestra');
        }
        return response.json();
      });
  }

  renderItem(item) {
    const thumbContainer = createThumb(item.slug);

    const imageElement = createImage(item.thumbnail);
    thumbContainer.appendChild(imageElement);

    const titleElement = createTitle(item.title, item.category);
    thumbContainer.appendChild(titleElement);

    this.container.appendChild(thumbContainer);
  }

  renderData(data) {
    /* for (let item of data.lectures) {
      this.renderItem(item);
    } */

    data.lectures.forEach((item) => {
      this.renderItem(item);
    });
  }

  load() {
    empty(this.container);
    this.getLectures()
      .then((data) => {
        this.renderData(data);
      })
      .catch(error => console.error(error));
  }
}
