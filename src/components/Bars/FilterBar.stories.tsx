import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { useArgs } from '@storybook/client-api';

import { ModelSortDirection } from '@/API';
import { FilterBar } from '@/components/Bars/FilterBar';

export default {
  title: 'Components/Bars/FilterBar',
  component: FilterBar,

  args: {
    isDone: false,
    isDue: false,
    sortByDate: ModelSortDirection.DESC,
  },

  argTypes: {
    filterOptions: {
      table: {
        disable: true,
      },
    },
    isDone: {
      description: 'Include closed todos',
      control: 'boolean',
    },
    isDue: {
      description: 'Show urgent todos only',
      control: 'boolean',
    },
    sortByDate: {
      description: 'Sort by date',
      control: 'radio',
      options: [ModelSortDirection.DESC, ModelSortDirection.ASC],
    },
  },

  docs: {
    source: {
      code: `<FilterBar filterOptions={filterOptions} 
           onChange={setFilterOptions} />`,
      language: 'tsx',
    },
  },
} as ComponentMeta<typeof FilterBar>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof FilterBar> = (args) => {
  const [{ onChange, isDue, isDone, sortByDate }, updateArgs] = useArgs();

  return (
    <FilterBar
      filterOptions={{ isDue, isDone, sortByDate }}
      onChange={(filterOptions) => {
        updateArgs({ ...filterOptions });
        onChange(filterOptions);
      }}
    />
  );
};

export const Default = Template.bind({});

export const ChangeIsDoneFilter = Template.bind({});
ChangeIsDoneFilter.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const includeDoneCheckbox: HTMLInputElement = await canvas.findByLabelText(
    /Include done todos/,
  );
  await userEvent.click(includeDoneCheckbox);

  await waitFor(async () => {
    await expect(includeDoneCheckbox.checked).toBeTruthy();
  });

  await expect(args.onChange).toBeCalledWith(
    expect.objectContaining({
      isDone: true,
    }),
  );

  await userEvent.click(includeDoneCheckbox);

  await waitFor(async () => {
    await expect(includeDoneCheckbox.checked).toBeFalsy();
  });

  await expect(args.onChange).toBeCalledWith(
    expect.objectContaining({
      isDone: false,
    }),
  );
};

export const ChangeIsDueFilter = Template.bind({});
ChangeIsDueFilter.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const dueOnlyCheckbox: HTMLInputElement = await canvas.findByLabelText(
    /Only due/,
  );
  await userEvent.click(dueOnlyCheckbox);

  await waitFor(async () => {
    await expect(dueOnlyCheckbox.checked).toBeTruthy();
  });

  await expect(args.onChange).toBeCalledWith(
    expect.objectContaining({
      isDue: true,
    }),
  );

  await userEvent.click(dueOnlyCheckbox);

  await waitFor(async () => {
    await expect(dueOnlyCheckbox.checked).toBeFalsy();
  });
  await expect(args.onChange).toBeCalledWith(
    expect.objectContaining({
      isDue: false,
    }),
  );
};

export const ChangeSortOrder = Template.bind({});
ChangeSortOrder.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);

  const sortSwitch: HTMLInputElement = await canvas.findByLabelText(
    /Newest first/,
  );
  await userEvent.click(sortSwitch);

  await waitFor(async () => {
    await expect(sortSwitch.checked).toBeFalsy();
  });

  await expect(args.onChange).toBeCalledWith(
    expect.objectContaining({
      sortByDate: ModelSortDirection.ASC,
    }),
  );

  await userEvent.click(sortSwitch);

  await waitFor(async () => {
    await expect(sortSwitch.checked).toBeTruthy();
  });
  await expect(args.onChange).toBeCalledWith(
    expect.objectContaining({
      sortByDate: ModelSortDirection.DESC,
    }),
  );
};
