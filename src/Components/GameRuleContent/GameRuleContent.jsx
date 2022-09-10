import React from 'react'
import './GameRuleContent.css'

const GameRuleContent = ({ onPlayAgain }) => {
  return (
    <div className="game_over_container">
      <p>Game Rule's</p>

      {/* game rules */}
      <div className="secondary_text">
        <ul>
          <li>
            <span className="subHeading">1. </span> Brave Knight is standing on
            first block
          </li>
          <li>
            <span className="subHeading">2. </span> Use your arrow keys to move
            the knight
          </li>
          <li>
            <span className="subHeading">3. </span> You have to collect all the
            coins but be careful from dragon's
          </li>
          <li>
            <span className="subHeading">4. </span> Dragon's are your enemies
          </li>
          <li>
            <span className="subHeading">5. </span> Game will be over if you
            touch the dragon
          </li>
          <li>
            <span className="subHeading">6. </span>Collect all the items in the
            shortest time
          </li>
        </ul>
      </div>

      {/* <div>
        <button className="c_button" onClick={onSubmit}>
          Play Again
        </button>
      </div> */}
    </div>
  )
}

export default GameRuleContent
