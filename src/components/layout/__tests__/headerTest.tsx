import { ReactWrapper } from 'enzyme'
import { getApplicationWrapper, text, expectText, expectNotText } from '../../../utils/test/'
import { navigate } from '../../../utils/test/history'
import { expectToMatchSnapshot } from '../../../utils/test/snapshot'

describe('header', () => {
  describe('navbar', () => {
    let wrapper: ReactWrapper
    beforeEach(async () => {
      wrapper = await getApplicationWrapper()
    })
    afterEach(() => {
      wrapper.detach()
    })
    it('Should remark correct navigation link when url is /', async () => {
      await navigate('/notFound')
      expectNotText(wrapper.update().find('Header .navbar .active'), 'home')
      await navigate('/')
      expectText(wrapper.update().find('Header .navbar .active'), 'home')
      await expectToMatchSnapshot('.header .navbar')
    })

    it('Should remark correct navigation link when url is /countryIndicator/{}', async () => {
      expect(text(wrapper.find('Header .navbar .active'))).not.toBe('country indicators')
      await navigate('/countryIndicator/{}')
      expectText(wrapper.update().find('Header .navbar .active'), 'country indicators')
      await expectToMatchSnapshot(wrapper.update().find('Header .navbar'))
    })
  })
})
