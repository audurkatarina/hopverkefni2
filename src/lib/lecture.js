import { createContent } from './helpers';

export default class Lecture {
  constructor() {
    this.container = document.querySelector('.fyrirlestur');
    this.url = '../lectures.json';
  }

  renderLecture(lecture) {
    const { content } = lecture;
    content.forEach((item) => {
      this.container.appendChild(createContent(item.type, item.data));
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
