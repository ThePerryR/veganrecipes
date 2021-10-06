import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import IngredientList from './IngredientList'
import InstructionList from './InstructionList'
import { Recipe } from '../../../../stores/RecipeStore'

const Wrapper = styled.div`
  display: flex;
  max-width: 1360px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`

function Requirements ({ recipe }) {
  return (
   <Wrapper>
     <IngredientList ingredients={recipe.ingredients} metadata={recipe.metadata}/>
     <InstructionList instructions={recipe.instructions}/>
   </Wrapper>
  )
}

Requirements.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default Requirements
