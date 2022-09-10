import { get } from '../utils/httpService'

const SERVICE_URLS = {
  test: () => `/test`,
}
export const testAPI = () => get(SERVICE_URLS.test())
