import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter()});


// set up visual regression testing
import { toMatchImageSnapshot } from "jest-image-snapshot";
import { setDefaultOptions } from "jsdom-screenshot";

// TravisCI requires --no-sandbox to be able to run the tests
// https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#running-puppeteer-on-travis-ci
setDefaultOptions({
  launch: { args: ["--no-sandbox"] }
});

// give tests more time as taking screenshots takes a while
jest.setTimeout(10000);

expect.extend({ toMatchImageSnapshot });
