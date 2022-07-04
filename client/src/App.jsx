import { BrowserRouter, Link, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollToTop from './components/misc/ScrollToTop/ScrollToTop';
import './App.scss';
import { InitialPage } from './pages/Initial/Initial';
import { pages } from './util/pages';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/footer/Footer';

export default function App() {
  const initial = import.meta.env.MODE === 'production';
  if (initial) {
    return <InitialPage />;
  }
  return (
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}

// The 3 functions below are purely for testing purposes, delete as you will
function isLoggedIn() {
  return false;
}

function froshInitials() {
  return 'NL';
}

function isRegistered() {
  return false;
}

const TransitionRoutes = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <Navbar
        isLoggedIn={isLoggedIn()}
        froshInitials={froshInitials()}
        isRegistered={isRegistered()}
      />
      <ScrollToTop />
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          {[...pages.main, ...pages.hidden, ...pages.special].map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <div style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}>
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
    </TransitionGroup>
  );
};
