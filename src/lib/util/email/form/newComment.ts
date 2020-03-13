import { link } from './site.json';

export default (title, idx) => {
  return `
    <link href="https://fonts.googleapis.com/css?family=Noto+Sans+KR:900&display=swap" rel="stylesheet">
    <div class="body">
      <h3>새로운 댓글이 달렸어요</h3>
      <p>
        아래 링크를 클릭하면 해당 글로 바로 이동가능합니다.
      </p>
      <h1>
        <a href="${link}/${idx}">
          ${title}
        </a>
      </h1>

      <p>본인의 활동이 아니라면 해당 이메일의 답신으로 문의를 주세요</p>
    </div>

    <style>
      .body {
        font-family: 'Noto Sans KR';
        width: 100%;
        text-align: center;
      }

      p {
        font-size: 0.75rem;
        font-weight: lighter;
      }
    </style> 
  `
}