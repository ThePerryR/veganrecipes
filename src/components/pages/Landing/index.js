import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useRootStore } from '../../RootStoreProvider'
import Button from '../../elements/Button'
import Logo from '../../elements/Logo'
import SearchBar from './SearchBar'
import SidebarSection from './SidebarSection'

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 616px;
  padding: 56px 64px 24px 64px;
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
`

const LogoWrapper = styled.div`
  margin-bottom: 16px;
`

const LogoSubTitle = styled.h1`
  margin-bottom: 64px;

  color: #E6C98F;
  font-weight: 300;
  font-size: 19px;
  line-height: 32px;
  text-transform: lowercase;
`

const Palm = styled.img`
  position: absolute;
  bottom: -56px;
  left: -78px;
  ${props => props.loggedIn && `
  opacity: 0.04;
  `}
`

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`

function Landing () {
  const rootStore = useRootStore()
  const currentUser = rootStore.userStore.currentUser
  return (
    <Wrapper>
      <Palm src="/palm.svg" loggedIn={!!currentUser}/>

      <SearchBar/>

      <div style={{ flex: 1, width: '100%' }}>
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
