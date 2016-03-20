import React from 'react';
import cssModules from '../../lib/cssModules';

import styles from './styles.css';

function _UserList() {
  return (
    <section styleName="user-list">
      <form action="/user-list/filter/" method="post">
        <fieldset>
          <input type="text" name="name" placeholder="Имя"/>
          <input type="text" name="login" placeholder="Логин"/>
          <label>
            <input type="checkbox" name="inteam"/> В редакции
          </label>
          <label>
            <input type="checkbox" name="notinteam"/> Не в редакции
          </label>
        </fieldset>
      </form>
      <menu type="toolbar" styleName="user-list__menu">
        <button type="button" styleName="user-list__add-user">Создать пользователя</button>
      </menu>
    </section>
  );
}

export const UserList = cssModules(_UserList, styles);
