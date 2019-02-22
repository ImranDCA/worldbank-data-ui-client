import { find } from "./find";
import { ElementOrWrapper, isReactWrapper, asElement, asElements } from "./elementOrWrapper";

export function text(wrapper: ElementOrWrapper, selector?: string, caseSensitive = false): string {
  let s: string = '';
  if (!wrapper) {
    return '';
  }
  if (isReactWrapper(wrapper)) {
    s = find(wrapper, selector).map(e => e.textContent).join(' ');
  }
  else {
    s = wrapper.textContent || '';
  }
  return caseSensitive ? s : s.toLowerCase();
}

export function tag(e: ElementOrWrapper) {
  const r = asElement(e);
  if (r) {
    return r.tagName;
  }
}

export function print(e: ElementOrWrapper) {
  return asElements(e).map(r=>r.outerHTML.replace(r.innerHTML, '')).join('\n') || 'undefined'
}

function stripCssSourceMaps(html: string) {
  html = html
    .split(`</style>`)
    .map(l => {
    const i = l.indexOf('/*# sourceMappingURL'); if (i !== -1) {
      return l.substring(0, i);
    } return l;
    })
    .join('</style>\n');
  return html;
}


  function html2svg(html:string){
    html = stripCssSourceMaps(html);
var data = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
<foreignObject width="100%" height="100%">
${html}
</foreignObject>
</svg>`;
return data
  }


export function printDocumentHtml(config?: {stripCssSourceMaps?: boolean}) {
  config = config || {}
  return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="theme-color" content="#000000">
<link rel="shortcut icon" href="./favicon.ico">
<title>React + Parcel App</title>

${config.stripCssSourceMaps ? stripCssSourceMaps(document.head.innerHTML): document.head.innerHTML}

</head>

${document.body.outerHTML}

</html>
  `
}

export function html(e: ElementOrWrapper) {
  return asElements(e).map(e=>e.outerHTML).join('\n') || 'undefined'
}
