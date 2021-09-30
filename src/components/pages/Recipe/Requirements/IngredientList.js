import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 40%;
  max-width: 520px;
  box-sizing: border-box;


  @media (max-width: 720px) {
    width: 100%;
    max-width: 100%;
    margin-bottom: 32px;
  }
`

const List = styled.ol`
  list-style: none;
`

const Ingredient = styled.div`
  font-size: 15px;
  line-height: 24px;
  margin-bottom: 4px;
  font-weight: 500;
  color: #404040;
`

const Label = styled.h2`
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 16px;
  font-weight: 500;
  color: #3a3a3a;
`

function IngredientList ({ ingredients }) {
  return (
    <Wrapper>
      <Label>Ingredients</Label>
      <List>
        {ingredients.map((ingredient, i) => (
          <Ingredient key={i}>{ingredient}</Ingredient>
        ))}
      </List>
    </Wrapper>
  )
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default IngredientList
