import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";

const links = [
  { href: "/", label: "Início" },
  { href: "/calculadoras", label: "Calculadoras" },
  { href: "/noticias", label: "Notícias" },
  { href: "/sindicatos", label: "Sindicatos" },
  { href: "/apoie", label: "Apoie" },
];

export default function Navbar() {
  const { asPath } = useRouter();
  const currentPath = asPath.split("?")[0].replace(/\/$/, "") || "/";

  return (
    <header className={styles.nav}>
      <nav className={styles.navInner} aria-label="Navegação principal">
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark} aria-hidden="true">pj</span>
          <span>Pagamento Justo</span>
        </Link>
        <ul className={styles.links}>
          {links.map(({ href, label }) => {
            const active = currentPath === href;
            return (
              <li key={href}>
                <Link
                  className={`${styles.link} ${active ? styles.linkActive : ""}`}
                  href={href}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
