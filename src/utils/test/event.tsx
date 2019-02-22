import { ReactWrapper } from 'enzyme';
import { wait } from ".";
import { asElement, ElementOrWrapper } from './elementOrWrapper';
import { query } from '../html';
import { asArray } from '../misc';

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

export async function select(w: ReactWrapper, values: string[]|string) {
  w.update()
  const e = asElement<HTMLSelectElement>(w)
  const vals = asArray(values)
  if (!e) { return }
  const allOptions = query<HTMLOptionElement>('option')
  const options = allOptions.filter(o=>vals.includes(o.value))
  if (options.length===0) {
  console.warn(`No select option with value [${vals.join(',')}] not found`);
    return
  }
  allOptions.forEach(o=>o.selected=false)
  options.forEach(option=>{
    option.selected = true
  })

  await change(w);
}
export async function selectOne(w: ElementOrWrapper, value: string): Promise<void> {
  const e = asElement<HTMLSelectElement>(w)

  if (!e) { return }
  const option = e.querySelector<HTMLOptionElement>(`[value="${value}"]`)
  if (!option) {
  console.warn(`select() option [value="${value}"] not found`);

    return
  }
  Array.from( e.querySelectorAll('option')).forEach(o=>o.selected=false)
  option.selected = true
  e.selectedIndex = option.index
  e.value = option.value

  e.dispatchEvent(new Event('change'));
  await wait(100)
}

export async function value(wrapper: ReactWrapper, value: string) {
  wrapper.getDOMNode().setAttribute('value', value);
  await change(wrapper);
}

async function trigger(wrapper: ReactWrapper, event: string, dontUpdate = false) {
  dontUpdate || wrapper.update();
  wrapper.hostNodes()
    // .filterWhere(w => !!w && !!w.getDOMNode())
    // find(wrapper)
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
