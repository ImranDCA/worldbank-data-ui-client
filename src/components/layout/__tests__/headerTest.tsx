import { ReactWrapper } from 'enzyme';
import { getApplicationWrapper, text } from '../../../utils/test/';
import { navigate } from '../../../utils/test/history';
import { expectToMatchSnapshot } from '../../../utils/test/snapshot';

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
      expect(text(wrapper.update().find('Header .navbar .active'))).not.toBe('home')
      await navigate('/')
      expect(text(wrapper.update().find('Header .navbar .active'))).toBe('home')
      await expectToMatchSnapshot('.header .navbar')
    })

    it('Should remark correct navigation link when url is /countryIndicator/{}', async () => {
      expect(text(wrapper.find('Header .navbar .active'))).not.toBe('country indicators')
      await navigate('/countryIndicator/{}')
      expect(text(wrapper.update().find('Header .navbar .active'))).toBe('country indicators')
      await expectToMatchSnapshot(wrapper.update().find('Header .navbar'))
    })
  })

})
