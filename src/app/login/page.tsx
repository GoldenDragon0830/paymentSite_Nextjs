'use client'

import { Button } from '@components/Button'
import { Gutter } from '@components/Gutter'
import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import Submit from '@forms/Submit'
import { Data } from '@forms/types'
import { useAuth } from '@root/providers/Auth'
import Link from 'next/link'
import React, { useCallback, useEffect } from 'react'
import { getImplicitPreference } from '@root/providers/Theme/shared'
import { useHeaderTheme } from '@root/providers/HeaderTheme'

import classes from './index.module.scss'

const Login: React.FC = () => {
  const { user, logout, login } = useAuth()
  const { setHeaderColor } = useHeaderTheme()

  useEffect(() => {
    const implicitPreference = getImplicitPreference()
    setHeaderColor(implicitPreference ?? 'light')
  }, [])

  const handleSubmit = useCallback(
    async (data: Data) => {
      await login({
        email: data.email as string,
        password: data.password as string,
      })
    },
    [login],
  )

  if (user) {
    return (
      <Gutter>
        <h1>You are already logged in.</h1>
        <Button label="Log out" onClick={logout} appearance="primary" />
      </Gutter>
    )
  }

  return (
    <Gutter>
      <h1>Log in</h1>
      <div className={classes.leader}>
        {`Don't have an account? `}
        <Link href="/create-account">Register for free</Link>
        {'.'}
      </div>
      <Form onSubmit={handleSubmit} className={classes.form}>
        <Text path="email" label="Email" required />
        <Text path="password" label="Password" type="password" required />
        <Submit label="Log in" className={classes.submit} />
      </Form>
      <Link href="/recover-password">Forgot your password?</Link>
    </Gutter>
  )
}

export default Login
