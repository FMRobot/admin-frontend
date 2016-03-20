import React from 'react';
import cssModules from '../../lib/cssModules';

import styles from './styles.css';

function _Profile() {
  return (
    <section styleName="profile">
      <p styleName="profile__name">
        <span styleName="profile__role"/>
      </p>
      <a styleName="profile__logout" href="/logout/">Выход</a>
    </section>
  );
}

export const Profile = cssModules(_Profile, styles);
