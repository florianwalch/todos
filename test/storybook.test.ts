import { render } from '@testing-library/react';
import initStoryshots from '@storybook/addon-storyshots';

const reactTestingLibrarySerializer = {
  // @ts-ignore not important
  print: (val, serialize) => serialize(val.container.firstChild),
  // @ts-ignore not important
  // eslint-disable-next-line no-prototype-builtins
  test: (val) => val && val.hasOwnProperty('container'),
};

// create storybook snapshots
initStoryshots({
  renderer: render,
  snapshotSerializers: [reactTestingLibrarySerializer],
});
