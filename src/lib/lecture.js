import { createContent, el } from './helpers';
const fyrirlesturRow = el('div');

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.fyrirlestur');
    this.container.classList.add('fyrirlestur');
    this.url = '../lectures.json';
  }

  renderLecture(lecture) {
    fyrirlesturRow.classList.add('fyrirlestur__row');
    this.container.appendChild(fyrirlesturRow);
    const { content } = lecture;
    content.forEach((item) => {
      fyrirlesturRow.appendChild(createContent(item.type, item.data));
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
        this.renderLecture(lecture);
      });
  }

  load() {
    const qs = new URLSearchParams(window.location.search);
    const slug = qs.get('slug');
    this.getLecture(slug);
  }
}
