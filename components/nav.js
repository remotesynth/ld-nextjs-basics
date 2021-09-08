import { useFlags } from "launchdarkly-react-client-sdk";
import Link from "next/link";

export default function Nav() {
  let { showAboutUs } = useFlags();
  return (
    <div className="nav">
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/ssr">SSR</Link>
        </li>
        {showAboutUs && (
          <li className="about">
            <Link href="/about">About Us</Link>
          </li>
        )}
      </ul>
    </div>
  );
}
