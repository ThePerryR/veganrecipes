import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 48px;
  margin-bottom: 44px;
  position: relative;
`

const StyledLink = styled(Link)`
  color: rgba(255,255,255,0.8);
  font-size: 14px;
  font-weight: 700;
  padding-left: 8px;
  padding-right: 8px;
  margin-left: 8px;
  margin-right: 8px;
  transition: all 120ms linear;
  &:visited {
    color: rgba(255,255,255,0.8);
  }
  &:hover {
    color: rgba(255,255,255,1)
  }
`

function Navigation () {
  return (
    <Wrapper>
      <StyledLink to='/recipes/new'>New</StyledLink>
    </Wrapper>
  )
}

export default Navigation
