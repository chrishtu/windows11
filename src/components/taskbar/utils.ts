export function formatAMPM(date: Date, showSecond = false) {
  let hours = date.getHours()
  let minutes: number | string = date.getMinutes()
  let seconds: number | string = date.getSeconds()
  let ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds
  let strTime = hours + ':' + minutes + (showSecond ? ':' + seconds : '') + ' ' + ampm
  return strTime
}
