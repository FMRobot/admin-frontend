import {PropTypes} from 'react';
import React from 'react';

export const Root = ({app, data, lang, title}) => (
  <html lang={lang}>
    <head>
      <meta charSet="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <title>{title}</title>
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={app}/>
      <script dangerouslySetInnerHTML={data}/>
      <script src="/app.js" async defer/>
    </body>
  </html>
);

Root.defaultProps = {
  lang: 'ru',
};

Root.propTypes = {
  app: PropTypes.any.isRequired,
  data: PropTypes.any.isRequired,
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
};
