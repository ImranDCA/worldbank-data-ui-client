import { ReactWrapper, mount } from 'enzyme';
import { getApplicationWrapper, expectToContainText, expectToExist, click, text, findOne, html, wait } from "../../../utils/test/";
import * as React from 'react'
import { createHashHistory, History } from 'history';
import { navigate } from '../../../utils/test/history';

const { generateImage, setDefaultOptions } =require( "jsdom-screenshot")

describe('layout', () => {

  // describe('switch-theme', ()=>{
    let wrapper: ReactWrapper;
    beforeEach(async ()=>{
      wrapper = await getApplicationWrapper()
    })
    // afterEach(()=>{
    //   wrapper.detach()
    // })

    it("Should show light theme by default", async () => {
      await navigate("/");
      expect(text(wrapper.update().find("Header .switch-theme-button"))).toBe("switch to dark theme");
      expect(await generateImage()).toMatchImageSnapshot()
    });

    it("Should change to dark colors when .switch-theme-button is clicked", async () => {
      // const wrapper = await getApplicationWrapper()
      await navigate("/");
      expect(text(wrapper.update().find("Header .switch-theme-button"))).not.toBe("switch to light theme");

      await click(wrapper.find("Header .switch-theme-button"))
      // await click(wrapper.find("Header .switch-theme-button"))
      console.log(!!wrapper .update().find("Header").getDOMNode());

      wrapper.update()
      await wait(600)
      wrapper.update()
      await wait(600)

      // const h = findOne(wrapper .find("Header").getDOMNode())
      // debugger
      console.log(!!wrapper .update().find("Header").getDOMNode());
// wrapper.update().render()
expect(text(wrapper.update().find("Header .switch-theme-button"))).toBe("switch to light theme");
      expect(await generateImage({target: wrapper .update().find("Header").getDOMNode()})).toMatchImageSnapshot()
    });


  // })
});

