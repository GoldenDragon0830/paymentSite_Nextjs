'use client'

import React, { useCallback, useEffect } from 'react'
import { Cell, Grid } from '@faceless-ui/css-grid'
import { Text } from '@forms/fields/Text'
import Form from '@forms/Form'
import Submit from '@forms/Submit'
import { redirect, useSearchParams } from 'next/navigation'

import { Gutter } from '@components/Gutter'
import { Heading } from '@components/Heading'
import { useAuth } from '@root/providers/Auth'
import { useHeaderTheme } from '@root/providers/HeaderTheme'
import { getImplicitPreference } from '@root/providers/Theme/shared'

import classes from './index.module.scss'

const ResetPassword: React.FC = () => {
  const searchParams = useSearchParams()

  const token = searchParams?.get('token')

  const { user, resetPassword } = useAuth()
  const { setHeaderColor } = useHeaderTheme()
  const [error, setError] = React.useState<string | null>(null)

  useEffect(() => {
    const implicitPreference = getImplicitPreference()
    setHeaderColor(implicitPreference ?? 'light')
  }, [setHeaderColor])

  const handleSubmit = useCallback(
    async ({ data }) => {
      try {
        await resetPassword({
          password: data.password as string,
          passwordConfirm: data.passwordConfirm as string,
          token: token as string,
        })
      } catch (e: any) {
        setError(e.message)
      }
    },
    [resetPassword, token],
  )

  if (user) {
    redirect(
      `/cloud/settings?success=${encodeURIComponent(
        `Your password has been reset. You may now log in.`,
      )}`,
    )
  }

  return (
    <Gutter>
      <Heading marginTop={false} element="h1">
        Reset password
      </Heading>
      <Grid>
        <Cell cols={5} colsM={8}>
          <Form
            onSubmit={handleSubmit}
            className={classes.form}
            initialState={{
              password: {
                value: '',
              },
              passwordConfirm: {
                value: '',
              },
              token: {
                value: '',
              },
            }}
          >
            {error && <div className={classes.error}>{error}</div>}
            <Text path="password" type="password" label="New Password" required />
            <Text path="passwordConfirm" type="password" label="Confirm Password" required />
            <div>
              <Submit label="Reset Password" className={classes.submit} />
            </div>
          </Form>
        </Cell>
      </Grid>
    </Gutter>
  )
}

export default ResetPassword
