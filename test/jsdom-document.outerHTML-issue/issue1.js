// @ts-c heck
const {ok, equal} = require('assert')
const  JSDOM = require('jsdom').JSDOM

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="theme-color" content="#000000">
  <title>Sebastián</title>
</head>
<body>
</body>
</html>`
const dom = new JSDOM(html, {
  url: 'http://foo.com',
  runScripts: 'dangerously',
  resources: 'usable'
})
var $ = require('jquery')(dom.window)
$('<p>asdasd</p>').appendTo('body')
equal($('body').html().trim(), '<p>asdasd</p>')

const document = dom.window.document
console.log(document.documentElement.outerHTML);

console.log(document.head.outerHTML);
// jQuery('body').empty()
// ok(jQuery('body').html()==='')
// var html = `<p>asdasd</p>`
// jQuery(html).appendTo('body')
// ok(jQuery('body').html()===html)
