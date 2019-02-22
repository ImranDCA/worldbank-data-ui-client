import { ReactWrapper } from 'enzyme'
import { find } from './find'
import { printWrapperName } from './common'

export function isReactWrapper(e: any): e is ReactWrapper {
  return e && (e as any).getDOMNode && (e as any).find && !!(e as ReactWrapper).update
}

export type ElementOrWrapper = Element | ReactWrapper | null | undefined

export function asElement<T = Element>(e: ElementOrWrapper): T | null | undefined {
  if (isReactWrapper(e)) {
    return e.getDOMNode() as any
  } else {
    return e as any
  }
}

export function asElements(e: ElementOrWrapper): Element[] {
  if (isReactWrapper(e)) {
    return find(e)
  } else {
    return e ? [e] : []
  }
}
export function printElementOrWrapperName(e: ElementOrWrapper) {
  if (isReactWrapper(e)) {
    return printWrapperName(e)
  } else if (e) {
    return e.tagName
  } else {
    return 'UNKNOWN'
  }
}
