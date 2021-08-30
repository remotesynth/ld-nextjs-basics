import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LaunchDarkly from 'launchdarkly-node-server-sdk'

console.log(process.env.LAUNCHDARKLY_SDK)

const client = LaunchDarkly.init(process.env.LAUNCHDARKLY_SDK)

export default function Home({message}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {message}
        </h1>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  let message = "Nothing returned"
  await client.waitForInitialization();
  let showFeature = await client.variation("test-flag", {"key":"brian@launchdarkly.com"}, false)
  if (showFeature) {
  message = "The flag is on"
  } else {
    message = "The flag is off"
  }
  return {
    props: {
      message
    },
  }
}