export default function empty(element) {
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
