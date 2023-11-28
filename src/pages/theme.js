// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      // Apply styles to the `body` element
      body: {
        bg: 'black', // Set background color to black
        color: 'white', // Optionally set a default text color
      },
    },
  },
});

export default theme;
