import { BrowserRouter, Link, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollToTop from './components/misc/ScrollToTop/ScrollToTop';
import './App.css';
import { InitialPage } from './pages/Initial/Initial';
import { pages } from './util/pages';
import { Navbar } from './components/Navbar/Navbar';

export default function App() {
  const initial = false;
  if (initial) {
    return <InitialPage />;
  }
  return (
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}

const TransitionRoutes = () => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <Navbar />
      <ScrollToTop />
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          {[...pages.main, ...pages.hidden].map((page) => {
            return (
              <Route
                path={page.path}
                key={page.path}
                element={
                  <div style={{ position: 'absolute', right: 0, left: 0, bottom: 0, top: 0 }}>
                    <div style={{ minHeight: '100vh' }}>{page.component}</div>
                    {/* <Footer/> */}
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
