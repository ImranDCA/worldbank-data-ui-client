import { ReactWrapper, mount } from 'enzyme';
import { getApplicationWrapper, expectToContainText, expectToExist, click, text, findOne, html, wait } from "../../../utils/test/";
import * as React from 'react'
import { createHashHistory, History } from 'history';
import { navigate } from '../../../utils/test/history';

const { generateImage, setDefaultOptions } =require( "jsdom-screenshot")

describe('header', () => {

  describe('navbar', ()=>{
    let wrapper: ReactWrapper;
    beforeEach(async ()=>{
      wrapper = await getApplicationWrapper()
    })
    afterEach(()=>{
      wrapper.detach()
    })
    it("Should remark correct navigation link when url is /", async () => {
      await navigate("/notFound");
      expect(text(wrapper.update().find("Header .navbar .active"))).not.toBe("home");
      await navigate("/");
      expect(text(wrapper.update().find("Header .navbar .active"))).toBe("home");
      expect(await generateImage({target: findOne(wrapper.find("Header .navbar"))})).toMatchImageSnapshot()
    });

    it("Should remark correct navigation link when url is /countryIndicator/{}", async () => {
      expect(text(wrapper.find("Header .navbar .active"))).not.toBe("country indicators");
      await navigate("/countryIndicator/{}");
      expect(text(wrapper.update().find("Header .navbar .active"))).toBe("country indicators");
      expect(await generateImage({target: findOne(wrapper.find("Header .navbar"))})).toMatchImageSnapshot()
    });


  })


    // it("Should change page colors when SwitchTheme button is clicked", async () => {
    //   expect(wrapper("Header SwitchTheme").text()).toContain('switch to dark')
    //   wrapper("Header SwitchTheme").click()
    //   expect(wrapper.update().find("Header SwitchTheme").text()).toContain('switch to light')
    //   expect(await generateImage({target: wrapper.find("Header SwitchTheme").getDOMNode()}).toMatchImageSnapshot();
    // });
  // let wrapper: ReactWrapper
  // beforeEach(async ()=>{
  //   wrapper = await getApplicationWrapper()
  // })

  // it('should show title', () => {
  //   expectToContainText(wrapper, '.header h2', 'mini netsuite ui')
  // });

  // it('should show navbar links', () => {
  //   expectToExist(wrapper ,['.header .navbar a.home', '.header .navbar .list-record-types', '.header .navbar .search' ] )
  //   expectToContainText(wrapper, '.header .navbar a', ['home', 'types', 'search', 'links'])
  //   const t = text(wrapper, '.header .navbar a').toLowerCase()
  //   const toContain = ['home', 'types', 'search', 'links']
  //   toContain.forEach(s => expect(t).toContain(s))
  // });

  // it('nav bar links should change page on click', async done => {
  //   expect(wrapper.find('.page .home').length).toBeGreaterThan(0)
  //   expect(wrapper.find('.page .list-record-types').length).toBe(0)
  //   expect(wrapper.find('.page .search').length).toBe(0)
  //   expect(wrapper.find('.page .record-view').length).toBe(0)

  //   await click(wrapper.find('.header .navbar a.list-record-types'))
  //   expect(wrapper.find('.page .home').length).toBe(0)
  //   expect(wrapper.find('.page .list-record-types').length).toBeGreaterThan(0)
  //   expect(wrapper.find('.page .search').length).toBe(0)
  //   expect(wrapper.find('.page .record-view').length).toBe(0)

  //   await click(wrapper.find('.header .navbar a.search'))
  //   expect(wrapper.find('.page .home').length).toBe(0)
  //   expect(wrapper.find('.page .list-record-types').length).toBe(0)
  //   expect(wrapper.find('.page .search').length).toBeGreaterThan(0)
  //   expect(wrapper.find('.page .record-view').length).toBe(0)

  //   await click(wrapper.find('.header .navbar a.record-view'))
  //   expect(wrapper.find('.page .home').length).toBe(0)
  //   expect(wrapper.find('.page .list-record-types').length).toBe(0)
  //   expect(wrapper.find('.page .search').length).toBe(0)
  //   expect(wrapper.find('.page .record-view').length).toBeGreaterThan(0)

  //   await click(wrapper.find('.header .navbar a.home'))
  //   expect(wrapper.find('.page .home').length).toBeGreaterThan(0)
  //   expect(wrapper.find('.page .list-record-types').length).toBe(0)
  //   expect(wrapper.find('.page .search').length).toBe(0)
  //   expect(wrapper.find('.page .record-view').length).toBe(0)

  //   done()
  // });

});

