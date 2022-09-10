import React from 'react'
import './GameOver.css'

const GameOver = ({ onPlayAgain }) => {
  const onSubmit = () => {
    onPlayAgain()
  }
  return (
    <div className="game_over_container">
      {/* dragon caught you */}
      <p>Game Over 🙁</p>

      {/* you caught the dragon */}
      <div className="secondary_text subHeading">
        Its look like you have been caught by the dragon
        <br />
        but don't worry you can try again 😍
      </div>
      <div>
        <button className="c_button" onClick={onSubmit}>
          Play Again
        </button>
      </div>
    </div>
  )
}

export default GameOver
