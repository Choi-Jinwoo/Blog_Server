const AUTH_CODE_LENGTH = 6;

export default () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < AUTH_CODE_LENGTH; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result
}