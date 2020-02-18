export default (req, fileName: string) => {
  const { host } = req.headers;
  return `http://${host}/static/${fileName}`;
}