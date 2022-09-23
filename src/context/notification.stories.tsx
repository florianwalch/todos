import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import {
  NotificationContextWrapper,
  useNotificationContext,
} from '@/context/notification';
import { Button } from '@mui/material';
import {
  userEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';

export default {
  title: 'Contexts/Notification',
  component: NotificationContextWrapper,
} as ComponentMeta<typeof NotificationContextWrapper>;

const testNotificationMessage = 'This is a test message';

const NotificationMockComponent = () => {
  const { showNotification } = useNotificationContext();
  return <Button onClick={() => showNotification(testNotificationMessage)} />;
};

const Template: ComponentStory<typeof NotificationContextWrapper> = (args) => (
  <NotificationContextWrapper {...args}>
    <NotificationMockComponent />
  </NotificationContextWrapper>
);

export const Default = Template.bind({});
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole('button');

  await userEvent.click(button);

  let notification;
  await waitFor(async () => {
    notification = await canvas.findByText(testNotificationMessage);
  });

  await waitForElementToBeRemoved(notification, { timeout: 7000 });
};
