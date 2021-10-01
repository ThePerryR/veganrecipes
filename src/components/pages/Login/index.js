import React, { useState } from 'react'
import styled from 'styled-components'

import { useRootStore } from '../../RootStoreProvider'
import Button from '../../elements/Button'
import ErrorMessage from '../../elements/ErrorMessage'

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

function Login () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState()
  const [submitting, setSubmitting] = useState()
  const store = useRootStore()

  async function submit () {
    setError('')
    if (!email) return setError(<span>Please enter your <b>email address</b>.</span>)
    if (!password) return setError(<span>Please enter your <b>password</b>.</span>)
    try {
      setSubmitting(true)
      const { success } = await store.transportLayer.login(email, password)
      if (success) {
        window.location.reload()
      }
    } catch (err) {
      setSubmitting(false)
      const error = await err
      if (error.err && error.err.email) setError(error.err.email)
      if (error.err && error.err.password) setError(error.err.password)
      if (error.err && error.err.validation) setError('Please verify your email by clicking the link in our welcome email.')
      if (error.authError) setError('Email or password do not match.')
    }
  }

  return (
    <Wrapper>
      <h4 style={{ marginBottom: 40 }}>Welcome Back</h4>
      <Form>
        <FormSection>
          <label>Email Address</label>
          <input
            name="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={e => setEmail(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && submit()}
          />
        </FormSection>
        <FormSection style={{ marginBottom: 24 }}>
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && submit()}
          />
        </FormSection>

      </Form>
      <Button
        label={submitting ? 'One moment...' : 'Login'}
        onClick={submit}
        disabled={submitting}
        style={{ marginBottom: 32 }}
      />

      {error &&
      <ErrorMessage style={{ marginBottom: -64 }}>{error}</ErrorMessage>
      }
    </Wrapper>
  )
}

export default Login
