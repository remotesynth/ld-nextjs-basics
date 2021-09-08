import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getClient } from "../../lib/ld-server";
import fetch from "node-fetch";
import Nav from "../../components/nav";
import ReactMarkdown from "react-markdown";

export default function About({ post }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav />
        <h1 className={styles.title}>{post.title}</h1>
        <ReactMarkdown>{post.body_markdown}</ReactMarkdown>
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const client = await getClient();
  let username = await client.variation(
    "featured-username",
    { key: "brian@launchdarkly.com" },
    false
  );

  // only grab the first 5 to prerender
  const top = 5;
  const response = await fetch(
    `https://dev.to/api/articles?username=${username}&page=1&per_page=${top}`
  );
  const data = await response.json();

  const paths = data.map((post) => {
    let username = post.organization
      ? post.organization.username
      : post.user.username;
    let slug = `/dpr/${username}/${post.slug}`;
    return slug;
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ ...ctx }) {
  let fullSlug = ctx.params.slug.join("/");
  const response = await fetch(`https://dev.to/api/articles/${fullSlug}`);
  const data = await response.json();
  return {
    props: {
      post: data,
    },
  };
}
