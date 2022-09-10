import React from 'react'
import './GameFinished.css'
import { getTimeFormat } from './../../utils/format'
import { useNavigate } from 'react-router-dom'

const GameFinished = ({ onPlayAgain, finishTime, score, playerName }) => {
  const navigateTo = useNavigate()
  const onSubmit = () => {
    onPlayAgain()
  }
  return (
    <div className="game_finish_wrapper">
      <p>Game Finished 👏</p>
      <h5 className="secondary_text">Congragulation's {playerName}</h5>
      <div className="secondary_text">
        You have finished the game and collected {score} coins in{' '}
        {getTimeFormat(finishTime)}
      </div>
      <div>
        <button
          className="c_button"
          onClick={() => {
            navigateTo('/leader-board')
          }}
        >
          Leader Board
        </button>
      </div>
    </div>
  )
}

export default GameFinished
