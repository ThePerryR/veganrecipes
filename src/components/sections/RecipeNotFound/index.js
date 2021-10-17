import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`

function RecipeNotFound () {
  return (
    <Wrapper>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Whoops!</h1>
      <div>Sorry, we cannot find this recipe.</div>
    </Wrapper>
  )
}

RecipeNotFound.propTypes = {}

export default RecipeNotFound
