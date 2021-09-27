import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import {useRootStore} from '../../RootStoreProvider'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding-left: 80px;
  padding-right: 80px;
`

const StyledLink = styled(Link)`
  font-size: 13px;
`
const Left = styled.div``
const Right = styled.div`
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

function Footer () {
  const { userStore } = useRootStore()
  return (
    <Wrapper>
      <Left/>
      <Right>
        {userStore.currentUser && <a style={{fontSize: 13}} href='/logout'><b>Logout</b></a>}
        {!userStore.currentUser && <StyledLink to="/login"><b>Login</b></StyledLink>}
        <StyledLink to={userStore.currentUser ? '/new' : '/register'}>Add a recipe</StyledLink>
      </Right>
    </Wrapper>
  )
}

export default Footer
