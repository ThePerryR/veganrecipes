import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useRootStore } from '../../RootStoreProvider'
import Logo from '../../elements/Logo'
import SearchBar from './SearchBar'
import SidebarSection from './SidebarSection'
import Navigation from './Navigation'

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 33%;
  max-width: 600px;
  box-sizing: border-box;

  background: #17D764;
  color: #E8FEFF;
  text-align: center;
  overflow: hidden;

  h2 {
    font-size: 16px;
    font-weight: 700;
    line-height: 32px;
  }
  
  @media (max-width: 1520px) {
    display: none;
  }
  
  @media print {
    display: none;
  }
`

const Palm = styled.img`
  position: absolute;
  bottom: -2vw;
  left: -2vw;
  width: 88%;
  ${props => props.loggedIn && `
  opacity: 0.04;
  `}
`

const Footer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 24px;
  padding-bottom: 24px;
  box-sizing: border-box;
`

function Landing () {
  const rootStore = useRootStore()
  const currentUser = rootStore.userStore.currentUser
  return (
    <Wrapper>
      <Palm src="/palm.svg" loggedIn={!!currentUser}/>

      <SearchBar/>

      <Navigation />

      <div style={{ flex: 1, width: '100%', position: 'relative', paddingLeft: 40, paddingRight: 40, boxSizing: 'border-box' }}>
        {currentUser &&
        <SidebarSection
          label="My Recipes"
          recipes={rootStore.recipeStore.currentUsersRecipes}
          emptyState={(
            <div>No Recipes</div>
          )}
        />
        }
      </div>

      <Footer>
        <Link to="/">
          <Logo full/>
        </Link>
      </Footer>
    </Wrapper>
  )
}

export default Landing
