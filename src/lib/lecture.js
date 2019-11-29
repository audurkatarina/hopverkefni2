import { el, createContent } from './helpers';
import Header from './header';

const fyrirlesturRow = el('div');

export default class Lecture {
  constructor() {
    this.header = new Header();
    this.container = document.querySelector('.fyrirlestur');
    this.container.classList.add('fyrirlestur');
    this.url = './lectures.json';

    this.finishedButton = this.finishL();
  }

  finishL() {
    const finishBtn = document.querySelector('.footer__button');
    finishBtn.addEventListener('click', this.onClick.bind(this));
    this.checkButton(finishBtn);
    return finishBtn;
  }

  onClick(e) {
    const slug = this.getSlug();
    save(slug);
    this.checkButton(e.target);
  }

  checkButton(button) {
    if (finish(this.getSlug())) {
      const div = el('div', '✓ Fyrirlestur kláraður');
      div.classList.add('footer__color');
      button.replaceChild(div, button.firstChild);
    }
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

  getSlug() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');
    return slug;
  }

  load() {
    const slug = this.getSlug();
    this.getLecture(slug);
  }
}
