import { ReactWrapper } from 'enzyme'
import * as React from 'react'
import { attachAndMount, findOne, wait, waitFor, findOneContainingText, expectText, selectOne, expectSelection, select } from '../../../utils/test'
import { SelectSearch, SelectSearchFetchOptions, SelectSearchFetchResult, Option } from '../SelectSearch'
import { randomIntBetween } from '../../../utils/misc'
import renderer from 'react-test-renderer'

describe('selectSearch', () => {
  let s: ReactWrapper
  function tearUp(el: JSX.Element) {
    beforeEach(() => {
      s = attachAndMount(el)
    })
    afterEach(() => {
      s.detach()
    })
  }

  describe('select options and no search options', () => {
    tearUp(
      <SelectSearch
        options={[{ value: '1', name: 'Uruguay' }]}
        onSelect={options => undefined}
        defaultOption={{ value: '__default__', name: 'select something dude' }}
      />
    )
    it('should show given default option', () => {
      const def = findOneContainingText<HTMLOptionElement>(s.find('option'), 'select something dude')
      expect(def.value).toBe('__default__')
    })
    it('should show given options', () => {
      const o1 = findOneContainingText<HTMLOptionElement>(s.find('option'), 'Uruguay')
      expect(o1.value).toBe('1')
    })
    it('should not show search options if not given', () => {
      expect(s.find('.search-options')).toHaveLength(0)
    })
  })

  describe('search options, autoApply: true, no select options', () => {
    tearUp(<SelectSearch search={{ placeholder: 'Country name', autoApply: true }} onSelect={options => undefined} />)
    it('should not show options if non given', () => {
      expect(s.find('option')).toHaveLength(0)
    })
    it('should show given search options', () => {
      expect(s.find('.search-options button')).toHaveLength(1)
      expect(s.find('.search-options input')).toHaveLength(1)
    })
  })

  describe('fetch', () => {
    it('fetch should be automatically called if no options passed', async () => {
      const fetch = jest.fn(async function(o: SelectSearchFetchOptions): Promise<SelectSearchFetchResult> {
        await wait(randomIntBetween(1, 20))
        return {
          options: [{ value: 'UY', name: 'Uruguay' }],
          search: { page: 2, pages: 10, perPage: 1, query: '', total: 10 }
        }
      })
      expect(fetch.mock.calls).toHaveLength(0)
      expect(fetch).toBeCalledTimes(0)
      s = attachAndMount(<SelectSearch fetch={fetch} onSelect={options => undefined} />)
      expect(s.find('option')).toHaveLength(0)
      await waitFor(() => fetch.mock.calls.length > 0)
      expect(fetch.mock.calls).toHaveLength(1)
      expect(fetch).toBeCalledTimes(1)
      expect(fetch).toBeCalledWith({ page: 0 })
      expect(fetch).toBeCalledTimes(1)
      expect(s.update().find('option')).toHaveLength(1)
      expectText(s.find('option'), 'Uruguay')
      s.detach()
    })
  })

  describe('onSelect', () => {
    it('should callback on select one', async () => {
      const onSelect = jest.fn(async function(options: Option[]): Promise<any> {
        await wait(randomIntBetween(1, 20))
        return options
      })
      s = attachAndMount(
        <SelectSearch
          defaultOption={{ value: '__empty__', name: 'please select an option' }}
          options={[{ value: 'foo', name: 'Foo' }, { value: 'bar', name: 'Bar' }]}
          onSelect={onSelect}
        />
      )
      expectSelection(s, '__empty__')
      expect(onSelect).toBeCalledTimes(0)

      await select(s.find('select'), 'foo')
      expectSelection(s, 'foo')

      expect(onSelect).toBeCalledTimes(1)
      expect(onSelect).toBeCalledWith([{value: 'foo', name: 'Foo'}])

      await select(s.find('select'), 'bar')
      expectSelection(s, 'bar')
      expect(onSelect).toBeCalledTimes(2)
      expect(onSelect).toBeCalledWith([{value: 'bar', name: 'Bar'}])

      s.detach()
    })
  })
})
