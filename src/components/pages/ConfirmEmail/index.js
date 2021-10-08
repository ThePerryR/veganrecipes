import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 24px;
`

const Title = styled.div`
  font-size: 32px;
  margin-bottom: 40px;
`
const Description = styled.div`
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  opacity: 0.8;
`

function ConfirmEmail () {
  return (
    <Wrapper>
      <Title>Verification link sent!</Title>
      <Description>
        We just sent you a confirmation link to your email.
      </Description>
      <Description>
        Please click the link to complete your account creation.
      </Description>
    </Wrapper>
  )
}

ConfirmEmail.propTypes = {}

export default ConfirmEmail
