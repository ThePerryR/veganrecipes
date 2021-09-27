import React from 'react'
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

export default ServerApp
