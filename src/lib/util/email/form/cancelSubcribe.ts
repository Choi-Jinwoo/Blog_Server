import { link } from './site.json';

export default () => {
  return `
    <link href="https://fonts.googleapis.com/css?family=noto+sans+kr:900&display=swap" rel="stylesheet">
    <div style="
      text-align: center;
      color: rgba(0,0,0,0.75);
      border: #e2e2e2 solid 1.5px;
      border-radius: 5px;
      padding-bottom: 2%;
      margin: 0 auto;
      font-family: 'noto sans kr';
      font-weight: 500;">
      <h1 style="font-size: 300%;">canceled subscription</h1>
      <div style="
        margin-top: 3%;
        color: rgba(0,0,0,0.5);">
        더이상 공지나 새로운 글이 작성될 때마다 알림이 가지 않습니다.<br />
        불편한점이 있었다면 jinwoo.blog@gmail.com 으로 메일을 보내주세요.
      </div>
      <div style="
        font-size: 70%;
        margin-top: 2%;
        color: rgba(0,0,0,0.75);">
        본인의 활동이 아닌경우 <a href="${link}>해당 사이트</a>의 구독을 이용해주세요
      </div>
    </div>
  `
}