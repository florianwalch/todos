import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Search } from '@/components/Search/Search';

export default {
  title: 'Components/Layout/Search',
  component: Search,
  parameters: {
    docs: {
      source: {
        code: `<Search searchValue={searchValue} onChange={setSearchValue} />`,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const input = canvas.getByPlaceholderText(/Search/);

  await userEvent.type(input, 'todo', { delay: 100 });
  await expect(args.onChange).toBeCalledWith('todo');
};
