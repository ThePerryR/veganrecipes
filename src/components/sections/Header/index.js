import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useRootStore } from '../../RootStoreProvider'
import UserDropdown from './UserDropdown'
import Search from '../Search'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding-left: 32px;
  padding-right: 32px;
  background: white;

  @media print {
    display: none;
  }
`

const StyledLink = styled(Link)`
  font-size: 13px;
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

const SearchWrapper = styled.div`
  width: 320px;
`

function Header ({ initialSearch }) {
  const { userStore } = useRootStore()
  const currentUser = userStore.currentUser
  return (
    <Wrapper>
      <Left>
        <Link to="/">
          <img alt='EasyVgn' height={24} src="/logo.svg" style={{ height: 24, marginBottom: -10, marginRight: 24 }}/>
        </Link>
        <SearchWrapper>
          <Search initialSearch={initialSearch}/>
        </SearchWrapper>
      </Left>
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

Header.propTypes = {
  initialSearch: PropTypes.string
}

export default Header
