import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Photos from './Photos'
import Details from './Details'
import { Recipe } from '../../../../stores/RecipeStore'

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 64px;
  max-width: 1360px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 1000px) {
    margin-bottom: 40px;
  }
  @media (max-width: 880px) {
    flex-direction: column-reverse;
    margin-bottom: 24px;
  }

  @media print {
    margin-bottom: 0;
  }
`

function Overview ({ recipe }) {
  return (
    <Wrapper>
      <Photos images={recipe.images}/>

      <Details recipe={recipe} />
    </Wrapper>
  )
}

Overview.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default Overview
