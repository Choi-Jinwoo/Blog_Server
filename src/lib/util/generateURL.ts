import 'dotenv/config';

export default (req, fileName: string) => {
  if (process.env.ENV === 'DEV')
    return `http://localhost:8080/public/${fileName}`;

  return `https://api.wlswoo.com/public/${fileName}`;
}