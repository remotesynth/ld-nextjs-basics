import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getClient } from "../lib/ld-server";
import fetch from "node-fetch";

export default function About({ title, description }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{title}</h1>
        <p>{description}</p>
        <p>
          <Link href="/">Home</Link>
        </p>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await getClient();
  let featuredCategory = await client.variation(
    "featured-category",
    { key: "brian@launchdarkly.com" },
    false
  );

  const response = await fetch(
    `https://dev.to/api/articles?tag=${featuredCategory}&top=1&per_page=1`
  );
  const data = await response.json();
  return {
    props: {
      title: data[0].title,
      description: data[0].description,
    },
  };
}
