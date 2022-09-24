import { Route } from "react-router-dom";
import AuthTemplate from "templates/Authentication";
import MovieTemplate from "../templates/Movie";

export const renderMovie = (routes) =>
  routes.map(({ path, isIndex, Component, childRoutes }) =>
    childRoutes && childRoutes?.length > 0 ? (
      <Route
        index={!!isIndex}
        key={path}
        path={path}
        element={
          <MovieTemplate>
            <Component />
          </MovieTemplate>
        }
      >
        {childRoutes.map(({ path, isIndex, Component: ComponentChildRoute }) => (
          <Route
            index={!!isIndex}
            key={path}
            path={path}
            element={
              <MovieTemplate>
                <ComponentChildRoute />
              </MovieTemplate>
            }
          />
        ))}
      </Route>
    ) : (
      <Route
        index={!!isIndex}
        key={path}
        path={path}
        element={
          <MovieTemplate>
            <Component />
          </MovieTemplate>
        }
      />
    )
  );

export const renderAuth = (routes) =>
  routes.map(({ path, isIndex, Component, childRoutes }) =>
    childRoutes && childRoutes?.length > 0 ? (
      <Route
        index={!!isIndex}
        key={path}
        path={path}
        element={
          <AuthTemplate>
            <Component />
          </AuthTemplate>
        }
      >
        {childRoutes.map(({ path, isIndex, Component: ComponentChildRoute }) => (
          <Route
            index={!!isIndex}
            key={path}
            path={path}
            element={
              <AuthTemplate>
                <ComponentChildRoute />
              </AuthTemplate>
            }
          />
        ))}
      </Route>
    ) : (
      <Route
        index={!!isIndex}
        key={path}
        path={path}
        element={
          <AuthTemplate>
            <Component />
          </AuthTemplate>
        }
      />
    )
  );
