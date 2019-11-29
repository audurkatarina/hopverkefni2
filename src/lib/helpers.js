export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

export function el(name, text, ...children) {
  const element = document.createElement(name);

  if (text) {
    element.appendChild(document.createTextNode(text));
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }
  return element;
}

/*
** Fyrir forsíðu
*/

export function createThumb(slug) {
  const link = el('a');
  link.href = `fyrirlestur.html?slug=${slug}`;
  link.classList.add('listItem');
  return link;
}

export function createCheck(finished) {
  const check = el('div', '✓');
  check.classList.add('listItem__check');
  if (finished) {
    check.classList.add('listItem__checked');
  }
  return check;
}

// Mynd fyrir thumbnail
export function createImage(path) {
  if (!path) {
    const noImageElement = el('img');
    noImageElement.src = './img/ljosgrar.png';
    noImageElement.classList.add('listItem__mynd');
    return noImageElement;
  }
  const imageElement = el('img');
  imageElement.src = `${path}`;
  imageElement.classList.add('listItem__mynd');
  return imageElement;
}

// Texti fyrir thumbnail
export function createTitle(title, cat) {
  const div = el('div');
  div.classList.add('text');

  const catElement = el('h4', cat);
  catElement.classList.add('listItem__cat');
  const titleElement = el('h1', title);
  titleElement.classList.add('listItem__title');

  div.appendChild(catElement);
  div.appendChild(titleElement);
  return div;
}

export function createBottom(title, cat, finished) {
  const bottom = el('div');
  bottom.classList.add('listItem__bottom');

  const textBox = createTitle(title, cat);
  const check = createCheck(finished);

  bottom.appendChild(textBox);
  bottom.appendChild(check);
  return bottom;
}

/*
** Fyrir fyrirlestrasíðu
*/

function createVideo(data) {
  const iframe = el('iframe');
  iframe.setAttribute('src', data);
  iframe.classList.add('fyrirlestur__video');
  const videoContainer = el('div');
  videoContainer.classList.add('fyrirlestur__vContainer');
  videoContainer.appendChild(iframe);
  return videoContainer;
}

function splitText(data) {
  const s = data.split('\n');
  return s;
}

function createText(data) {
  const div = el('div');
  const p = splitText(data);

  for (let j = 0; j < p.length; j += 1) {
    const pg = el('p', p[j]);
    pg.classList.add('fyrirlestur__p');
    div.appendChild(pg);
  }

  div.classList.add('fyrirlestur__texti');
  return div;
}

function createQuote(data, attribute) {
  const quote = el('blockquote');
  const dataElement = el('div', data);
  dataElement.classList.add('data');
  quote.appendChild(dataElement);
  const attElement = el('div', attribute);
  attElement.classList.add('attribute');
  quote.appendChild(attElement);
  quote.classList.add('fyrirlestur__quote');
  return quote;
}

function createLectureImage(data, caption) {
  const imgContainer = el('div');
  const img = el('img');
  img.setAttribute('src', data);
  imgContainer.appendChild(img);
  imgContainer.appendChild(document.createTextNode(caption));
  img.setAttribute('alt', caption);
  imgContainer.classList.add('fyrirlestur__mynd');
  return imgContainer;
}

function createHeading(data) {
  const heading = el('h1', data);
  heading.classList.add('fyrirlestur__heading');
  return heading;
}

function createList(data) {
  const ul = el('ul');
  for (let i = 0; i !== data.length; i += 1) {
    const li = el('li', data[i]);
    li.classList.add('listiStak');
    ul.appendChild(li);
  }
  ul.classList.add('fyrirlestur__listi');
  return ul;
}

function createCode(data) {
  const code = el('code', data);
  code.classList.add('fyrirlestur__code');
  return code;
}

export function createContent(type, data, attribute, caption) {
  if (type === 'youtube') {
    return createVideo(data);
  } if (type === 'text') {
    return createText(data);
  } if (type === 'quote') {
    return createQuote(data, attribute);
  } if (type === 'image') {
    return createLectureImage(data, caption);
  } if (type === 'heading') {
    return createHeading(data);
  } if (type === 'list') {
    return createList(data);
  } if (type === 'code') {
    return createCode(data);
  }
  throw new Error('Ekki rétt type');
}

// header
export function setHeaderText(title, category) {
  const cat = el('h4', category);
  cat.classList.add('header__category');
  const t = el('h1', title);
  t.classList.add('header__title');
  const text = el('div');
  text.appendChild(cat);
  text.appendChild(t);
  text.classList.add('header__text');

  return text;
}

export function setProtection() {
  const protection = el('div');
  protection.classList.add('img--protection');
  return protection;
}

export function setContainer(img) {
  const container = el('div');
  container.classList.add('header__img');
  container.style.background = `url(${img})`;
  container.style.backgroundSize = 'cover';

  return container;
}
