import ToStyleFactory from './ToStyleFactory.js';
// in browser, get the css keys from the CSSSyleDeclaration to reduce file size
import cssStyleDeclaration from './cssStyleDeclaration.js';

const ToStyle = ToStyleFactory(new Set(cssStyleDeclaration));
const toStyle = ToStyle();
toStyle.create = ToStyle;

export default toStyle;