// all browsers except firefox
const keys = Object.keys(document.createElement('div').style);

export default keys.length 
  ? keys 
  // firefox fallback
  : Object.values(globalThis.getComputedStyle(globalThis.document.body));