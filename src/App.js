import React, {
  useState
} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Box from './components/Box/Box'
import Board from './components/Board/Board'
import StartForm from './components/StartForm/StartForm'
import Info from './components/Info/Info'
import Score from './components/Score/Score'
import { Col } from 'react-bootstrap'
import Mode from './components/Mode/Mode'
import Title from './components/Title/Title'

function App() {

  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isFirstPlayerTurn, setIsFirstPlayerTurn] = useState(true);
  const [playMode, setPlayMode] = useState(0);
  const [difficultyLevel, setDifficultyLevel] = useState(0);
  const [isStartFormNeedTimeout, setIsStartFormNeedTimeout] = useState(true);

  const currentBoard = React.createRef();

  const startGame = (players) => {
    setPlayers(players);
    setGameStarted(true);
    setWinner(null);
  }

  const switchPlayer = () => {
    setIsFirstPlayerTurn(!isFirstPlayerTurn)
  }

  const setPlayModeFunc = (props) => {
    setPlayMode(props)
    setIsStartFormNeedTimeout(true);
  }

  const setDifficultyLevelFunc = (props) => {
    setDifficultyLevel(props)
  }


  const handleGameEnded = (status) => {
    switch (status) {
      case 'win':
        let winnerIndex = isFirstPlayerTurn ? 0 : 1;
        setWinner(players[winnerIndex].name);
        players[winnerIndex].score += 1
        break;

      default: // Tie
        setWinner(undefined);
        break;
    }
  }

  const playAgain = () => {
    setWinner(null);
    currentBoard.current.initBoard();
  }

  const backToMenu = () => {
    setPlayers([]);
    setGameStarted(false);
    setIsFirstPlayerTurn(true);
    playAgain();
    setIsStartFormNeedTimeout(false)
  }

  return (
    <>
      <Title />
      <Box class="flexbox-container">
        {gameStarted ? <Col><Score player={players[0]} /></Col> : null}
        <Col><Board playMode={playMode} isFirstPlayerTurn={isFirstPlayerTurn} switchPlayer={switchPlayer} gameStarted={gameStarted} winner={winner} gameEnded={handleGameEnded} ref={currentBoard} difficultyLevel={difficultyLevel} /></Col>
        {gameStarted ? <Col><Score player={players[1]} /></Col> : null}
      </Box>

      <Mode clsName={playMode !== 0 ? "moving-left-mode" : null} setPlayModeFunc={setPlayModeFunc} setDifficultyLevelFunc={setDifficultyLevelFunc} />
      {gameStarted ?
        <Info playersNames={players.map(player => player.name)} isFirstPlayerTurn={isFirstPlayerTurn} winner={winner} playAgain={playAgain} backToMenu={backToMenu} />
        : playMode === 1 ?
          <StartForm isNeedTimout={isStartFormNeedTimeout} isOnePlayer={true} setPlayModeFunc={setPlayModeFunc} handleStart={startGame} difficultyLevel={difficultyLevel} />
          : playMode === 2 ?
            <StartForm isNeedTimout={isStartFormNeedTimeout} isOnePlayer={false} setPlayModeFunc={setPlayModeFunc} handleStart={startGame} />
            : null
      }
    </>
  );
}

export default App;