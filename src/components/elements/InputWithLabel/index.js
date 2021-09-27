import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`

const StyledInput = styled.input`
  height: 80px;

  border: 1px solid #D4D4D4;
  border-radius: 4px;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  padding-top: 28px;
  padding-left: 14px;
  padding-right: 14px;
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

function InputWithLabel ({label, value, setValue, style}) {
  return (
    <Wrapper style={style}>
      <StyledInput value={value} onChange={e => setValue(e.target.value)}/>
      <Label>{label}</Label>
    </Wrapper>
  )
}

export default InputWithLabel
