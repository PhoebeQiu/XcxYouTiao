function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

// 得到时分秒, 21:23:55
export function formatTime (date) {
  // const year = date.getFullYear()
  // const month = date.getMonth() + 1
  // const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  // return `${t1} ${t2}`
  return `${t2}`
}

// 得到时间，2018.09.03
function getTimeValue (time) {
  const date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return `${y}.${m}.${d}`
}

// 得到时间，2018-09-03
function getTime (time) {
  const date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return `${y}-${m}-${d}`
}

// 2018 9 3 转换为 2018.09.03
function ymdGetTime (y, m, d) {
  m = m < 10 ? ('0' + m) : m
  d = d < 10 ? ('0' + d) : d
  return `${y}.${m}.${d}`
}

// 得到该月份第一天， 2019-03-01
function getFirstTime (time) {
  const date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = '01'
  return `${y}-${m}-${d}`
}

// 得到该月份最后一天， 2019-03-31
function getLastTime (time) {
  const date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = new Date(y, m, 0).getDate()
  return `${y}-${m}-${d}`
}

// 时间 转换为 时间戳
function turnTimeStamp (time) {
  // 得到时间，2018-09-03
  const date = new Date(time.replace(/-/g, '/')).getTime()
  return date
}

// 时间戳 转换为 时间
function turnTime (timestamp) {
  // 如果date为13位不需要乘1000
  // var date = new Date(date*1000)
  const n = timestamp
  const date = new Date(n)
  let Y = date.getFullYear() + '/'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/'
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + ' ' + h + m + s
}

export default {
  formatNumber,
  formatTime,
  getTime,
  getTimeValue,
  turnTime,
  turnTimeStamp,
  ymdGetTime,
  getFirstTime,
  getLastTime
}
