import PropTypes from 'prop-types';
import { colors } from './colors';
import './AdminPage.scss';

/**
 * Admin/leedur tooling is not part of the public-facing site, so it does not follow
 * the visitor's light/dark preference - it always renders on the site purple.
 *
 * Rather than restyling every dashboard, the whole dark-mode palette is applied to
 * the subtree as CSS custom properties. Those declarations override the ones the
 * DarkModeProvider sets on <html>, so every existing `var(--...)` inside an admin
 * page resolves to a value that is readable on purple.
 */
const adminPalette = Object.keys(colors).reduce(
  (palette, name) => {
    palette[name] = colors[name][1];
    return palette;
  },
  // Not part of colors.jsx - the 2T6 pages declare it in Home.scss.
  { '--bg-main': '#3d0f58' },
);

const AdminPage = ({ children }) => (
  <div className="admin-page-background" style={adminPalette}>
    {children}
  </div>
);

AdminPage.propTypes = {
  children: PropTypes.node,
};

export { AdminPage };
