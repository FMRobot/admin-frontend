import React from 'react';
import cssModules from '../../lib/cssModules';

import styles from './styles.css';

function _ControlPanel() {
  return (
    <section styleName="control-panel">
      <menu type="toolbar" styleName="control-panel__menu">
        <button
          type="button"
          styleName="control-panel__button control-panel__button_users"
        >
          Пользователи
        </button>

        <button
          type="button"
          styleName="control-panel__button control-panel__button_article"
        >
          Добавить<br/>статью
        </button>

        <button
          type="button"
          styleName="control-panel__button control-panel__button_translation"
        >
          Перевод
        </button>
      </menu>
    </section>
  );
}

export const ControlPanel = cssModules(_ControlPanel, styles);
