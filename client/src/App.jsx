import { BrowserRouter, Link, useLocation, Route, Routes } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ScrollToTop from './components/misc/ScrollToTop/ScrollToTop';
import './App.css';
import { InitialPage } from './pages/Initial/Initial';
import { pages } from './util/pages';
//import { Navbar, NavbarMobile, NavbarDesktop } from './components/Navbar/Navbar';
import { Button } from './components/button/Button/Button';
import { Navbar } from './components/Navbar/Navbar';
import { NavbarDesktop } from './components/Navbar/Navbar';
import { NavbarStorybook } from './components/Navbar/NavbarStorybook';
import { TestComponent } from './components/Navbar/test';

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
      <Navbar></Navbar>
      {/* <Button></Button> */}
      {/* <NavbarDesktop></NavbarDesktop> */}
      {/* <NavbarStorybook></NavbarStorybook> */}
      {/* <TestComponent></TestComponent> */}

      <ScrollToTop />
      <CSSTransition key={location.key} classNames="page" timeout={300}>
        <Routes location={location}>
          {pages.main.map((page) => {
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

// const Navbar = () => {
//   return (
//     <div
//       style={{
//         zIndex: 10,
//         position: 'fixed',
//         backgroundColor: 'gray',
//         width: '100%',
//         fontSize: '25px',
//       }}
//     >
//       {pages.main.map((page) => {
//         return (
//           <Link to={page.path} key={page.path}>
//             {page.label}
//           </Link>
//         );
//       })}
//     </div>
//   );
// };
