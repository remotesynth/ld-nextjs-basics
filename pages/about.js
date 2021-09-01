import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { getClient } from "../lib/ld-server";

export default function About({ frontmatter, markdownBody }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <ReactMarkdown>{markdownBody}</ReactMarkdown>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = await getClient();
  let loadPage = await client.variation(
    "new-about-us",
    { key: "brian@launchdarkly.com" },
    false
  );
  const content = await import(`../content/${loadPage}.md`);
  const data = matter(content.default);
  return {
    props: {
      frontmatter: data.data,
      markdownBody: data.content,
    },
  };
}
