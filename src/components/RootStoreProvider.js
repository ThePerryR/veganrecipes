import React, { createContext, useContext } from 'react'

import RootStore from '../stores/RootStore'

let store
const StoreContext = createContext(undefined)

function RootStoreProvider({ initialState, children, notyf}) {
  const root = store || new RootStore(initialState, notyf)
  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}

export function useRootStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error("useRootStore must be used within RootStoreProvider")
  }
  return context
}

export default RootStoreProvider
