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
    const noImageElement = el('div');
    noImageElement.classList.add('listItem__noImg');
    return noImageElement;
  }
  const imageElement = el('img');
  imageElement.src = `../../${path}`;
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
  // Bæta við attribute og classList
  return iframe;
}

function createText(data) {
  const div = el('div', data);
  // Bæta við classList
  return div;
}

function createQuote(data, attribute) {
  const quote = el('blockquote');
  quote.appendChild(document.createTextNode(data));
  quote.appendChild(document.createTextNode(attribute));
  // Bæta við classList
  return quote;
}

function createLectureImage(data, caption) {
  const img = el('img');
  img.setAttribute('src', data);
  img.setAttribute('alt', caption);
  // Bæta við classList
  return img;
}

function createHeading(data) {
  const heading = el('h1', data);
  // Bæta við classList
  return heading;
}

function createList(data) {
  const ul = el('ul');
  for (let i = 0; i !== data.length; i += 1) {
    const li = el('li', data[i]);
    ul.appendChild(li);
  }
  // Bæta við classList
  return ul;
}

function createCode(data) {
  const code = el('code', data);
  // Bæta við classList
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
