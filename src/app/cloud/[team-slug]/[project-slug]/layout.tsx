import { DashboardTabs } from '@cloud/_components/DashboardTabs'
import { cloudSlug } from '@cloud/slug'
import { Metadata } from 'next'

import { mergeOpenGraph } from '@root/seo/mergeOpenGraph'

export default props => {
  const {
    children,
    params: { 'team-slug': teamSlug, 'project-slug': projectSlug },
  } = props

  return (
    <>
      <DashboardTabs
        tabs={{
          [`${projectSlug}`]: {
            label: 'Overview',
            href: `/${cloudSlug}/${teamSlug}/${projectSlug}`,
          },
          database: {
            label: 'Database',
            href: `/${cloudSlug}/${teamSlug}/${projectSlug}/database`,
          },
          'file-storage': {
            label: 'File Storage',
            href: `/${cloudSlug}/${teamSlug}/${projectSlug}/file-storage`,
          },
          logs: {
            label: 'Logs',
            href: `/${cloudSlug}/${teamSlug}/${projectSlug}/logs`,
          },
          settings: {
            label: 'Settings',
            href: `/${cloudSlug}/${teamSlug}/${projectSlug}/settings`,
            subpaths: [
              `/${cloudSlug}/${teamSlug}/${projectSlug}/settings/billing`,
              `/${cloudSlug}/${teamSlug}/${projectSlug}/settings/domains`,
              `/${cloudSlug}/${teamSlug}/${projectSlug}/settings/email`,
              `/${cloudSlug}/${teamSlug}/${projectSlug}/settings/environment-variables`,
              `/${cloudSlug}/${teamSlug}/${projectSlug}/settings/ownership`,
              `/${cloudSlug}/${teamSlug}/${projectSlug}/settings/plan`,
            ],
          },
        }}
      />
      {children}
    </>
  )
}

export async function generateMetadata({
  params: { 'team-slug': teamSlug, 'project-slug': projectSlug },
}): Promise<Metadata> {
  return {
    title: {
      template: `${teamSlug} / ${projectSlug} | %s`,
      default: 'Project',
    },
    openGraph: mergeOpenGraph({
      title: `${teamSlug} / ${projectSlug} | %s`,
      url: `/cloud/${teamSlug}/${projectSlug}`,
    }),
  }
}
