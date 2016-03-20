import React from 'react';
import cssModules from '../../lib/cssModules';

import styles from './styles.css';

function _User() {
  return (
    <article styleName="user" data-id="">
      <figure styleName="user__details">
        <img src="" alt="avatar" styleName="user__avatar"/>
        <figcaption styleName="user__name"></figcaption>
      </figure>
      <menu styleName="user__controls" type="toolbar">
        <button type="button">Удалить</button>
        <button type="button">Редактировать</button>
      </menu>
    </article>
  );
}

export const User = cssModules(_User, styles);
