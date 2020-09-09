import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import theme from '../src/theme';
import client from '../src/api';

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [ready, setReady] = useState(false);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // Import mocks.
    if (typeof window !== 'undefined') {
      const { worker } = require('../src/mocks/browser');

      worker.start().then(() => {
        setReady(true);
      });
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ApolloProvider client={client}>
          {ready ? <Component {...pageProps} /> : null}
        </ApolloProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
