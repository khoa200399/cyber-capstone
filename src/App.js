import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { renderAuth, renderMovie } from './utils/route';
import movieRoute from './routes/movieRoute';
import authRoute from './routes/authRoute'
import bookingRoute from './routes/bookingRoute'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from 'hooks/useLocalStorage';
import { toggleMode } from 'store/common';

function App() {
  const dispatch = useDispatch()
  const [darkMode, setDarkMode] = useLocalStorage('dark-mode-enabled');
  const darkStat = useSelector(state => state.common.darkMode)
  useEffect(() => {
    dispatch(toggleMode(darkMode))
  }, [])

  const mode = darkStat ? 'dark' : 'light';
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/homepage">{renderMovie(movieRoute)}</Route>
        <Route
          path="/"
          element={<Navigate to="/homepage" replace />}
        />
        <Route path="/">{renderAuth(authRoute)}</Route>
        <Route path="/">{renderAuth(bookingRoute)}</Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
