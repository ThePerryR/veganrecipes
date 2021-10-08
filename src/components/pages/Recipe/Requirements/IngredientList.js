import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RiScales2Line, RiCloseFill } from 'react-icons/ri'

const Wrapper = styled.div`
  width: 40%;
  max-width: 520px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;


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

const Toggle = styled.div`
  height: 24px;
  border: 1px solid grey;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;
  padding-left: 4px;
  padding-right: 4px;
  margin-top: 16px;
  @media print {
    display: none;
  }
`

const Range = styled.input`
  width: 320px;
`

function roundQuantity (amount, unit) {
  return Math.round(amount * 100) / 100
}

function IngredientList ({ ingredients, metadata }) {
  const [convertOpen, setConvertOpen] = useState(false)
  const [conversion, setConversion] = useState(1)
  return (
    <Wrapper>
      <Label>Ingredients</Label>
      <List>
        {ingredients.map((ingredient, i) => (
          <Ingredient key={i}>
            {roundQuantity(ingredient.quantity * conversion, ingredient.unit)} {ingredient.unit} {ingredient.ingredient}
            {ingredient.prep &&
            <span style={{ fontWeight: 400, marginLeft: 8, fontSize: 14, color: '#9b9b9b' }}>
              ({ingredient.prep})
            </span>
            }
          </Ingredient>
        ))}
      </List>
      <Toggle>
        {convertOpen &&
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Range
            type="range"
            min="0.1"
            max="10"
            step="any"
            value={conversion}
            onChange={e => setConversion(Number(e.target.value))}
          />
          <span style={{ fontSize: 12, color: 'grey' }}>(x{Math.round(conversion * 10) / 10})</span>
        </div>
        }
        <div onClick={() => setConvertOpen(!convertOpen)}>
          {convertOpen ? <RiCloseFill/> : <RiScales2Line/>}
        </div>
      </Toggle>
    </Wrapper>
  )
}

IngredientList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default IngredientList
