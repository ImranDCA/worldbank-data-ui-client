import { ReactWrapper } from 'enzyme'
import { findOne } from '../../utils/test/'
const { generateImage } = require('jsdom-screenshot')

export async function expectToMatchSnapshot(wrapper: ReactWrapper) {
  const target = findOne(wrapper)
  // debugger
  // const b = el.getBoundingClientRect()
  // console.log(b);
  // const clip = {x: b.left+10, y: b.top+10, width: b.width-10, height: b.height}
  // const clip = {x: 10, y:19, width: 40, height: 50}
  // const options = {screenshot: {clip}}
  await expect(await generateImage({ target })).toMatchImageSnapshot()
}



// if(options.target){
//   opts.screenshot = options.screenshot || {}
//   opts.screenshot.clip = {
//     x: options.target.offsetLeft,
//     y: options.target.offsetTop,
//     width: opts.target.offsetWidth,
//     height: options.target.offsetHeight
//   }
// }
