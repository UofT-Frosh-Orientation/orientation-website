import React, { Suspense, lazy } from 'react';
import { SkeletonLoading } from './components/misc/SkeletonLoading/SkeletonLoading';

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
import { AskQuestionButton } from './components/button/AskQuestionButton/AskQuestionButton';
import { DarkModeProvider } from './util/DarkModeProvider';
import { SnackbarProvider } from './util/SnackbarProvider';

import { getScuntSettings } from './state/scuntSettings/saga';
import { getUserInfo } from './state/user/saga';

import { LandingPage } from './pages/Initial/LandingPage';
import { Maintenance } from './pages/Initial/Maintenance/Maintenance';
import { ComingSoon } from './pages/Initial/ComingSoon/ComingSoon';

// Set to false to take over the whole site with the single Coming Soon page
// (no router, navbar or footer). Flip back to true to restore the full app.
const readyForFrosh = true;

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getScuntSettings());
  }, []);

  return (
    <DarkModeProvider>
      {readyForFrosh ? (
        <SnackbarProvider>
          <BrowserRouter>
            <TransitionRoutes />
          </BrowserRouter>
        </SnackbarProvider>
      ) : (
        // <LandingPage />
        // <Maintenance />
        <ComingSoon />
      )}
    </DarkModeProvider>
  );
}

// Define delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Lazy import pages with delay for testing skeleton
const PageHome = lazy(() =>
  delay(2000).then(() => import('./pages/Home/Home').then(m => ({ default: m.PageHome })))
);

const PageAbout = lazy(() =>
  delay(2000).then(() => import('./pages/About/About').then(m => ({ default: m.PageAbout })))
);

const PageFAQ = lazy(() =>
  delay(2000).then(() => import('./pages/FAQ/FAQ').then(m => ({ default: m.PageFAQ })))
);

// Mapping paths to lazy components for easy lookup
const lazyPagesMap = {
  '/': PageHome,
  '/about': PageAbout,
  '/faq': PageFAQ,
};

const TransitionRoutes = () => {
  const location = useLocation();
  const loggedIn = useSelector(loggedInSelector);
  const registered = useSelector(registeredSelector);
  const initials = useSelector(initialsSelector);

  // List of route paths where skeleton loading effect will be shown
  const showSkeletonPages = ['/', '/about', '/faq'];

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
            ...pages.scunt,
            ...pages.scuntHidden,
          ].map((page) => {
            // List of paths to show skeleton for
            const showSkeletonPages = ['/', '/about', '/faq'];
            //const PageComponent = page.component;
            const LazyComponent = showSkeletonPages.includes(page.path.toLowerCase())
              ? lazyPagesMap[page.path.toLowerCase()]
              : null;

            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <div className="content-container" style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}>
                    {showSkeletonPages.includes(page.path.toLowerCase()) && LazyComponent ? (
                      <Suspense fallback={<SkeletonLoading />}>
                        <LazyComponent />
                      </Suspense>
                    ) : (
                      <>{page.component}</>  // Render static component as-is
                    )}
                    {page.includeFooter ? <Footer /> : null}
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
