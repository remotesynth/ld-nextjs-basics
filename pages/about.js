import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getClient } from "../lib/ld-server";
import ErrorPage from "next/error";
import Nav from "../components/nav";

export default function About({ frontmatter, markdownBody, showPage }) {
  if (!showPage) return <ErrorPage statusCode="404" />;
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav />
        <h1 className={styles.title}>{frontmatter.title}</h1>
        <ReactMarkdown>{markdownBody}</ReactMarkdown>
        <p>
          <Link href="/">Home</Link>
        </p>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const client = await getClient();
  let showPage = await client.variation(
    "show-about-us",
    { key: "anonymous" },
    false
  );
  let loadPage = "";
  let frontMatter = "";
  let markdownBody = "";
  if (showPage) {
    loadPage = await client.variation(
      "new-about-us",
      { key: "anonymous" },
      false
    );
    const content = await import(`../content/${loadPage}.md`);
    const data = matter(content.default);
    frontMatter = data.data;
    markdownBody = data.content;
  }
  return {
    props: {
      frontmatter: frontMatter,
      markdownBody: markdownBody,
      showPage: showPage,
    },
  };
}
