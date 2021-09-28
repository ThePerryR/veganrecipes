import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useHistory, useParams } from 'react-router-dom'

import Select from '../../elements/Select'

const Wrapper = styled.div``

function FilterViews () {
  const { view } = useParams()

  const history = useHistory()

  console.log('v', view)

  return (
    <Wrapper>
      <Select
        value={view || 'new'}
        options={[
          { label: 'Popular', value: 'popular' },
          { label: 'New Recipes', value: 'new' },
        ]}
        onChangeValue={value => history.replace(`/recipes/${value}`)}
      />
    </Wrapper>
  )
}

FilterViews.propTypes = {}

export default FilterViews