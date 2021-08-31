export default function About({ frontmatter, markdownBody }) {
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