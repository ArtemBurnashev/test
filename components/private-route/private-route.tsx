import React from 'react';
import Router from 'next/router';
import { Paths } from 'config/site-paths';
import { NextPage } from 'next';
import { store } from 'redux-state/store';

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */

export default (WrappedComponent: NextPage) => {
  const userAuth = store.getState().user;
  const hocComponent = ({ ...props }) => <WrappedComponent {...props} />;

  hocComponent.getInitialProps = async (context: any) => {
    // Are you an authorized user or not?
    if (!userAuth?.isAuthenticated) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: Paths.HOME,
        });
        context.res?.end();
      } else {
        Router.replace(Paths.HOME);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({
        ...context,
        auth: userAuth,
      });
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};
