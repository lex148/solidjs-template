
import { JSXElement } from 'solid-js';
import { render } from 'solid-js/web';

function HelloWorld(): JSXElement {
  return <div>Hello World!</div>;
}

render(() => <HelloWorld />, document.getElementById('root') as HTMLElement)
