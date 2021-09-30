import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import RootStoreProvider from './RootStoreProvider'
import Router from './Router'

function App ({ initialState }) {
  const notyf = new window.Notyf()

  return (
    <BrowserRouter>
      <RootStoreProvider initialState={initialState} notyf={notyf}>
        <Router />
      </RootStoreProvider>
    </BrowserRouter>
  )
}

App.propTypes = {
  initialState: PropTypes.object
}

export default App
