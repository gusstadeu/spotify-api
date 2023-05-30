import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Home.module.css'

const Home = () =>{
  return (
      <div className={styles.bg}>
        <ul>
            <Link to="/spotify">
              <button className={styles.botao} type="button">
                Iniciar
              </button>
              </Link>
        </ul>
    </div>
  );
}

export default Home;