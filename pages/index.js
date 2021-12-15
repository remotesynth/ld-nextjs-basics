import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import fetch from "node-fetch";
import { getClient } from "../lib/ld-server";
import Nav from "../components/nav";

export default function Home({ featuredUsername, posts }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Basic Example</title>
        <meta name="description" content="Using LaunchDarkly flags" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Nav />
        <h1 className={styles.title}>
          Featured Blog Posts for: {featuredUsername}
        </h1>
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

export async function getStaticProps() {
  const client = await getClient();
  let featuredUsername = await client.variation(
    "featured-username",
    { key: "anonymous" },
    false
  );
  const response = await fetch(
    `https://dev.to/api/articles?username=${featuredUsername}&page=1&per_page=10`
  );
  const data = await response.json();
  return {
    props: {
      featuredUsername: featuredUsername,
      posts: data,
    },
  };
}
