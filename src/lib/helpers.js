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
    const noImageElement = el('div');
    noImageElement.classList.add('listItem__noImg');
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
