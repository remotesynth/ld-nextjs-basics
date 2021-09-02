import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getClient } from "../lib/ld-server";
import { useFlags } from "launchdarkly-react-client-sdk";

export default function Home({ message }) {
  let { showAboutUs } = useFlags();
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{message}</h1>
        {showAboutUs ? (
          <p>
            <Link href="/about">About Us</Link>
          </p>
        ) : (
          <p>
            <em>About Us link is off</em>
          </p>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = await getClient();
  let message = "Nothing returned";
  let showFeature = await client.variation(
    "test-flag",
    { key: "brian@launchdarkly.com" },
    false
  );
  if (showFeature) {
    message = "The flag is on";
  } else {
    message = "The flag is off";
  }
  return {
    props: {
      message,
    },
  };
}
