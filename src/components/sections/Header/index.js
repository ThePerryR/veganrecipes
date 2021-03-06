import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useRootStore } from '../../RootStoreProvider'
import UserDropdown from './UserDropdown'
import Search from '../Search'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding-left: 32px;
  padding-right: 32px;
  background: white;


  @media (max-width: 736px) {
    height: 64px;
    padding-left: 16px;
    padding-right: 16px;
  }

  @media print {
    display: none;
  }
`

const StyledLink = styled(Link)`
  font-size: 13px;
  padding: 8px 12px;
  background: none;
  transition: all 80ms linear;
  &:hover {
    background: #f7f7f7;
  }
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Right = styled.div`
  height: 100%;
  display: flex;
  align-items: center;

  a {
    margin-left: 8px;
    margin-right: 8px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }
  }
`

const Logo = styled.img`
  height: 32px;
  margin-bottom: -12px;
  margin-right: 24px;
  
  @media (max-width: 736px) {
    height: 16px;
    margin-bottom: -6px;
  }
`

const SearchWrapper = styled.div`
  width: 320px;

  @media (max-width: 736px) {
    display: none;
  }
`

function Header ({ initialSearch }) {
  const history = useHistory()
  const { userStore } = useRootStore()
  const [path, setPath] = useState(history.location.pathname)
  const currentUser = userStore.currentUser
  history.listen((location) => {
    setPath(location.pathname)
  })
  return (
    <Wrapper>
      <Left>
        <Link to="/">
          <Logo alt='EasyVgn' src="/logo.svg"/>
        </Link>
        <SearchWrapper>
          <Search initialSearch={initialSearch}/>
        </SearchWrapper>
      </Left>
      <Right>
        {!currentUser && <StyledLink to={`/login?return=${path}`}><b>Login</b></StyledLink>}
        <StyledLink to={currentUser ? '/new-recipe' : '/register'}>
          {currentUser ? 'Add a recipe' : 'Register'}
        </StyledLink>
        {currentUser &&
        <UserDropdown user={currentUser}/>
        }
      </Right>
    </Wrapper>
  )
}

Header.propTypes = {
  initialSearch: PropTypes.string
}

export default Header
