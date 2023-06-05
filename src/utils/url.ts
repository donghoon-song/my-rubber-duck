export const getURL = () => {
  let url = import.meta.env.VITE_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  console.info('getURL', url)
  console.info('env : ', import.meta.env.VITE_PUBLIC_SITE_URL)
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  return url
}
