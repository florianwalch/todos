import { type ComponentMeta, type ComponentStory } from '@storybook/react';

import { Loader } from '@/components/Loader/Loader';

// noinspection JSUnusedGlobalSymbols
export default {
  title: 'Components/Layout/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

// args are required to show code in SB docs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof Loader> = (args) => <Loader />;

// noinspection JSUnusedGlobalSymbols
export const Default = Template.bind({});
Default.parameters = {
  docs: {
    inlineStories: false,
  },
};
