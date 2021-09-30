import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Recipe } from '../../../../../stores/RecipeStore'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  color: #737373;
`

function MetaData ({ recipe }) {
  const createdAt = new Intl.DateTimeFormat([], {
    month: 'short',
    year: 'numeric',
    day: 'numeric'
  }).format(new Date(recipe.createdAt))
  return (
    <Wrapper>
      <div>
        Created {createdAt}
      </div>
      <div/>
    </Wrapper>
  )
}

MetaData.propTypes = {
  recipe: PropTypes.instanceOf(Recipe).isRequired
}

export default MetaData
