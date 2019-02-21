export function getUrlApiMock(method: string, url: string): string {
  // debugger
  if (url.includes('api.worldbank.org/v2/country?format=json')  ) {
    url = `ajaxResponseMocks/country.json`;
  }
  // else if (url.includes('__app__routeParamName=recordViewJson') && !url.includes('__app__type=commercecategory')&&  url.includes('__app__seeValues=true') && url.includes('__app__showSublistLines=true') && !url.includes('__app__showAllFields=true')) {
  //   url = `ajaxResponseMocks/__app__routeParamName=recordViewJson&__app__id=463&__app__type=inventoryitem&__app__seeValues=true&__app__showSublistLines=true.json`;
  // }

  return url
}


export const ENABLE_AJAX_MOCK = location.href.startsWith('http://localhost')
export const IS_JSDOM = location.href.startsWith('http://localhost/')
