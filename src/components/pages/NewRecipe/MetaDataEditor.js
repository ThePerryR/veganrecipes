import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import categories from '../../../constants/categories'
import Select from '../../elements/Select'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 64px;
`

const Label = styled.div`
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  margin-bottom: 16px;
  color: #5e5e5e;
`
const Sublabel = styled.div`
  font-size: 13px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #5e5e5e;
`

function MetaDataEditor ({ category, setCategory }) {
  return (
    <Wrapper>
      <Label>Metadata</Label>
      <Sublabel>Category</Sublabel>
      <Select
        top
        value={category}
        onChangeValue={setCategory}
        options={[{ label: 'Select a category...', value: '' }, ...categories]}
        style={{ width: 320 }}
      />
    </Wrapper>
  )
}

MetaDataEditor.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired
}

export default MetaDataEditor
