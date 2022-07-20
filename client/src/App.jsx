import { BrowserRouter, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollToTop from './components/misc/ScrollToTop/ScrollToTop';
import './App.scss';
import { pages } from './util/pages';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { initialsSelector, loggedInSelector, registeredSelector } from './pages/userSlice';
import { useState, useEffect } from 'react';
import { getUserInfo } from './pages/Login/saga';
import { InitialPage } from './pages/Initial/Initial';
import { AskQuestionButton } from './components/button/AskQuestionButton/AskQuestionButton';
import { userSelector } from '../src/pages/userSlice';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    // <InitialPage />
    <BrowserRouter>
      <TransitionRoutes />
    </BrowserRouter>
  );
}

const TransitionRoutes = () => {
  const location = useLocation();
  const loggedIn = useSelector(loggedInSelector);
  const registered = useSelector(registeredSelector);
  const initials = useSelector(initialsSelector);
  const [pageState, setPageState] = useState('form');
  const [showPopUp, setShowPopUp] = useState(false);
  const { user } = useSelector(userSelector);
  console.log(loggedIn);
  return (
    <TransitionGroup>
      <div
        onClick={() => {
          setShowPopUp(false);
        }}
      >
        <Navbar isLoggedIn={loggedIn} froshInitials={initials} isRegistered={registered} />
      </div>
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
      <AskQuestionButton
        showPopUp={showPopUp}
        setShowPopUp={setShowPopUp}
        pageState={pageState}
        setPageState={setPageState}
        user={user}
      />
    </TransitionGroup>
  );
};
