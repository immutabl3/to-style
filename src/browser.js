import ToStyleFactory from './ToStyleFactory';
// in browser, get the css keys from the CSSSyleDeclaration to reduce file size
import cssStyleDeclaration from './cssStyleDeclaration.json';

const ToStyle = ToStyleFactory(new Set(cssStyleDeclaration));
const toStyle = ToStyle();
toStyle.create = ToStyle;

export default toStyle;