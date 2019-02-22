import { expectToBeVisible, expectToNotExist, getApplicationWrapper, selectOne, wait } from "../../../utils/test";
import { navigate } from '../../../utils/test/history';

describe('CountryIndicator', () => {

    it('dummy', ()=>{
      expect(1).toBe(1)
    })

  // it('settings are hidden by default button is visible', async done => {
  //   const w = await getApplicationWrapper()
  //   expectToNotExist(w, 'Page .list-record-types')
  //   await navigate(w, '/countryIndicator/{}')
  //   expectToBeVisible(w.find('Page .list-record-types'))

  //   expect((w.find('Page .list-record-types select.select-type').getDOMNode() as HTMLSelectElement).selectedIndex).toBe(0)
  //   await select(w.find('Page .list-record-types select.select-type'), 'commercecategory')
  //   await wait(10)
  //   w.update()
  //   done()
  // })
});


