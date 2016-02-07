import './styles.css';
import {PropTypes} from 'react';
import React from 'react';

export const App = (props) => <div>{props.children}</div>;

App.propTypes = {
  children: PropTypes.node,
};
