import { mount } from 'enzyme';
import * as React from 'react';
import { ErrorComponent } from '../errorComponent';
import { initTest, printDocumentHtml } from '../../../utils/test';
import { writeFileSync } from 'fs';
import { createElement } from '../../../utils/html';

describe('ErrorComponent', () => {

  it('renders given error object', () => {
  const wrapper = mount(<ErrorComponent error={{ message: 'message', name: 'NAME', stack: 'stack' }} />)
    expect(wrapper.find('.error-name').text()).toBe('NAME')
    expect(wrapper.find('.error-message').text()).toBe('message')
    expect(wrapper.find('.error-stack').text()).toBe('stack')
    wrapper.unmount()
  });

  // xit('renders given error object', () => {

// const { JSDOM } = require('jsdom');

// const jsdom = new JSDOM(`
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//   <meta name="theme-color" content="#000000">
//   <title>React + Parcel App</title>
// </head>
// <body>
// </body>
// </html>
// `);
// // const { window } = jsdom;

// function copyProps(src:any, target:any) {
//   Object.defineProperties(target, {
//     ...Object.getOwnPropertyDescriptors(src),
//     ...Object.getOwnPropertyDescriptors(target),
//   });
// }
// const g = global as any
// g.window = jsdom.window;
// g.document = jsdom.window.document;
// g.navigator = {
//   userAgent: 'node.js',
// };
// g.requestAnimationFrame = function (callback: any) {
//   return setTimeout(callback, 0);
// };
// g.cancelAnimationFrame = function (id: any) {
//   clearTimeout(id);
// };
// copyProps(jsdom.window, g);

// console.log(`
// ## document.documentElement.outerHTML:
// ${document.documentElement.outerHTML}

// ## document.head.outerHTML:
// ${document.head.outerHTML}
// `);

// const html = `
// <html lang="en">
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
//   <meta name="theme-color" content="#000000">
//   <title>React + Parcel App</title>
// </head>
// <body>
// </body>
// </html>
// `.trim()

// console.log(`
// ## document.documentElement.outerHTML:
// ${document.documentElement.outerHTML}

// ## document.head.outerHTML:
// ${document.head.outerHTML}
// `);

// document.documentElement.innerHTML = html


// console.log(`
// ## document.documentElement.outerHTML:
// ${document.documentElement.outerHTML}

// ## document.head.outerHTML:
// ${document.head.outerHTML}
// `);

// const el = document.createElement('div')
//     document.body.appendChild(el)
//     const Mine = ( ) => <div><h2>Hello world</h2></div>
//     const wrapper = mount(<Mine/>, {attachTo: el})

//     console.log(`
// ## document.documentElement.outerHTML:
// ${document.documentElement.outerHTML}

// ## document.head.outerHTML:
// ${document.head.outerHTML}
// `);

    // writeFileSync('test/test2.html', document.documentElement.outerHTML)
    // writeFileSync('test/test3.html', printDocumentHtml())
    // writeFileSync('test/test4.html', printDocumentHtml({stripCssSourceMaps: true}))
    // wrapper.detach()
  // });


  // it('renders given error string', () => {
  //   const wrapper = mount(<ErrorComponent error={'hello'} />)
  //   expect(wrapper.find('.error-name').text()).toBe('Generic Error')
  //   expect(wrapper.find('.error-message').text()).toBe('hello')
  //   wrapper.unmount()
  // });

});
