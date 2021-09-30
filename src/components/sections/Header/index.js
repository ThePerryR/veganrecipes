import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { useRootStore } from '../../RootStoreProvider'
import UserDropdown from './UserDropdown'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding-left: 80px;
  padding-right: 40px;
  background: white;
  
  @media print {
    display: none;
  }
`

const StyledLink = styled(Link)`
  font-size: 13px;
`
const Left = styled.div``
const Right = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  a {
    margin-left: 16px;
    margin-right: 16px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

function Header () {
  const { userStore } = useRootStore()
  const currentUser = userStore.currentUser
  return (
    <Wrapper>
      <Left/>
      <Right>
        {!currentUser && <StyledLink to="/login"><b>Login</b></StyledLink>}
        <StyledLink to={currentUser ? '/new-recipe' : '/register'}>Add a recipe</StyledLink>
        {currentUser &&
        <UserDropdown user={currentUser}/>
        }
      </Right>
    </Wrapper>
  )
}

export default Header
