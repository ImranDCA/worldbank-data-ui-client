import { mount } from 'enzyme';
import * as React from 'react';
import { expectText } from '../../../utils/test';
import { ErrorComponent } from '../errorComponent';

describe('ErrorComponent', () => {
  it('renders given error object', () => {
    const wrapper = mount(<ErrorComponent error={{ message: 'message', name: 'NAME', stack: 'stack' }} />)
    expectText(wrapper.find('.error-name'), 'NAME')
    expectText(wrapper.find('.error-message'), 'message')
    expectText(wrapper.find('.error-stack'), 'stack')
    wrapper.unmount()
  })
})
