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
      <h1 style="font-size: 300%;">subscribed!</h1>
      <div style="
        margin-top: 3%;
        color: rgba(0,0,0,0.5);">
        공지나 새로운 글이 작성될 때마다 알림이 갑니다.<br />
        가장 먼저 새로운 글을 확인하세요.
      </div>
      <div style="
        font-size: 70%;
        margin-top: 2%;
        color: rgba(0,0,0,0.75);">
        본인의 활동이 아닌경우 <a href="${link}">해당 사이트</a>의 구독취소를 이용해주세요
      </div>
    </div>
  `
}