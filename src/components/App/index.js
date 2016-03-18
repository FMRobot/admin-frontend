import React, {PropTypes} from 'react';

export const App = (props) => <div>{props.children}</div>;

App.propTypes = {
  children: PropTypes.node,
};
