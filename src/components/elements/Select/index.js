import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { VscChevronDown } from 'react-icons/vsc'
import useOnClickOutside from 'use-onclickoutside'

const Wrapper = styled.div`
  position: relative;
`

const Selector = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  width: 156px;
  padding-left: 8px;
  padding-right: 12px;
  border: 1px solid #b7b7b7;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;

  background: white;
  font-size: 13px;
  color: #444444;

  &:hover {
    border: 1px solid white;
    box-shadow: 0 0 0 4px #b1efca;
    color: initial;
  }
  
  ${props => props.open && `
  border: 1px solid white;
  box-shadow: 0 0 0 4px #b1efca;
  color: initial;
  `}
`

const Chevron = styled(VscChevronDown)`
  font-size: 16px;
  transform: rotate(0deg);
  transition: all 100ms linear;
  ${props => props.open && `
    transform: rotate(180deg);
  `}
`

const Dropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 56px;
  left: 0;
  width: 200px;
  border-radius: 4px;
  padding-top: 8px;
  padding-bottom: 8px;
  overflow: hidden;
  background: white;
  box-shadow: 0 3px 5px rgb(0 0 0 / 4%);
  border: 1px solid rgba(0,0,0,0.05);
`

const Option = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  box-sizing: border-box;
  cursor: pointer;
  
  font-size: 13px;
  color: #444444;
  &:hover {
    background: #f1f1f1;
  }
  
  ${props => props.active && `
    font-weight: 500;
    color: #006629;
  `}
`

function Select ({ value, options, onChangeValue }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false))
  return (
    <Wrapper ref={ref}>
      <Selector open={open} onClick={() => setOpen(!open)}>
        <span>{options.find(option => option.value === value).label}</span>
        <Chevron open={open}/>
      </Selector>
      {open &&
      <Dropdown>
        {options.map(option => (
          <Option
            key={option.value}
            active={value === option.value}
            onClick={() => {
              onChangeValue(option.value)
              setOpen(false)
            }}>
            {option.label}
          </Option>
        ))}
      </Dropdown>
      }
    </Wrapper>
  )
}

Select.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  onChangeValue: PropTypes.func.isRequired
}

export default Select
