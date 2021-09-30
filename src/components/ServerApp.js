import React from 'react'
import PropTypes from 'prop-types'
import { StaticRouter } from 'react-router-dom'

import RootStoreProvider from './RootStoreProvider'
import Router from './Router'

function ServerApp ({ initialState, url }) {
  return (
    <StaticRouter location={url}>
      <RootStoreProvider initialState={initialState}>
        <Router />
      </RootStoreProvider>
    </StaticRouter>
  )
}

ServerApp.propTypes = {
  initialState: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired
}

export default ServerApp
