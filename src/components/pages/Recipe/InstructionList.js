import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import converter from 'number-to-words'

const Wrapper = styled.div`
  width: 50%;
  padding-right: 40px;
  box-sizing: border-box;
`

const List = styled.ol`
  list-style: none;
`

const InstructionWrapper = styled.li`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 8px;
  color: #545454;
`

const Number = styled.span`
  font-weight: 800;
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 8px;
`

const Instruction = styled.span`
  margin-bottom: 24px;
`

const Label = styled.h2`
  font-size: 22px;
  line-height: 32px;
  margin-bottom: 16px;
  font-weight: 500;
  color: #3a3a3a;
`
function cap(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function InstructionList ({ instructions }) {
  return (
    <Wrapper>
      <Label>Preparation</Label>
      <List>
        {instructions.map((ingredient, i) => (
          <InstructionWrapper key={i}>
            <Number>Step {cap(converter.toWords(i + 1))}</Number>
            <Instruction>
              {ingredient}
            </Instruction>
          </InstructionWrapper>
        ))}
      </List>
    </Wrapper>
  )
}

InstructionList.propTypes = {}

export default InstructionList
