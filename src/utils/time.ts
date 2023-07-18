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
