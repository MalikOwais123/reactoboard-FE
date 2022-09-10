import React from 'react'
import dangerImg from '../../Assets/danger.png'
import collectableImg from '../../Assets/collectable.png'
import knightImg from '../../Assets/knight.png'
import './BoardCell.css'

const BoardCell = ({ item }) => {
  return (
    <>
      {item === 'D' && (
        <span className="cell">
          <img src={dangerImg} alt="danger" />
        </span>
      )}

      {item === 'P' && (
        <span className="cell">
          <img src={collectableImg} alt="collectable" />
        </span>
      )}
      {item === 'K' && (
        <span className="cell">
          <img src={knightImg} alt="knight" />
        </span>
      )}
      {item === 'S' && <span className="cell"></span>}
    </>
  )
}

export default BoardCell
