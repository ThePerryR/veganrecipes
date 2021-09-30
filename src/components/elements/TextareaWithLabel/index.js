import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Wrapper = styled.div`
  position: relative;
`

const StyledTextarea = styled.textarea`
  height: 104px;
  width: 100%;
  box-sizing: border-box;
  padding-top: 40px;
  padding-left: 14px;
  padding-right: 14px;
  font-family: 'Poppins', sans-serif;

  border: 1px solid #D4D4D4;
  border-radius: 4px;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  resize: none;
  
  &:focus {
    outline: none;
  }
`

const Label = styled.label`
  position: absolute;
  top: 11px;
  left: 14px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #B7B7B7;
`

function TextareaWithLabel ({ label, value, setValue, style }) {
  return (
    <Wrapper style={style}>
      <StyledTextarea value={value} onChange={e => setValue(e.target.value)}/>
      <Label>{label}</Label>
    </Wrapper>
  )
}

TextareaWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,

  style: PropTypes.object
}

export default TextareaWithLabel
