export default (code) => {
  return `
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:900&display=swap" rel="stylesheet">
    <div style="
      text-align: center;
      color: rgba(0,0,0,0.75);
      padding-bottom: 2%;
      margin: 0 auto;
      font-family: 'Noto Sans KR';
      font-weight: 200;">
      <h2 style="font-size: 300%;">인증번호를 확인하세요</h2>
      <div style="
        border: solid 3px #000000;
        padding: 2%;
        width: 30%;
        margin: 0 auto;
        font-size: 2rem;
        color: rgba(0,0,0);">
        ${code}
      </div>
      <div style="
        font-size: 70%;
        margin-top: 2%;
        font-weight: bold;
        color: rgba(0,0,0,0.75);">
        본인의 활동이 아닌경우 해당 이메일을 무시해주세요
      </div>
    </div>
  `
}