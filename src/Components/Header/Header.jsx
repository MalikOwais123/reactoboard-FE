import React, { useEffect, useState } from 'react'
import { getTimeFormat } from '../../utils/format'
import './Header.css'

const Header = ({ timer, playerName }) => {
  // * create a function that will accept the timer and return the time in minutes and seconds format

  return (
    <div className="header_bar">
      <div className="secondary_text">
        {playerName ? `Player: ${playerName}` : ' '}
      </div>
      <div className="secondary_text">
        <h2>{getTimeFormat(timer)}</h2>
      </div>
    </div>
  )
}

export default Header
