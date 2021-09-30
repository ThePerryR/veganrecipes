import React from 'react'
import styled from 'styled-components'

import FilterViews from './FilterViews'
import FilterCategories from './FilterCategories'
import FilterSettings from './FilterSettings'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
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
