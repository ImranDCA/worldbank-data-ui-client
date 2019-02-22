import { ReactWrapper, mount } from 'enzyme'
import {
  getApplicationWrapper,
  expectToContainText,
  expectToExist,
  click,
  text,
  findOne,
  html,
  wait,
  printDocumentHtml
} from '../../../utils/test/'
import * as React from 'react'
import { createHashHistory, History } from 'history'
import { navigate } from '../../../utils/test/history'
import { writeFileSync } from 'fs'
import { expectToMatchSnapshot } from '../../../utils/test/snapshot'

const { generateImage, setDefaultOptions } = require('jsdom-screenshot')

describe('layout', () => {
  // describe('switch-theme', ()=>{
  let wrapper: ReactWrapper
  beforeEach(async () => {
    wrapper = await getApplicationWrapper()
  })
  afterEach(() => {
    wrapper.detach()
  })

  it('Should show light theme by default', async () => {
    await navigate('/')
    expect(text(wrapper.update().find('.header .switch-theme-button'))).toBe('switch to dark theme')
    await expectToMatchSnapshot()
  })

  it('Should change to dark colors when .switch-theme-button is clicked', async () => {
    await navigate('/')
    expect(text(wrapper.update().find('.header .switch-theme-button'))).not.toBe(
      'switch to light theme'
    )
    await click(wrapper.find('.header .switch-theme-button'))

    expect(text(wrapper.update().find('.header .switch-theme-button'))).toBe(
      'switch to light theme'
    )
    await expectToMatchSnapshot()
  })

  // })
})
