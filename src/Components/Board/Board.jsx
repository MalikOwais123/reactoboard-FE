import React from 'react'
import './Board.css'
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import BoardCell from '../BoardCell/BoardCell'
import Header from '../Header/Header'
import Modal from './../Modal/Modal'
import GameRequestToStart from '../GameRequestToStart/GameRequestToStart'
import GameOver from '../GameOver/GameOver'
import GameFinished from './../GameFinished/GameFinished'
import { createLeaderAPI } from '../../service'

const GAME_STATE = {
  NOT_STARTED: 'NOT_STARTED',
  PLAYING: 'PLAYING',
  START_REQUEST: 'START_REQUESTED',
  OVER: 'GAME_OVER',
  FINISHED: 'GAME_FINISHED',
}
const ITEM_SCORE = 1000
const Board = () => {
  const boardRef = useRef(null)
  const [playerName, setPlayerName] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [gameState, setGameState] = useState(GAME_STATE.NOT_STARTED)
  // * K--> current position
  // * D--> dragon
  // * P--> point or price
  // * S--> space means vacant

  // * get random board values for the board cells of 20*20 grid but always keep the knight in the top left corner
  const getRandBoard = () =>
    Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => {
            const random = Math.floor(Math.random() * 4)
            if (random === 0) return 'D'
            if (random === 1) return 'P'
            if (random === 2) return 'S'
            if (random === 3) return 'S'
          }),
      )

  const [boardItems, setBoardItems] = useState(getRandBoard())
  const [score, setScore] = useState(0)

  // * set the knight in the top left corner
  useEffect(() => {
    const newBoard = [...boardItems]
    newBoard[0][0] = 'K'
    setBoardItems(newBoard)
    // !Testing api
  }, [])

  const checkIsMoveValid = (x, y, move) => {
    if (move === 'left') {
      if (y === 0) {
        return false
      }
    }
    if (move === 'right') {
      if (y === boardItems.length - 1) {
        return false
      }
    }
    if (move === 'up') {
      if (x === 0) {
        return false
      }
    }
    if (move === 'down') {
      if (x === boardItems.length - 1) {
        return false
      }
    }
    return true
  }

  const handleMoveAction = (move) => {
    let currentPosition = []
    let desPostition = []

    // ? Sample algo for moving the king to the right
    // ?  for example (a,b) is current position
    // ?    the destination position will be (a,b+1)

    // * set current position by finding the king in the board
    boardItems.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (item === 'K') {
          currentPosition = [rowIndex, colIndex]
        }
      })
    })

    // * check if move is valid by checking the boundaries of the board
    if (!checkIsMoveValid(currentPosition[0], currentPosition[1], move)) {
      return
    }

    // * set destination position based on the move
    switch (move) {
      case 'left':
        desPostition = [currentPosition[0], currentPosition[1] - 1]
        break
      case 'right':
        desPostition = [currentPosition[0], currentPosition[1] + 1]
        break
      case 'up':
        desPostition = [currentPosition[0] - 1, currentPosition[1]]
        break
      case 'down':
        desPostition = [currentPosition[0] + 1, currentPosition[1]]
        break
      default:
        break
    }

    // * check if destination position has dragon
    if (boardItems[desPostition[0]][desPostition[1]] === 'D') {
      // * if dragon is present then game is over
      onGameOver()
    } else {
      // * if dragon is not there then check if destination position has point or score
      if (boardItems[desPostition[0]][desPostition[1]] === 'P') {
        // TODO: add point to score
        setScore((prevScore) => prevScore + ITEM_SCORE)
      }
      // * make current position as space and destination position as king by moving the king
      boardItems[currentPosition[0]][currentPosition[1]] = 'S'
      boardItems[desPostition[0]][desPostition[1]] = 'K'
      setBoardItems([...boardItems])
    }
  }

  const handleUserKeyPress = (event) => {
    const { keyCode } = event

    if (keyCode === 37) {
      handleMoveAction('left')
    } else if (keyCode === 38) {
      handleMoveAction('up')
    } else if (keyCode === 39) {
      handleMoveAction('right')
    } else if (keyCode === 40) {
      handleMoveAction('down')
    }
  }

  // * check if all items are collected then show alert
  useEffect(() => {
    let isAllItemsCollected = true
    boardItems.forEach((row) => {
      row.forEach((item) => {
        if (item === 'P') {
          isAllItemsCollected = false
        }
      })
    })
    if (isAllItemsCollected) {
      // TODO: show alert
      // alert('All items collected')
      // setShowModal(true)
      onGameFinished()
    }
  }, [boardItems])

  // * create the timer for the game ,timer will start when the button is clicked and will stop when the king reaches the end of the board or strikes the dragon
  // * timer state will be hanlded in the header component
  const [timer, setTimer] = useState(0)
  const [isTimerStarted, setIsTimerStarted] = useState(false)

  useEffect(() => {
    let interval = null
    if (isTimerStarted) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1)
      }, 1000)
    } else if (!isTimerStarted && timer !== 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isTimerStarted, timer])

  // * add event listener for key press only when the board is mounted and timer is started
  useEffect(() => {
    if (isTimerStarted) {
      window.addEventListener('keydown', handleUserKeyPress)
    }
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress)
    }
  }, [isTimerStarted])

  // * start game timer
  const startTimer = () => {
    setIsTimerStarted(true)
  }

  // * reset game timer
  const resetTimer = () => {
    setTimer(0)
    setIsTimerStarted(false)
  }

  // * stop game timer
  const stopTimer = () => {
    setIsTimerStarted(false)
  }

  const requestGamePlay = () => {
    setShowModal(true)
    setGameState(GAME_STATE.START_REQUEST)
  }

  const onStartPlayingGame = (playerName) => {
    setPlayerName(playerName)
    startTimer() // * start the timer
    setShowModal(false) // * hide the modal
    setGameState(GAME_STATE.PLAYING) // * set the game state to playing
  }

  const addScoreToLeaderBoard = async () => {
    const data = {
      name: playerName,
      totalTime: timer,
      score,
    }
    try {
      const response = await createLeaderAPI(data)
      if (response.status === 201) {
        stopTimer() // * stop the timer
        setShowModal(true) // * show the modal
        setGameState(GAME_STATE.FINISHED) // * set the game state to finished
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const onGameFinished = () => {
    addScoreToLeaderBoard(playerName, score, timer)
    // stopTimer() // * stop the timer
    // setShowModal(true) // * show the modal
    // setGameState(GAME_STATE.FINISHED) // * set the game state to finished
  }

  const onGameOver = () => {
    stopTimer() // * stop the timer
    setShowModal(true) // * show the modal
    setGameState(GAME_STATE.GAME_OVER) // * set the game state to game over
  }

  // * function for creating a new board
  const onResetGame = () => {
    const newBoard = getRandBoard()
    newBoard[0][0] = 'K'
    setBoardItems(newBoard) // * set the new board
    setShowModal(false) // * hide the modal
    setScore(0) // * reset the score
    resetTimer() // * reset the timer
  }

  const onPlayAgain = () => {
    onResetGame() // * reset the game
    startTimer() // * start the timer
    setGameState(GAME_STATE.PLAYING) // * set the game state to playing
  }

  return (
    <>
      <div>
        <Header playerName={playerName} timer={timer} />
        <div className="board_container">
          {/* show the board there   */}
          <div
            ref={boardRef}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${boardItems.length},60px)`,
              gridTemplateRows: `repeat(${boardItems.length},60px)`,
              border: '1px solid #212B36',
            }}
          >
            {boardItems.map((row, i) => (
              <>
                {row.map((item, itemInd) => (
                  <BoardCell key={itemInd} item={item} />
                ))}
              </>
            ))}
          </div>
        </div>
        <div className="btn_wrapper">
          {/* Reset Board */}
          <div>
            <button className="c_button" onClick={onResetGame}>
              Reset
            </button>
          </div>
          <div>
            <button
              className={`c_button ${isTimerStarted && 'c_button_disabled'}`}
              onClick={requestGamePlay}
            >
              {isTimerStarted ? 'Game Started' : 'Start Game'}
            </button>
          </div>
        </div>
      </div>
      {/* Modal will only appear when user is not playing */}
      <Modal modal={showModal} setModal={setShowModal}>
        {gameState === GAME_STATE.START_REQUEST && (
          <GameRequestToStart onStartGame={onStartPlayingGame} />
        )}
        {gameState === GAME_STATE.GAME_OVER && (
          <GameOver onPlayAgain={onPlayAgain} />
        )}
        {gameState === GAME_STATE.FINISHED && (
          <GameFinished
            playerName={playerName}
            onPlayAgain={onPlayAgain}
            finishTime={timer}
            score={score}
          />
        )}
      </Modal>
    </>
  )
}

export default Board
