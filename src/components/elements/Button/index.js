import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  min-width: 64px;
  padding-left: 32px;
  padding-right: 32px;
  border-radius: 20px;
  cursor: pointer;
  outline: none;
  border: none;

  background: #D76817;
  color: white;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0.8px;

  transition: all 120ms linear;

  &:hover {
    background: #f17a25;
  }

  &:disabled {
    background: #d1d1d1;
    color: #9f9f9f;
    cursor: initial;
  }

  ${props => props.text && `
  background: none;
  color: initial;
  text-transform: initial;
  font-size: 15px;
  letter-spacing: initial;
  &:hover {
    background: #f1f1f1;
  }
  `}
`

function Button ({ label, text, style, onClick, disabled }) {
  return (
    <Wrapper text={text} style={style} onClick={onClick} disabled={disabled}>
      {label}
    </Wrapper>
  )
}

Button.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  text: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  style: PropTypes.object
}

export default Button
