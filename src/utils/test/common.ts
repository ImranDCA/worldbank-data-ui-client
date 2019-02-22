import { ReactWrapper } from 'enzyme';
import { tryTo } from '../misc';

export type SelectorOrPredicate = string | ((w: Element) => boolean)
export function printselectorOrPredicate(p?: SelectorOrPredicate){
  return typeof p === 'string' ? p : typeof p==='undefined' ? '' : 'PREDICATE_FUNCTION'
}

export function printWrapperName(w?: ReactWrapper){
  return w && tryTo(()=>w.name()) ||'UNKNOWN'
}
