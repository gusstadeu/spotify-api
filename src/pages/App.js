import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import styles from "../styles/Spotify.module.css";
import { FiSearch } from 'react-icons/fi';


const CLIENT_ID = '9d1a189307f24dedaeffe23b35257742';
const CLIENT_SECRET = '57208f8db8724ba182ff6ef0f8c342d4';

function App() {
  const [ searchInput, setSearchInput] = useState("");
  const [ accessToken, setAccessToken] = useState("");
  const [ tracks, setTracks] = useState([]);
  const [ artists, setArtist] = useState([]);
  const [ searchStatus, setSearchStatus] = useState(false);
  let classSearchStatus = searchStatus ? '' : styles.container
  let textHidden = searchStatus ? "Populares" : ""


  useEffect(() => {
    //autenticacao com token para acessar api

    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET 
    }
    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token))
  }, [])

//busca
async function search(){
  setTracks([])

  var searchParameters = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + accessToken
    }
  }
  var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
  .then(response => response.json())
  .then(data => { return data.artists.items[0].id})

  var artist = await fetch('https://api.spotify.com/v1/artists?ids=' + artistID, searchParameters)
    .then(response => response.json())
    .then(data => {
      setArtist(data.artists);
    });
    // console.log(artists);

  var topTracks = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/top-tracks?country=BR', searchParameters)
    .then(response => response.json())
    .then(data => {
      setTracks(data.tracks);
    });
    // console.log(tracks)   
}

//funcao para alterar classe apos a pesquisa
function searchClasses(){
  if(searchStatus === false && searchInput !== ''){
    setSearchStatus(searchStatus => !searchStatus);
  }
  search();
}

function leftPad(value, totalWidth, paddingChar) {
  var length = totalWidth - value.toString().length + 1;
  return Array(length).join(paddingChar || '0') + value;
};

//funcao para verificar se a url da track existe
function trackUrlCheck(trackUrl){
  if(trackUrl !== null){
    return(
      <audio controls controlslist="nodownload noplaybackrate" className={styles.audioClass}>
        <source src={trackUrl} type="audio/mpeg"></source>
      </audio>
    )
  } else {
    return(
        <h3 className={styles.h1Preview}>Sem preview</h3>
    )
  }
}
//retornar os dados para o usuario
  return (
    <div className="App"> 
    {/* input para buscar o artista */}
    <Container className={classSearchStatus}>
      <Container className={styles.inputContainer}>
        <InputGroup className={styles.input} size="lg">
          <FormControl className={styles.inputContent}
            placeholder="Busque o artista"
            type="input"
            onKeyPress={event => {
              if(event.key === "Enter"){
                searchClasses();
              }
            }}
            onChange= {event => setSearchInput(event.target.value)}
            />
            <Button onClick={searchClasses}>
              <FiSearch color="white" />
            </Button>
        </InputGroup>
      </Container>
      {/* container para mostrar o artista */}
      <Container className={styles.artistContainer}>
        {
          artists.map((artist, i) => {
            return (
              <Card key={i} className={`${styles.background} ${styles.cardArtistContainer}`}>
                <Card.Img className={styles.cardArtistImage}
                  src={artist.images[0].url}
                />
                <div className={styles.descriptionContent}>
                  <Card.Title className={styles.cardArtistTitle}>
                    {artist.name}
                  </Card.Title>
                  <Card.Title className={styles.cardArtistDescri}>
                    {(artist.followers.total).toLocaleString('pt-BR')}
                    <p>Seguidores</p>
                  </Card.Title>
                  <Card.Body className={styles.cardArtistLink}>
                    <a href={'https://open.spotify.com/artist/' + artist.id} target="_noblank">Ver no Spotify</a>
                  </Card.Body>
                </div>
              </Card>
            )
          })
        }
      </Container>
      {/* container para mostrar as musicas */}
      <Container className="mb-3">
        <Row className="mx cols-4">
            <h1 className={styles.titleList}>{textHidden}</h1>
            {tracks.map((track, i) => {
              return (
                <Card key={i} className={`${styles.background} ${styles.cardContainer}`}>
                    <Card.Body className={styles.cardContent}>
                      <div>
                        <Card.Title className={styles.cardTop10}>
                          {leftPad((i + 1), 2)}
                        </Card.Title> 
                        <Card.Title className={styles.cardTitle}>
                          {track.name}
                        </Card.Title>                         
                      </div>
                     {trackUrlCheck(track.preview_url)}
                    </Card.Body>
                    <Card.Body className={`m-1 ${styles.cardContentLink}`}>
                      <a href={track.external_urls.spotify} className={styles.cardLink} target="_noblank">Ouvir no Spotify</a>
                    </Card.Body>
                </Card>
              )
            })}
        </Row>
        </Container>
      </Container>
    </div>
  );
}

export default App;