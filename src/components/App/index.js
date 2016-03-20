import './styles.css';
import {Header} from '../Header';
import {PropTypes} from 'react';
import React from 'react';

export const App = (props) => (
  <section>
    <Header/>
    {props.children}
  </section>
);

App.propTypes = {
  children: PropTypes.node,
};
