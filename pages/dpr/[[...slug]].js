import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getClient } from "../../lib/ld-server";
import fetch from "node-fetch";

export default function About({ title, description, message }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>{message}</h1>
        <h2 className={styles.title}>{title}</h2>
        <p>{description}</p>
        <p>
          <Link href="/">Home</Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const username = "remotesynth";

  // only grab the first 10 to prerender
  const top = 5;
  const response = await fetch(
    `https://dev.to/api/articles?username=${username}&page=1&per_page=${top}`
  );
  const data = await response.json();

  const paths = data.map((post) => {
    console.log(post.username);
    let username = post.organization
      ? post.organization.username
      : post.user.username;
    let slug = `/dpr/${username}/${post.slug}`;
    return slug;
  });

  console.log(paths);

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ ...ctx }) {
  const client = await getClient();
  let message = await client.variation(
    "dpr-message",
    { key: "brian@launchdarkly.com" },
    false
  );
  let fullSlug = ctx.params.slug.join("/");
  const response = await fetch(`https://dev.to/api/articles/${fullSlug}`);
  const data = await response.json();
  return {
    props: {
      title: data.title,
      description: data.description,
      message: message,
    },
  };
}
