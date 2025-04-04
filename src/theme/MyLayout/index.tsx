import { PageMetadata } from '@docusaurus/theme-common'
import { cn } from '@site/src/lib/utils'
import type { Props } from '@theme/Layout'
import Layout from '@theme/Layout'

export default function MyLayout({ children, maxWidth, ...layoutProps }: Props & { maxWidth?: number }): JSX.Element {
  return (
    <Layout {...layoutProps}>
      <PageMetadata title={layoutProps.title} description={layoutProps.description} />

      <div className="bg-background">
        <div
          className={cn('mx-auto my-10 lg:my-20 px-4')}
          style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}
        >
          <main>{children}</main>
        </div>
      </div>
    </Layout>
  )
}
