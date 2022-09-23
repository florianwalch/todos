import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import { Checkbox } from '@/components/Controls/Checkbox';

export default {
  title: 'Components/Controls/Checkbox',
  component: Checkbox,
  argTypes: {
    checked: {
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      source: {
        code: `<Checkbox label="Check me!" 
          checked={true} 
          onChange={(newState) => {}} />`,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => {
  const [{ checked, onChange }, updateArgs] = useArgs();

  return (
    <Checkbox
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
  label: 'Check me!',
  checked: true,
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  checked: true,
};
