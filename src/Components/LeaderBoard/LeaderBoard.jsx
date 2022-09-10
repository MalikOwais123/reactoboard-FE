import React, { useEffect, useState } from 'react'
import { getLeadersBoardAPI } from '../../service'
import LeaderTile from '../LeaderTile/LeaderTile'
import { useNavigate } from 'react-router-dom'
import './LeaderBoard.css'

const LeaderBoard = () => {
  const [leaderBoard, setLeaderBoard] = useState([])
  const navigate = useNavigate()

  const getLeadersBoard = async () => {
    try {
      const { data, status } = await getLeadersBoardAPI()
      if (status === 200) {
        setLeaderBoard(data)
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  // * fetch leaders when mount
  useEffect(() => {
    getLeadersBoard()
  }, [])

  return (
    <div className="leader_board_container">
      <div className="leader_box">
        <div className="center">
          <p>Leader Board 😎</p>
        </div>
        <div className="content_col">
          <div className="secondary_text">Player Name</div>
          <div>
            <div className="secondary_text">Score</div>
            <div className="secondary_text">Time</div>
          </div>
        </div>
        <div className="leader_list">
          {leaderBoard.map((leader, index) => (
            <LeaderTile key={index} ind={index} leader={leader} />
          ))}
        </div>
      </div>
      <div className="btn_wrapper">
        <button
          className="c_button"
          onClick={() => {
            navigate('/')
          }}
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default LeaderBoard
