import React from 'react'
import styled from 'styled-components'

import FilterViews from './FilterViews'
import FilterCategories from './FilterCategories'
import FilterSettings from './FilterSettings'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  margin-top: 16px;
  width: 100%;
  height: 64px;
  padding-left: 32px;
  padding-right: 32px;


  @media (max-width: 736px) {
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 0;
    margin-bottom: 0;
  }
`

function Filter () {
  return (
    <Wrapper>
      <FilterViews/>
      <FilterCategories/>
      <FilterSettings/>
    </Wrapper>
  )
}

Filter.propTypes = {}

export default Filter
