import { ReactWrapper } from 'enzyme'
import { text, hasText, HasTextOptions, defaultHasTextOptions } from './text';

/** @returns HTMLElement of nodes that match `selector` in given wrapper */
export function find<T extends Element = Element>(
  wrapper: ReactWrapper,
  selectorOrPredicate?: string | ((w: Element) => boolean)
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
  selectorOrPredicate?: string | ((w: Element) => boolean),
  opts: HasTextOptions= defaultHasTextOptions
): T[] {
  return find(wrapper, selectorOrPredicate).filter(e=>hasText(text(e), s, opts)) as any
}

export function findContainingText<T extends Element = Element>(
  wrapper: ReactWrapper,
  s: string,
  selectorOrPredicate?: string | ((w: Element) => boolean),
): T[] {
  return find(wrapper, selectorOrPredicate).filter(e=>hasText(text(e), s, {...defaultHasTextOptions, containing: true})) as any
}

export function findOne<T extends Element = Element>(
  wrapper: ReactWrapper,
  selectorOrPredicate?: string | ((w: Element) => boolean)
): T {
  const r = find(wrapper, selectorOrPredicate)
  if (r.length) {
    return r[0] as any
  } else throw new Error('Cannot find ' + selectorOrPredicate)
}

export function findOneWithText<T extends Element = Element>(
  wrapper: ReactWrapper,
  s: string,
  selectorOrPredicate?: string | ((w: Element) => boolean),
  opts: HasTextOptions= defaultHasTextOptions
): T {
  const r = findWithText(wrapper, s, selectorOrPredicate,opts)
  if (r.length) {
    return r[0] as any
  } else throw new Error('Cannot find ' + selectorOrPredicate)
}

export function findOneContainingText<T extends Element = Element>(
  wrapper: ReactWrapper,
  s: string,
  selectorOrPredicate?: string | ((w: Element) => boolean)
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
