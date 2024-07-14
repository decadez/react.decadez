import React from 'react'

/**
 * {
    $$typeof: Symbol(react.element),
    "type": "div",
    "key": null,
    "ref": null,
    "props": {
        "children": "Hello World"
    },
    "_mark": "react.decadez"
  }
 */
console.log(React.createElement('div', null, 'Hello World'));