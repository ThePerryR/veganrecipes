import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { Recipe } from '../../../../../stores/RecipeStore'

const Wrapper = styled.div`
  display: flex;
  font-size: 13px;
  color: #737373;
  width: 100%;
  max-width: 320px;
  @media print {
    flex-direction: row;
    max-width: 100%;
    margin-top: 24px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  margin-right: 16px;

  > div:first-child {
    margin-right: 6px;
    opacity: 0.64;
  }
  @media print {
    width: initial;
    margin-right: 16px;
    font-size: 12px;
    > div:first-child {
      margin-right: 4px;
      font-weight: 700;
      opacity: 0.64;
    }
  }
`

function MetaData ({ recipe }) {
  return (
    <Wrapper>
      {recipe.metadata.prepTime &&
      <Row>
        <div>Prep time:</div>
        <div>{recipe.metadata.prepTime} minutes</div>
      </Row>
      }
      {recipe.metadata.cookTime &&
      <Row>
        <div>Cook time:</div>
        <div>{recipe.metadata.cookTime} minutes</div>
      </Row>
      }
    </Wrapper>
  )
}

MetaData.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default observer(MetaData)
