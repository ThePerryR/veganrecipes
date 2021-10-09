import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import categories from '../../../constants/categories'
import Select from '../../elements/Select'

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 64px;
  display: flex;
  flex-wrap: wrap;
  margin-left: -8px;
  margin-right: -8px;
  > div {
    margin-left: 8px;
    margin-right: 8px;
    width: 280px;
  }
`

const Sublabel = styled.div`
  font-size: 13px;
  line-height: 24px;
  font-weight: 700;
  margin-bottom: 4px;
  color: #5e5e5e;
`
const Input = styled.input`
  height: 40px;
  font-size: 13px;
  padding-left: 10px;
`

function MetaDataEditor ({ category, setCategory, metadata, setMetadata }) {
  return (
    <Wrapper>
      <div>
        <Sublabel>Category</Sublabel>
        <Select
          top
          style={{ width: '100%' }}
          value={category}
          onChangeValue={setCategory}
          options={[{ label: 'Select a category...', value: '' }, ...categories]}
        />
      </div>
      <div style={{ width: 160 }}>
        <Sublabel>Prep time (minutes)</Sublabel>
        <Input
          type='number'
          value={metadata.prepTime || ''}
          onChange={e => setMetadata({ ...metadata, prepTime: e.target.value })}
        />
      </div>
      <div style={{ width: 160 }}>
        <Sublabel>Cook time (minutes)</Sublabel>
        <Input
          type='number'
          value={metadata.cookTime || ''}
          onChange={e => setMetadata({ ...metadata, cookTime: e.target.value })}
        />
      </div>
      <div style={{ width: 160 }}>
        <Sublabel>Number of servings?</Sublabel>
        <Input
          type='number'
          value={metadata.yield || ''}
          onChange={e => setMetadata({ ...metadata, yield: e.target.value })}
        />
      </div>
    </Wrapper>
  )
}

MetaDataEditor.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  setMetadata: PropTypes.func.isRequired,
  metadata: PropTypes.object.isRequired
}

export default MetaDataEditor
