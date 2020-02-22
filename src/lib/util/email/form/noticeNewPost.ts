export default (postTitle: string) => {
  return `
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:900&display=swap" rel="stylesheet">
    <div style="
      text-align: center;
      color: rgba(0,0,0,0.75);
      border: #e2e2e2 solid 1.5px;
      border-radius: 5px;
      padding-bottom: 2%;
      margin: 0 auto;
      font-family: 'Noto Sans KR';
      font-weight: 200;">
      <h1 style="font-size: 300%;">New Post!</h1>
      <h2><a href="http://www.naver.com" style="
        text-decoration: none;
        color: rgba(0,0,255,0.75);">&lt; ${postTitle} &gt;</a></h2>
      <div style="
        margin-top: 3%;
        color: rgba(0,0,0,0.5);">
        새로운 글이 올라왔어요<br>
        위의 링크를 통해서 접속하여 확인해보세요
      </div>
      <div style="
        font-size: 70%;
        margin-top: 2%;
        color: rgba(0,0,0,0.75);">
        본인의 활동이 아닌경우 해당 사이트의 구독취소를 이용해주세요
      </div>
    </div>
  `
}