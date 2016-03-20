import React from 'react';
import {Profile} from '../Profile';
import cssModules from '../../lib/cssModules';

import styles from './styles.css';

function _Header() {
  return (
    <header styleName="header">
      <Profile/>
    </header>
  );
}

export const Header = cssModules(_Header, styles);
