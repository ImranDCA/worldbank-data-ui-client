import { ReactWrapper } from 'enzyme'
import { findOne } from '../../utils/test/'
import { unique } from '../misc'
const { generateImage } = require('jsdom-screenshot')

export async function expectToMatchSnapshot(wrapperOrSelector?: ReactWrapper | string) {
  let options: any = {
    serve: false
  }
  if (wrapperOrSelector && typeof wrapperOrSelector !== 'string') {
    const key = unique()
    findOne(wrapperOrSelector).setAttribute('data-expect-to-match-snapshot', key)
    options = { ...options, targetSelector: `[data-expect-to-match-snapshot="${key}"]` }
  } else if (typeof wrapperOrSelector === 'string') {
    options = { ...options, targetSelector: wrapperOrSelector }
  }
  const image = await generateImage(options)
  await expect(image).toMatchImageSnapshot()
}
