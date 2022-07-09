import { BrowserRouter, Link, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollToTop from './components/misc/ScrollToTop/ScrollToTop';
import './App.scss';
import { InitialPage } from './pages/Initial/Initial';
import { pages } from './util/pages';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { useSelector } from 'react-redux';
import { initialsSelector, loggedInSelector, registeredSelector } from './pages/userSlice';

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

function froshInitials() {
  return 'NL';
}

const TransitionRoutes = () => {
  const location = useLocation();
  const loggedIn = useSelector(loggedInSelector);
  const registered = useSelector(registeredSelector);
  const initials = useSelector(initialsSelector);
  // console.log(loggedIn)
  return (
    <TransitionGroup>
      <Navbar isLoggedIn={loggedIn} froshInitials={initials} isRegistered={registered} />
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
