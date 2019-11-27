import { empty, createImage, createTitle, createThumb, el } from './helpers'; /* eslint-disable-line */
const listRow = el('div');

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.container.classList.add('list');

    this.url = '../lectures.json';
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
    const listCol = el('div');
    listCol.classList.add('list__col');
    listRow.appendChild(listCol);

    const thumbContainer = createThumb(item.slug);
    listCol.appendChild(thumbContainer);

    const imageElement = createImage(item.thumbnail);
    thumbContainer.appendChild(imageElement);

    const titleElement = createTitle(item.title, item.category);
    thumbContainer.appendChild(titleElement);
  }

  renderData(data) {
    listRow.classList.add('list__row');
    this.container.appendChild(listRow);

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
