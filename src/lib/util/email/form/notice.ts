import { link } from './site.json';

export default (noticeTitle: string, noticeContent: string) => {
  return `
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:900&display=swap" rel="stylesheet">
    <div style="
      text-align: center;
      color: rgba(0,0,0,0.75);
      padding-bottom: 2%;
      margin: 0 auto;
      font-family: 'Noto Sans KR';
      font-weight: 200;">
      <h1 style="font-size: 300%;">Notice</h1>
      <h2><a href="${link}" style="
        text-decoration: none;
        color: #597cff;"${noticeTitle}</a></h2>
      <div style="
        margin-top: 3%;
        font-weight:bold; 
        color: #000000;">
        ${noticeContent}
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