import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'

const initialState = JSON.parse(document.getElementById('is').innerHTML.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#x27;/g, '\''))
const mountNode = document.getElementById('app')

ReactDOM.hydrate((<App initialState={initialState}/>), mountNode)

if (module.hot) {
  module.hot.accept('./components/App.js', () => {
    const NextRootContainer = require('./components/App.js').default
    ReactDOM.hydrate(<NextRootContainer initialState={initialState}/>, mountNode)
  })
}
