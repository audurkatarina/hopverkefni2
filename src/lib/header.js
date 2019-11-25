export default class Header {
  constructor() {
    this.container = document.querySelector('.header');
    this.url = './lectures.json';
  }

  setHeader(title, category, image) {
    const text = setHeaderText(title, category);
    const protection = setProtection();
    const container = setContainer(image);
  }

  setHeaderText(title, category) {
    const cat = createElement('h4', category);
    cat.classList.add('header__category');
    const t = createElement('h1', title);
    t.classList.add('header__title');
    const text = createElement('div');
    text.appendChild(cat);
    text.appendChild(t);
    text.classList.add('header__text');

    return tArea;
  }

  setProtection() {
    const protection = createElement('div');
    protection.classList.add('img--protection');
    return protection;
  }

  setContainer(img) {
    const container = createElement('div');
    container.classList.add('header__img');
    container.style.background = `url(${img})`;
    // container.style.backgroundPosition = '50% 50%';
    container.style.backgroundSize = 'cover';

    return container;
  }
}
