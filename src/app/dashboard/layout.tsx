'use client'

import * as React from 'react'

import { HeaderObserver } from '@components/HeaderObserver'
import { useTheme } from '@providers/Theme'
import { useAuthRedirect } from '@root/utilities/use-auth-redirect'

const AllProjectsLayout = ({ children }) => {
  const theme = useTheme()

  useAuthRedirect()

  return (
    <HeaderObserver color={theme} pullUp>
      {children}
    </HeaderObserver>
  )
}

export default AllProjectsLayout
