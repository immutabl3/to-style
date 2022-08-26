import ToStyleFactory from './ToStyleFactory.js';
// in node, we don't have access to the CSSSyleDeclaration so we'll import a json file with the keys
import domStyleKeys from './domStyleKeys.js';

const ToStyle = ToStyleFactory(new Set(domStyleKeys));
const toStyle = ToStyle();
toStyle.create = ToStyle;

export default toStyle;