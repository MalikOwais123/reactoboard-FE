import { get, post } from '../utils/httpService'

const SERVICE_URLS = {
  leaderBoard: () => `/leader-board`,
}

// get leaders board
export const getLeadersBoardAPI = async () => {
  const { data, status } = await get(SERVICE_URLS.leaderBoard())
  return { data, status }
}

// create a new leader with name and score
export const createLeaderAPI = async (body) => {
  const { data, status } = await post(SERVICE_URLS.leaderBoard(), body)
  return { data, status }
}
