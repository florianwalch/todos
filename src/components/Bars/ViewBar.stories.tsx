import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { ViewBar } from '@/components/Bars/ViewBar';

export default {
  title: 'Components/Bars/ViewBar',
  components: ViewBar,
} as ComponentMeta<typeof ViewBar>;

const Template: ComponentStory<typeof ViewBar> = (args) => (
  <ViewBar {...args} />
);

export const Default = Template.bind({});
