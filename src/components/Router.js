import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Helmet } from 'react-helmet'

import NewRecipe from './pages/NewRecipe'
import Register from './pages/Register'
import Login from './pages/Login'
import Recipe from './pages/Recipe'
import Search from './pages/Search'
import Header from './sections/Header'
import { useRootStore } from './RootStoreProvider'
import Profile from './pages/Profile'
import Account from './pages/Account'
import EditRecipe from './pages/EditRecipe'

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-family: 'Poppins', serif;
    -webkit-font-smoothing: antialiased;
    background: #F6F6F6;
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
  @media (max-width: 1520px) {
    flex-direction: column;
  }
`

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

function Router () {
  const rootStore = useRootStore()
  const currentUser = rootStore.userStore.currentUser
  return (
    <React.Fragment>
      <Helmet>
        <title>Browse vegan recipes | EasyVgn</title>
        <meta name="description" content="Discover and share plant-based recipes with our community of vegans."/>
        <meta property="og:title" content="Browse vegan recipes | EasyVgn"/>
        <meta property="og:type" content="website"/>
        <meta property="og:description" content="Discover and share plant-based recipes with our community of vegans."/>
        <meta property="fb:app_id" content="602901140835407"/>
        <meta property="og:url" content="https://www.easyvgn.com/"/>
        <meta property="og:image" content="https://www.easyvgn.com/main-card.jpg"/>
      </Helmet>
      <GlobalStyle/>
      <Wrapper>
        <Main>
          <Header initialSearch={rootStore.initialSearch}/>
          <div style={{ flex: 1 }}>
            <Switch>
              <Route
                path="/new-recipe"
                render={({ location }) => currentUser
                  ? <NewRecipe/>
                  : <Redirect to={{ pathname: '/', state: { from: location } }}/>
                }
              />
              <Route
                path="/register"
                render={({ location }) => currentUser
                  ? <Redirect to={{ pathname: '/', state: { from: location } }}/>
                  : <Register/>
                }
              />
              <Route
                path="/login"
                render={({ location }) => currentUser
                  ? <Redirect to={{ pathname: '/', state: { from: location } }}/>
                  : <Login/>
                }
              />
              <Route path="/recipes/:view">
                <Search/>
              </Route>
              <Route path="/r/:id/edit">
                <EditRecipe/>
              </Route>
              <Route path="/r/:id">
                <Recipe/>
              </Route>
              <Route path="/u/:id">
                <Profile/>
              </Route>
              <Route path="/search/:query">
                <Search/>
              </Route>
              <Route path="/account">
                <Account/>
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
