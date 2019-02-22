import { ReactWrapper } from 'enzyme'
import { text, hasText, HasTextOptions, hasTextOptions } from './text';
import { SelectorOrPredicate } from './common';

/** @returns HTMLElement of nodes that match `selector` in given wrapper */
export function find<T extends Element = Element>(
  wrapper: ReactWrapper,
  selectorOrPredicate?: SelectorOrPredicate
): T[] {
  return ((typeof selectorOrPredicate === 'string' ? wrapper.find(selectorOrPredicate) : wrapper) as ReactWrapper)
    .filterWhere(
      n =>
        typeof n.type() === 'string' &&
        (typeof selectorOrPredicate !== 'function' || selectorOrPredicate(n.getDOMNode()))
    )
    .map(n => n.getDOMNode()) as any
}

export function findWithText<T extends Element = Element>(
  wrapper: ReactWrapper,
  s: string,
  selectorOrPredicate?: SelectorOrPredicate,
  opts: HasTextOptions= hasTextOptions
): T[] {
  return find(wrapper, selectorOrPredicate).filter(e=>hasText(text(e), s, opts)) as any
}

export function findContainingText<T extends Element = Element>(
  wrapper: ReactWrapper,
  s: string,
  selectorOrPredicate?: SelectorOrPredicate,
): T[] {
  return find(wrapper, selectorOrPredicate).filter(e=>hasText(text(e), s, {...hasTextOptions, containing: true})) as any
}

export function findOne<T extends Element = Element>(
  wrapper: ReactWrapper,
  selectorOrPredicate?: SelectorOrPredicate
): T {
  const r = find(wrapper, selectorOrPredicate)
  if (r.length) {
    return r[0] as any
  } else throw new Error('Cannot find ' + selectorOrPredicate)
}

export function findOneWithText<T extends Element = Element>(
  wrapper: ReactWrapper,
  s: string,
  selectorOrPredicate?: SelectorOrPredicate,
  opts: HasTextOptions= hasTextOptions
): T {
  const r = findWithText(wrapper, s, selectorOrPredicate,opts)
  if (r.length) {
    return r[0] as any
  } else throw new Error('Cannot find ' + selectorOrPredicate)
}

export function findOneContainingText<T extends Element = Element>(
  wrapper: ReactWrapper,
  s: string,
  selectorOrPredicate?: SelectorOrPredicate
): T {
  const r = findContainingText(wrapper, s, selectorOrPredicate)
  if (r.length) {
    return r[0] as any
  } else throw new Error('Cannot find ' + selectorOrPredicate)
}

export function findAscendantOrSelf<T extends Element = Element>(
  e: Element,
  p: (e: Element) => boolean
): T | undefined {
  if (p(e)) {
    return e as any
  } else if (e.parentElement && e.parentElement !== e) {
    return findAscendantOrSelf(e.parentElement, p)
  }
}

