import { el, createContent } from './helpers';
import Header from './header';

let finished = false;


const fyrirlesturRow = el('div');

export default class Lecture {
  constructor() {
    this.header = new Header();
    this.container = document.querySelector('.fyrirlestur');
    this.container.classList.add('fyrirlestur');
    this.url = './lectures.json';
    this.finishedButton = document.querySelector('.footer__button');
    this.finishedButton.addEventListener('click', this.onClick.bind(this));
  }

  onClick(e) {
    const div = el('div', '✓ Fyrirlestur kláraður');
    div.classList.add('footer__color');
    e.target.parentElement.insertBefore(div, e.target);
    e.target.remove();
    finished = true;
  }

  renderLecture(lecture) {
    fyrirlesturRow.classList.add('fyrirlestur__row');
    this.container.appendChild(fyrirlesturRow);
    const { content } = lecture;
    content.forEach((item) => {
      fyrirlesturRow.appendChild(createContent(item.type, item.data, item.attribute, item.caption));
    });
  }

  getLecture(slug) {
    return fetch(this.url)
      .then((response) => {
        if (!response) {
          throw new Error('Villa við að sækja fyrirlestra');
        }
        return response.json();
      })
      .then((data) => {
        const lecture = data.lectures.find(l => l.slug === slug);
        if (!lecture) {
          throw new Error('Villa. Fyrirlestur fannst ekki');
        }
        const { title, category, image } = lecture;
        this.header.setHeader(title, category, image);
        this.renderLecture(lecture);
      });
  }

  load() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');

    if (finished === false) {
      const div = el('div', 'Klára fyrirlestur');
      this.finishedButton.appendChild(div);
    }
    this.getLecture(slug);
  }
}
