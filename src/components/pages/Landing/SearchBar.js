import React from 'react'
import styled from 'styled-components'
import { AiOutlineSearch } from 'react-icons/ai'

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
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

function SearchBar () {
  return (
    <Wrapper>
      <StyledInput placeholder="What are you craving?"/>
      <AiOutlineSearch color='#17D764' size={16} style={{ position: 'absolute', left: 10, top: 9 }}/>
    </Wrapper>
  )
}

export default SearchBar