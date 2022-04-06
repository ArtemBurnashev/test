import { ThemeProvider } from '@mui/material/styles';
import theme from 'config/mui-config';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';

import 'lib/i18next';
import { useApollo } from 'lib/apollo';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { store } from 'redux-state/store';
import { saveState } from 'utils/storage';
import colors from 'config/theme';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Jost', sans-serif !important;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: ${colors.black}
  }
`;

store.subscribe(() => saveState("cart", store.getState().cart))

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  return (
    <>
      <Head>
        <title>Giper Mart</title>
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
