export function getUrlApiMock(method: string, url: string): string {
  // debugger
  if(false){}
  else if (url.includes('api.worldbank.org/v2/source?format=json')  ) {
    url = `ajaxResponseMocks/source.json`;
  }
  else if (url.includes('api.worldbank.org/v2/country?format=json')  ) {
    url = `ajaxResponseMocks/country.json`;
  }
  else if (url.includes('api.worldbank.org/v2/indicator?format=json')  ) {
    url = `ajaxResponseMocks/indicator.json`;
  }

  return url
}


export const ENABLE_AJAX_MOCK = location.href.startsWith('http://localhost')
export const IS_JSDOM = location.href.startsWith('http://localhost/')
