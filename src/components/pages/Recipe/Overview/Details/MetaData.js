import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Recipe } from '../../../../../stores/RecipeStore'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  color: #737373;
  align-self: flex-end;
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
  width: 100%;
  font-size: 13px;
  margin-bottom: 8px;
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
  const dateTime = new Intl.DateTimeFormat([], {
    month: 'short',
    year: 'numeric',
    day: 'numeric'
  })
  const createdAt = dateTime.format(new Date(recipe.createdAt))
  const updatedAt = dateTime.format(new Date(recipe.updatedAt))
  return (
    <Wrapper>
      {recipe.metadata.prepTime &&
      <Row>
        <div>Prep time</div>
        <div>{recipe.metadata.prepTime} minutes</div>
      </Row>
      }
      {recipe.metadata.cookTime &&
      <Row>
        <div>Cook time</div>
        <div>{recipe.metadata.cookTime} minutes</div>
      </Row>
      }
      <Row>
        <div>Created on</div>
        <div>{createdAt}</div>
      </Row>
      <Row>
        <div>Last updated</div>
        <div>{updatedAt}</div>
      </Row>
    </Wrapper>
  )
}

MetaData.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default MetaData
