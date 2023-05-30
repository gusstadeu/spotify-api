import styles from '../styles/Header.module.css'
import spotify_logo from '../images/spotify_logo.png'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
    return(
        <div className={styles.headerContainer} >
            <div>
                <Link to="/" className={styles.button} >
                    <img src={spotify_logo} to="/" alt="Spotify"></img>
                </Link>
            </div>
        </div>
    )
}