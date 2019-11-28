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

export function createThumb(slug) {
  const link = el('a');
  link.href = `fyrirlestur.html?slug=${slug}`;
  link.classList.add('listItem');
  return link;
}

export function createImage(path) {
  if (!path) {
    const noImageElement = el('img');
    noImageElement.src = '../../img/ljosgrar.png';
    noImageElement.classList.add('listItem__mynd');
    return noImageElement;
  }
  const imageElement = el('img');
  imageElement.src = `../../${path}`;
  imageElement.classList.add('listItem__mynd');
  return imageElement;
}

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

// Fyrir fyrirlestrasíðu

function createVideo(data) {
  const iframe = el('iframe');
  iframe.setAttribute('src', data);
  iframe.classList.add('fyrirlestur__video');
  return iframe;
}

function createText(data) {
  const div = el('div', data);
  div.classList.add('fyrirlestur__texti')
  return div;
}

function createQuote(data, attribute) {
  const quote = el('blockquote');
  quote.appendChild(document.createTextNode(data));
  quote.appendChild(document.createTextNode(attribute));
  quote.classList.add('fyrirlestur__quote');
  return quote;
}

function createLectureImage(data, caption) {
  const img = el('img');
  img.setAttribute('src', data);
  img.setAttribute('alt', caption);
  img.classList.add('fyrirlestur__mynd');
  return img;
}

function createHeading(data) {
  const heading = el('h1', data);
  heading.classList.add('fyrirlestur__heading')
  return heading;
}

function createList(data) {
  const ul = el('ul');
  for (let i = 0; i !== data.length; i += 1) {
    const li = el('li', data[i]);
    ul.appendChild(li);
  }
  ul.classList.add('fyrirlestur__listi');
  return ul;
}

function createCode(data) {
  const code = el('code', data);
  code.classList.add('fyrirlestur__code')
  return code;
}

export function createContent(type, data) {
  if (type === 'youtube') {
    return createVideo(data);
  } if (type === 'text') {
    return createText(data);
  } if (type === 'quote') {
    return createQuote(data);
  } if (type === 'image') {
    return createLectureImage(data);
  } if (type === 'heading') {
    return createHeading(data);
  } if (type === 'list') {
    return createList(data);
  } if (type === 'code') {
    return createCode(data);
  }
  throw new Error('Ekki rétt type');
}
