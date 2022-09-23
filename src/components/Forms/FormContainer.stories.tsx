import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import {
  userEvent,
  waitForElementToBeRemoved,
  within,
} from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { FormContainer } from '@/components/Forms/FormContainer';
import { NotificationContextWrapper } from '@/context/notification';

export default {
  title: 'Forms/FormContainer',
  component: FormContainer,
  argTypes: {
    onSuccess: { action: true },
    onError: { action: true },
  },
} as ComponentMeta<typeof FormContainer>;

const FakeForm = ({
  onSubmit,
  formError,
}: {
  onSubmit?: (data: string) => void;
  formError?: string | null;
}) => {
  return (
    <>
      {formError != null && <p>{formError}</p>}
      <button
        role="button"
        type="submit"
        onClick={() => onSubmit?.('Test data')}>
        Submit
      </button>
    </>
  );
};

const Template: ComponentStory<typeof FormContainer> = (args) => {
  return (
    <NotificationContextWrapper>
      <FormContainer {...args}>
        <FakeForm />
      </FormContainer>
    </NotificationContextWrapper>
  );
};

export const Default = Template.bind({});
Default.args = {
  successNotificationMessage: 'Test notification',
  onSubmit: (data) => Promise.resolve(data),
};

Default.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.getByRole('button');

  await userEvent.click(button);

  const loader = await canvas.findByTestId('loader');
  expect(loader).not.toBeNull();

  //await waitFor(async () => {
  await expect(args.onSuccess).toBeCalledWith('Test data');
  //});

  await waitForElementToBeRemoved(loader);

  const notification = await canvas.findByText(/Test notification/i);
  expect(notification).not.toBeNull();

  await waitForElementToBeRemoved(
    await canvas.findByText(/Test notification/i),
    { timeout: 7000 },
  );
};

export const FormError = Template.bind({});
FormError.args = {
  onSubmit: () => Promise.reject('Form error'),
};
FormError.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  const button = await canvas.getByRole('button');

  await userEvent.click(button);

  const loader = await canvas.findByTestId('loader');
  expect(loader).not.toBeNull();

  await expect(args.onError).toBeCalledWith('Form error');
  await waitForElementToBeRemoved(loader);

  const errorMessage = await canvas.findByText(/Form error/i);
  expect(errorMessage).not.toBeNull();

  const notification = await canvas.queryByText(/Test notification/i);
  await expect(notification).toBeNull();
};
