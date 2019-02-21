import { ReactWrapper } from 'enzyme'
import { exists } from './expectations'

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

export function findOne<T extends Element = Element>(
  wrapper: ReactWrapper,
  selector?: string | ((w: Element) => boolean)
): T {
  const r = find(wrapper, selector)
  if (r.length) {
    return r[0] as any
  } else throw new Error('Cannot find ' + selector)
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
