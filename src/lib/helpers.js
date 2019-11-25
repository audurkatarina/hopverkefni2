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
  // Bæta við classList!!
  return link;
}

export function createImage(path) {
  if (!path) {
    return el('div');
  }
  const imageElement = el('img');
  imageElement.src = `../../${path}`;
  return imageElement;
}

export function createTitle(title, cat) {
  const div = el('div');
  // Bæta við classList

  const catElement = el('h4', cat);
  // Bæta við classList
  const titleElement = el('h1', title);

  div.appendChild(catElement);
  div.appendChild(titleElement);
  return div;
}
