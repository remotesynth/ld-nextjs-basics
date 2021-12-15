import styles from "../styles/Home.module.css";
import Head from "next/head";
import Link from "next/link";
import { getClient } from "../lib/ld-server";
import fetch from "node-fetch";
import Nav from "../components/nav";

export default function About({ featuredCategory, posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav />
        <h1 className={styles.title}>Posts for: {featuredCategory}</h1>
        <ul>
          {posts.map((post, index) => {
            let username = post.organization
              ? post.organization.username
              : post.user.username;
            let slug = `/dpr/${username}/${post.slug}`;
            return (
              <li key={index}>
                <Link href={slug}>
                  <a>
                    <strong>{post.title}</strong>
                  </a>
                </Link>
                <p>{post.description}</p>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const client = await getClient();
  let featuredCategory = await client.variation(
    "featured-category",
    { key: "anonymous" },
    false
  );

  const response = await fetch(
    `https://dev.to/api/articles?tag=${featuredCategory}&page=1&per_page=5`
  );
  const data = await response.json();
  return {
    props: {
      featuredCategory: featuredCategory,
      posts: data,
    },
  };
}
