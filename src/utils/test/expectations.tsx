import { ReactWrapper } from 'enzyme';
import { asArray, flat, tryTo } from '../misc';
import { ElementOrWrapper, asElement, asElements, printElementOrWrapperName } from "./elementOrWrapper";
import { text, print, HasTextOptions, hasTextOptions } from "./text";
import { Predicate } from './waitUtil';
import { find, findAscendantOrSelf, findOneWithText } from './find';
import { printselectorOrPredicate, SelectorOrPredicate, printWrapperName } from './common';

export function expectToContainText(wrapper: ReactWrapper, selector: string, t: string | string[]) {
  const s = text(wrapper, selector);
  asArray(t).forEach(t => {
    expect(s).toContain(t.toLowerCase());
  });
}

export function expectToExist(wrapper: ReactWrapper, selectors?: string | string[]) {
  expectExistance(wrapper, selectors || [])
}

export function expectToNotExist(wrapper: ReactWrapper, selectors?: string | string[]) {
  expectExistance(wrapper, selectors || [], true)
}

function expectExistance(wrapper: ReactWrapper, selectors: string | string[], dontExist=false) {
  const wps: ReactWrapper[] = selectors ? asArray(selectors).map(s => wrapper.find(s!)) : [wrapper]
  const els = flat(wps.map(w => asElements(w)))
  if (dontExist && !els.length || !dontExist && els.length) {
    expect(true).toBe(true)
  }
  else {
    fail(`Expected wrapper ${print(wrapper)} ${selectors ? `, selectors: [${asArray(selectors).join(',')}] ` : ''} ${dontExist ? 'not':''} to exist`)
  }
}



// export function exists(w: ReactWrapper) {
//   return !!w.getDOMNode() && !!w.getDOMNode().parentElement
// }

export function expectToHaveLength(l: {
  length: number;
}, c: number, msg: string = '') {
  if (l.length !== c) {
    fail(`expected ${l.length} to be length ${c}: ${msg}`);
  }
  else {
    expect(l.length).toBe(c);
  }
}



export function expectAttributeToBe(w: ElementOrWrapper, name: string, value: string | null | boolean | Predicate, msg = '', useAccessor = false) {
  let fn: ((v: any) => boolean) = (typeof value !== 'function') ? v => v === value : value
  const e = asElement(w);
  if (e) {
    const a = useAccessor ? e[name] : e.getAttribute(name)
    const actualValue = fn(a)
    if (!actualValue) {
      fail(msg || `Expected attribute '${name}' to ${typeof value === 'function' ? 'comply with predicate' : `to be '${value}'`} but actual value '${a}' does not, in element ${print(e)}`);
    }
    else {
      expect(actualValue).toBe(actualValue);
    }
  }
  else {
    fail(`Expected attribute '${name}' to be '${value}' but element is undefined, ${msg}`);
  }
}


export function expectCheckedToBe(w: ElementOrWrapper, checked: boolean, msg = '') {
  function nullAttr(value: any) {
    return value === null || value === undefined
  }
  const v: Predicate = checked ? (value => !nullAttr(value)) : (value => nullAttr(value));
  return expectAttributeToBe(w, 'checked', v, msg || `expected element ${print(w)} ${checked ? '' : 'not'} to be checked. ${msg}`)
}

export interface ExpectSelectionOptions{
  containPredicate?: 'one'|'all'|'noneOf'|'exactly'
}
export function expectSelection(w: ElementOrWrapper, values:string[]|string, msg = '', opts: ExpectSelectionOptions={containPredicate: 'all'}) {

  let valid=''
  const v = asArray(values)
  const e = asElement<HTMLSelectElement>(w)
  if(e){
    const select = e.querySelector<HTMLSelectElement>('select')
    if(select){
      const match = Array.from(select.selectedOptions).filter(o=>v.find(vv=>vv===o.value)).map(o=>o.value)
      if(opts.containPredicate==='exactly'|| !opts.containPredicate){
        valid= match.length===v.length ?  '': `Expected selection to have exactly these values [${v.join(',')}] but found these [${match.join(',')}]`
      }
      else if(opts.containPredicate==='all' ){
        valid= match.length>=v.length ?  '': `Expected selection to have all these values [${v.join(',')}] but found these [${match.join(',')}]`
      }

      else if(opts.containPredicate==='one'){
        valid= match.length>0? '': `Expected selection to have some these values [${v.join(',')}] but found these [${match.join(',')}]`
      }
      else if(opts.containPredicate==='noneOf'){
        valid= match.length===0? '': `Expected selection NOT to have any of these values [${v.join(',')}] but found these [${match.join(',')}]`
      }
    }
    else {
      fail(`Expected to find a <select> in ${printElementOrWrapperName(w)}` )
    }
  }
  else {
    fail(`Èxpected  ${printElementOrWrapperName(w)} not to be empty`)
  }
  expect(valid).toBe('')
  // tryTo(()=>findOne<HTMLSelectElement>(w.find('select'))).selectedOptions
}

export function expectText(w: ReactWrapper, s: string,
  selectorOrPredicate?: SelectorOrPredicate, opts: HasTextOptions = hasTextOptions) {
    const e = tryTo(()=>findOneWithText(w, s, selectorOrPredicate, opts))
    if(!e && !opts.negate || e && opts.negate){
      fail(`Expected to find an element ${opts.negate ? 'NOT' : ''} with text "${s}" in element "${printWrapperName(w)}" ${printselectorOrPredicate(selectorOrPredicate)}`)
    }
    else {
      expect(true).toBe(true)
    }
}
export function expectNotText(w: ReactWrapper, s: string,
  selectorOrPredicate?: SelectorOrPredicate, opts: HasTextOptions = hasTextOptions) {
    return expectText(w, s, selectorOrPredicate, {...opts, negate: true})
}

