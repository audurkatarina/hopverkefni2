import { setHeaderText, setProtection, setContainer } from './helpers';

export default class Header {
  constructor() {
    this.container = document.querySelector('.header');
    this.url = './lectures.json';
  }

  setHeader(title, category, image) {
    const text = setHeaderText(title, category);
    const protection = setProtection();
    const container = setContainer(image);

    protection.appendChild(text);
    container.appendChild(protection);

    this.container.appendChild(container);
  }
}
