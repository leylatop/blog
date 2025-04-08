import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@site/src/theme/MyLayout'
import Hero from '../components/landing/Hero'

export default function Home() {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext()
  const { description } = customFields as { description: string }
  return (
    <Layout title={tagline} description={description}>
      <main>
        <Hero />
      </main>
    </Layout>
  )
}
