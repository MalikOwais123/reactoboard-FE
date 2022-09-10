import React from 'react'
import { getTimeFormat } from '../../utils/format'
import './LeaderTile.css'

const LeaderTile = ({ leader, ind }) => {
  const { name, score, totalTime } = leader
  return (
    <div className="leader_tile">
      <div className="secondary_text">
        {ind + 1} &nbsp;
        <span className="primary_text">{name}</span>
        {ind === 0 && <span className="gold">🥇</span>}
        {ind === 1 && <span className="silver">🥈</span>}
        {ind === 2 && <span className="bronze">🥉</span>}
      </div>
      <div>
        <div className="secondary_text">{score}</div>
        <div className="secondary_text">{getTimeFormat(totalTime)}</div>
      </div>
    </div>
  )
}

export default LeaderTile
