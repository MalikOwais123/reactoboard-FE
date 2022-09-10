import { Route, Routes } from 'react-router'
import Board from './../Components/Board/Board'
import LeaderBoard from '../Components/LeaderBoard/LeaderBoard'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="leader-board" element={<LeaderBoard />} />
    </Routes>
  )
}

export default AppRoutes
