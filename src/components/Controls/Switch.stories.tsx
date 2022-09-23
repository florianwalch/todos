import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Switch } from '@/components/Controls/Switch';

export default {
  title: 'Components/Controls/Switch',
  component: Switch,
  argTypes: {
    checked: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Switch label="Switch me!" 
        checked={true} 
        onChange={(newState) => {}} />`,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => {
  const [{ checked, onChange }, updateArgs] = useArgs();

  return (
    <Switch
      {...args}
      checked={checked}
      onChange={(evt) => {
        updateArgs({ checked: evt.target.checked });
        onChange(evt);
      }}
    />
  );
};

export const Default = Template.bind({});

Default.args = {
  label: 'Switch me!',
  checked: true,
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  checked: true,
};
