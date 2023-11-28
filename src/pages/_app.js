// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme'; // Adjust the path as necessary

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
