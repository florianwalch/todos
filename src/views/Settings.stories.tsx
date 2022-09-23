import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { ThemeContextWrapper, ThemeType } from '@/context/theme';
import { SettingsView } from '@/views/Settings';

export default {
  title: 'Views/SettingsView',
  component: SettingsView,
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'story',
  },
} as ComponentMeta<typeof SettingsView>;

const Template: ComponentStory<typeof SettingsView> = () => {
  localStorage.setItem('theme', JSON.stringify(ThemeType.DARK));

  return (
    <ThemeContextWrapper>
      <MemoryRouter initialEntries={['/settings']}>
        <Routes>
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </MemoryRouter>
    </ThemeContextWrapper>
  );
};

export const Default = Template.bind({});

export const ChangeTheme = Template.bind({});
ChangeTheme.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);

  const button = canvas.getByTestId('theme-switch');
  await userEvent.click(button);

  let themeItem = localStorage.getItem('theme');
  await expect(themeItem).toEqual(JSON.stringify(ThemeType.LIGHT));

  await userEvent.click(button);
  themeItem = localStorage.getItem('theme');
  await expect(themeItem).toEqual(JSON.stringify(ThemeType.DARK));
};
