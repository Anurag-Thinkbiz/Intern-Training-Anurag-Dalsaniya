import type { Preview } from "@storybook/react";


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const globalTypes = {
  locale: {
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English" },
        { value: "hi", title: "hindi" },
      ],
      showName: true,
    },
  },
};

export default preview;
