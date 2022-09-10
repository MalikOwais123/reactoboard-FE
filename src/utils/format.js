export const getTimeFormat = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  // * if seconds is less than 10 then add 0 before the seconds
  // * if minutes is less than 10 then add 0 before the minutes
  return `${minutes < 10 ? '0' + minutes : minutes}:${
    seconds < 10 ? '0' + seconds : seconds
  }`
}
