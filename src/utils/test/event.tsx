import { ReactWrapper } from 'enzyme';
import { wait } from ".";
import { asElement, ElementOrWrapper } from './elementOrWrapper';

export async function click(wrapper: ReactWrapper, dontUpdate = false) {
  return trigger(wrapper, 'click', dontUpdate);
}

export async function change(wrapper: ReactWrapper, dontUpdate = false) {
  return trigger(wrapper, 'change', dontUpdate);
}

export async function check(wrapper: ReactWrapper, checked: boolean) {
  wrapper.update()
  if(checked){
    wrapper.getDOMNode().setAttribute('checked', 'checked');
    (wrapper.getDOMNode() as any).checked = true
  }
  else {
    wrapper.getDOMNode().removeAttribute('checked');
    (wrapper.getDOMNode() as any).checked = false
  }
  await change(wrapper);
}

export async function select(w: ElementOrWrapper, value: string): Promise<void> {
  const e = asElement<HTMLSelectElement>(w)
  if (!e) { return }
  const option = e.querySelector<HTMLOptionElement>(`[value="${value}"]`)
  if (!option) { return }
  Array.from( e.querySelectorAll('option')).forEach(o=>o.selected=false)
  option.selected = true
  e.selectedIndex = option.index
  e.value = option.value
}

export async function value(wrapper: ReactWrapper, value: string) {
  wrapper.getDOMNode().setAttribute('value', value);
  await change(wrapper);
}

async function trigger(wrapper: ReactWrapper, event: string, dontUpdate = false) {
  dontUpdate || wrapper.update();
  wrapper
    .filterWhere(w => !!w && !!w.getDOMNode())
    .forEach(w => {
      w.simulate(event, {
        ...clickEventAttributes,
        currentTarget: w.getDOMNode(),
        srcElement: w.getDOMNode(),
        target: w.getDOMNode(),
        toElement: w.getDOMNode(),
        type: event,
        view: window,

      });
    });
    if (!dontUpdate) {
      await wait(10);
      wrapper.update();
    }
    return wrapper;
}

const clickEventAttributes = {
  defaultPrevented: false,
  preventDefault() { this.defaultPrevented = true; },
  currentTarget: document,
  composed: true,
  which: 0,
  isTrusted: true,
  cancelBubble: false,
  cancelable: true,
  bubbles: true,
  returnValue: true,
  metaKey: null,
  altKey: null,
  ctrlKey: null,
  shiftKey: null,
  button: 0
};
