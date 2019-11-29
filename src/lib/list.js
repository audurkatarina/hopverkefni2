import { empty, createImage, createBottom, createThumb, el } from './helpers'; /* eslint-disable-line */
import { loadLectures } from './storage'; /* eslint-disable-line */

const listRow = el('div');
const cat = Array(3).fill(false);

export default class List {
  constructor() {
    this.container = document.querySelector('.list');
    this.container.classList.add('list');
    this.url = './lectures.json';
    this.finishedLectures = loadLectures();

    this.htmlButton = document.querySelector('.buttons__HTML');
    this.cssButton = document.querySelector('.buttons__CSS');
    this.jsButton = document.querySelector('.buttons__JS');

    this.htmlButton.addEventListener('click', this.onClickHTML.bind(this));
    this.cssButton.addEventListener('click', this.onClickCSS.bind(this));
    this.jsButton.addEventListener('click', this.onClickJS.bind(this));
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

    let titleElement;
    if (this.finishedLectures.includes(item.slug)) {
      titleElement = createBottom(item.title, item.category, 'listItem__checked');
    } else {
      titleElement = createBottom(item.title, item.category);
    }
    thumbContainer.appendChild(titleElement);
  }

  renderData(data) {
    empty(listRow);
    listRow.classList.add('list__row');
    this.container.appendChild(listRow);

    if (cat[0] === true) {
      data.lectures.forEach((item) => {
        if (item.category === 'html') {
          this.renderItem(item);
        }
      });
    }
    if (cat[1] === true) {
      data.lectures.forEach((item) => {
        if (item.category === 'css') {
          this.renderItem(item);
        }
      });
    }
    if (cat[2] === true) {
      data.lectures.forEach((item) => {
        if (item.category === 'javascript') {
          this.renderItem(item);
        }
      });
    }
    if (cat[0] === false && cat[1] === false && cat[2] === false) {
      data.lectures.forEach((item) => {
        this.renderItem(item);
      });
    }
  }

  onClickHTML(e) {
    e.target.classList.toggle('buttons__selected');
    if (cat[0] === false) {
      cat[0] = true;
    } else {
      cat[0] = false;
    }
    this.load();
  }

  onClickCSS(e) {
    e.target.classList.toggle('buttons__selected');
    if (cat[1] === false) {
      cat[1] = true;
    } else {
      cat[1] = false;
    }
    this.load();
  }

  onClickJS(e) {
    e.target.classList.toggle('buttons__selected');
    if (cat[2] === false) {
      cat[2] = true;
    } else {
      cat[2] = false;
    }
    this.load();
  }

  load() {
    this.getLectures()
      .then((data) => {
        this.renderData(data);
      })
      .catch(error => console.error(error));
  }
}
