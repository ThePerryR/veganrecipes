import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import validator from 'email-validator'

import { useRootStore } from '../../RootStoreProvider'
import Button from '../../elements/Button'
import ErrorMessage from '../../elements/ErrorMessage'
import { useHistory } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Form = styled.div`
  width: 100%;
  max-width: 378px;
`

const FormSection = styled.div`
  width: 100%;
  margin-bottom: 24px;

  label {
    margin-bottom: 4px;
  }
`

function Register () {
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [submitting, setSubmitting] = useState()
  const displayNameInput = useRef(null)
  const store = useRootStore()
  const history = useHistory()

  useEffect(() => {
    displayNameInput.current.focus()
  }, [])

  async function submit () {
    setError()
    if (!displayName) return setError(<span>Please enter a <b>display name</b>.</span>)
    if (!email || !validator.validate(email)) return setError(<span>Please enter a valid <b>email address</b>.</span>)
    if (password.length < 6) return setError(<span>Your <b>password</b> must be at least 6 characters.</span>)
    setSubmitting(true)
    try {
      const { success } = await store.transportLayer.register(email, password, displayName)
      if (success) {
        history.push('/register/confirm')
        setSubmitting(false)
      }
    } catch (err) {
      setSubmitting(false)
      const error = await err
      if (error.err && error.err.email) { setError(error.err.email) }
    }
  }

  return (
    <Wrapper>
      <h4 style={{ marginBottom: 40 }}>Sign up</h4>
      <Form>
        <FormSection>
          <label>Display Name</label>
          <input
            ref={displayNameInput}
            value={displayName}
            placeholder="What to put on your recipes"
            onChange={e => setDisplayName(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && submit()}
          />
        </FormSection>
        <FormSection>
          <label>Email Address</label>
          <input
            value={email}
            placeholder="example@gmail.com"
            onChange={e => setEmail(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && submit()}
          />
        </FormSection>
        <FormSection style={{ marginBottom: 24 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && submit()}
          />
        </FormSection>

      </Form>
      <Button
        label={submitting ? 'One moment...' : 'Get started now'}
        disabled={submitting}
        onClick={submit}
        style={{ marginBottom: 32 }}
      />

      {error &&
      <ErrorMessage style={{ marginBottom: -64 }}>{error}</ErrorMessage>
      }
    </Wrapper>
  )
}

export default Register
