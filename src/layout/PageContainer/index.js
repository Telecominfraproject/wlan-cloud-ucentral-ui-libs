/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { v4 as createUuid } from 'uuid';
import { CContainer } from '@coreui/react';
import PropTypes from 'prop-types';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const PageContainer = ({ t, routes, redirectTo }) => (
  <CContainer fluid>
    <Suspense fallback={loading}>
      <Switch>
        {routes.map(
          (route) =>
            route.component && (
              <Route
                key={createUuid()}
                path={route.path}
                exact={route.exact}
                name={t(route.name)}
                render={(props) => (
                  <>
                    <route.component {...props} />
                  </>
                )}
              />
            ),
        )}
        <Redirect from="/" to={redirectTo} />
      </Switch>
    </Suspense>
  </CContainer>
);

PageContainer.propTypes = {
  t: PropTypes.func.isRequired,
  routes: PropTypes.arrayOf(Object).isRequired,
  redirectTo: PropTypes.string.isRequired,
};

export default React.memo(PageContainer);
