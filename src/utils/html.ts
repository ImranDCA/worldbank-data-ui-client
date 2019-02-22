

export function createElement(parent: HTMLElement, tag='div'){
  const el = document.createElement(tag)
  parent.appendChild(el)
  return el
}
