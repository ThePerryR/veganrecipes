import React from 'react'
import { Redirect, Route, Switch, useLocation } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Helmet } from 'react-helmet'

import Landing from './pages/Landing'
import NewRecipe from './pages/NewRecipe'
import Register from './pages/Register'
import Login from './pages/Login'
import Recipe from './pages/Recipe'
import Search from './pages/Search'
import Explore from './pages/Explore'
import Header from './sections/Header'
import { useRootStore } from './RootStoreProvider'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: 'Poppins', serif;
    -webkit-font-smoothing: antialiased;
    background: #F6F7F9;
  }

  p {
    font-size: 16px;
    line-height: 32px;
  }

  a {
    text-decoration: none;
    color: initial;

    &:visited {
      color: initial;
    }
  }

  b {
    font-weight: 700;
  }

  h4 {
    font-size: 48px;
    line-height: 64px;
    font-weight: 700;
  }

  h5 {
    font-size: 24px;
    line-height: 40px;
    margin-bottom: 24px;
  }

  label {
    display: block;
    line-height: 32px;
  }

  input {
    height: 64px;
    border: 1px solid #C0C9D0;
    font-size: 18px;
    border-radius: 5px;
    padding-left: 17px;
    padding-right: 17px;
    box-sizing: border-box;
    width: 100%;
    transition: all 120ms linear;
    font-family: 'Poppins', sans-serif;

    ::placeholder {
      color: #D4D4D4;
    }

    &:focus {
      outline: none;
      border: 1px solid #17D764;
    }
  }
  textarea {
    height: 80px;
    border: 1px solid #C0C9D0;
    font-size: 18px;
    border-radius: 5px;
    padding: 8px 17px;
    box-sizing: border-box;
    width: 100%;
    transition: all 120ms linear;
    resize: none;
    font-family: 'Poppins', sans-serif;

    ::placeholder {
      color: #D4D4D4;
    }

    &:focus {
      outline: none;
      border: 1px solid #17D764;
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

function Router () {
  const rootStore = useRootStore()
  const currentUser = rootStore.userStore.currentUser
  const location = useLocation()
  return (
    <React.Fragment>
      <Helmet>
        <title>EasyVgn</title>
      </Helmet>
      <GlobalStyle/>
      <Wrapper>
        <Switch>
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
        <Main>
          <Header/>
          <div style={{ flex: 1 }}>
            <Switch>
              <Route
                path="/new-recipe"
                render={({ location }) => !!currentUser
                  ? <NewRecipe/>
                  : <Redirect to={{ pathname: '/', state: { from: location } }}/>
                }
              />
              <Route
                path="/register"
                render={({ location }) => !!currentUser
                  ? <Redirect to={{ pathname: '/', state: { from: location } }}/>
                  : <Register/>
                }
              />
              <Route
                path="/login"
                render={({ location }) => !!currentUser
                  ? <Redirect to={{ pathname: '/', state: { from: location } }}/>
                  : <Login/>
                }
              />
              <Route path="/recipes/:view">
                <Search/>
              </Route>
              <Route path="/r/:id">
                <Recipe/>
              </Route>
              <Route path="/">
                <Search/>
              </Route>
            </Switch>
          </div>
        </Main>
      </Wrapper>
    </React.Fragment>
  )
}

export default Router
