export default (req, fileName: string) => {
  return process.env.NODE_ENV === 'production' ?
    `http://api.wlswoo.com/public/${fileName}`
    : `http://localhost:${process.env.NODE_ENV || 8080}/public/${fileName}`
}