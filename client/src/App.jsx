import { BrowserRouter, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollToTop from './components/misc/ScrollToTop/ScrollToTop';
import './App.scss';
import { pages } from './util/pages';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { initialsSelector, loggedInSelector, registeredSelector } from './state/user/userSlice';
import { useEffect } from 'react';
import { getUserInfo } from './state/user/saga';
import { AskQuestionButton } from './components/button/AskQuestionButton/AskQuestionButton';
import { DarkModeProvider } from './util/DarkModeProvider';
import { SnackbarProvider } from './util/SnackbarProvider';

// import { getScuntSettings } from './state/scuntSettings/saga';
// import { scuntSettingsSelector } from './state/scuntSettings/scuntSettingsSlice';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    // dispatch(getScuntSettings());
  }, []);

  return (
    <DarkModeProvider>
      <SnackbarProvider>
        <BrowserRouter>
          <TransitionRoutes />
        </BrowserRouter>
      </SnackbarProvider>
    </DarkModeProvider>
  );
}

const TransitionRoutes = () => {
  const location = useLocation();
  const loggedIn = useSelector(loggedInSelector);
  const registered = useSelector(registeredSelector);
  const initials = useSelector(initialsSelector);
  // const scuntSettings = useSelector(scuntSettingsSelector);

  return (
    <TransitionGroup>
      <Navbar isLoggedIn={loggedIn} froshInitials={initials} isRegistered={registered} />
      <ScrollToTop />
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          {[
            ...pages.main,
            ...pages.hidden,
            ...pages.special,
            {
              /* ...pages.scunt,
            ...pages.scuntHidden, */
            },
          ].map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <div
                    className="content-container"
                    style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}
                  >
                    <div style={{ minHeight: '100vh' }}>{page.component}</div>
                    {page.includeFooter ? <Footer /> : <></>}
                  </div>
                }
              />
            );
          })}
          <Route path="*" element={pages['404'].component} />
        </Routes>
      </CSSTransition>
      <AskQuestionButton />
    </TransitionGroup>
  );
};
