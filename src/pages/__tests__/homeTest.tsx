import { expectToBeVisible, getApplicationWrapper, expectToNotExist, print, html, printDocumentHtml } from "../../utils/test/";
import { expectToMatchSnapshot } from '../../utils/test/snapshot';
import { navigate } from '../../utils/test/history';
import { writeFileSync } from 'fs';

xdescribe('home', () => {

  it('/ shows home and match image snapshot', async () => {
    const wrapper = await getApplicationWrapper('/notFound')
    expectToNotExist(wrapper.find('Page .home'))
    await navigate('/')
    wrapper.update()
    // wrapper.first().getDOMNode()
    // const wrapper = await getApplicationWrapper('/')
    // w  rapper.update()
    expectToBeVisible(wrapper.find('Page .home'))
    await expectToMatchSnapshot(wrapper.find('Page .home'))
    // console.log(html(wrapper.find('Page .home')));

  });
});
