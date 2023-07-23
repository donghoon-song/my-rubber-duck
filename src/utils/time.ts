import dayjs from 'dayjs'

export function convertTimeMMSS(seconds: number) {
  if (!seconds) {
    return null
  }
  return new Date(seconds * 1000).toISOString().substr(14, 5)
}

export function durationToSeconds(duration: string) {
  const [minutes, seconds] = duration.split(':').map(Number)
  const totalSeconds = minutes * 60 + seconds
  return totalSeconds
}

export const formatTime = (time: string, format: string) => dayjs(time).format(format)

export const secondsToTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const leftSeconds = seconds % 60
  return { minutes, seconds: leftSeconds }
}
