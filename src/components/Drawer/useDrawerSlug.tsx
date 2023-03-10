import { useId } from 'react'

import { formatDrawerSlug } from '.'

export const useDrawerSlug = (slug: string): string => {
  const uuid = useId()
  return formatDrawerSlug({
    slug: `${slug}-${uuid}`,
  })
}
