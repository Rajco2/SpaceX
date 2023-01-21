import React from "react";
import { Link } from 'react-router-dom'
import styles from './Header.module.css'
const Header = (props) => {
  return (
    <div className={styles.style}>
      <div className={styles.nav}>
      <Link className={styles.link}  to="/">
        Home
      </Link>
      <Link className={styles.link} to="/rockets">Rockets</Link>
      </div>
      {props.children}
    </div>
  );
};

export default Header;
