import React from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #17ef6e;
  padding-left: 40px;
  padding-right: 40px;
  box-sizing: border-box;
`

const StyledInput = styled.input`
  height: 34px;
  border-radius: 17px;
  width: 100%;
  padding-left: 36px;
  box-sizing: border-box;

  font-size: 14px;
  border: none;
  color: rgba(23, 153, 75, 1);
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.04);
  ::placeholder {
    color: rgba(23, 153, 75, 0.32);
  }
  &:focus {
    outline: none;
  }
`

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`

function SearchBar () {
  return (
    <Wrapper>
      <InputWrapper>
      <StyledInput placeholder="What are you craving?"/>
      <AiOutlineSearch color='#17D764' size={16} style={{ position: 'absolute', left: 10, top: 9 }}/>
      </InputWrapper>
    </Wrapper>
  )
}

export default SearchBar
