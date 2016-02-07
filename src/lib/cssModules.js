import reactCssModules from 'react-css-modules';

export default function cssModules(component, styles) {
  const options = {
    allowMultiple: true,
    errorWhenNotFound: false,
  };
  return reactCssModules(component, styles, options);
}
