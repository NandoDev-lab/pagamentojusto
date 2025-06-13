import Link from "next/link";
import styles from '../../styles/Navbar.module.css';
export default function Navbar() {
  return (
    <>    
    <nav className={styles.nav}>
      <div><img src="" alt="logo" srcSet="logo" /></div>
      <ul>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/calculadoras">Calculadoras</Link></li>
        <li><Link href="/noticias">Notícias</Link></li>
        <li><Link href="/sindicatos">Sindicatos e Convenções</Link></li>
        <li><Link href="/apoie">Apoie</Link></li>
      </ul>
    </nav>
    </>
  );
}