import { getData, postGuestbook } from './api.js';

const modal = document.querySelector("#modal");
const addBtn = document.querySelector("#open-add-btn");
const closeBtn = document.querySelector("#close-add-btn");

const nameInput = document.getElementById('name');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit');
const guestbookList = document.getElementById('guestbook-list');

const now = new Date();
const nowClock = now.toLocaleString();

// 방명록 모달창 (열기/닫기)
addBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

// 방명록 등록하기
submitBtn.addEventListener('click', async () => { //비동기 함수로 바꿔줘야함!
  
  const name = nameInput.value.trim();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const password = passwordInput.value.trim();

  if (!name || !content || !password) { //입력 하나라도 비워져있으면 경고창 출력
    alert("모든 항목을 입력해주세요!");
    return; 
  }

  //백이 요청한 형식으로 데이터 보내기
  const postData = {
    title,
    writer: name,
    content,
    password
  };

  const requestData = await postGuestbook(postData);

  // 방명록 항목 생성
  const newGuestBook = document.createElement('div');
  newGuestBook.classList.add('newGuestBook');

  newGuestBook.innerHTML = `
    <div class="new-title">${title}</div>
    <div class="new-content">${content}</div>
    <div class="new-name">${name}</div>
    <div class="new-date">${nowClock}</div>
    <input type="text" class="check-password" placeholder="비밀번호"/> 
    <button class="delete-btn">삭제</button>
  `;
  
  // 클래스 붙여넣기
  guestbookList.appendChild(newGuestBook);

  const checkPasswordInput = newGuestBook.querySelector('.check-password'); //여기서는 새로 생길 때 삭제 버튼이 생기는거니까
  const deleteBtn = newGuestBook.querySelector('.delete-btn'); //document가 아닌 newGuestBook으로!!!
  
  //비밀번호가 맞다면 삭제
  deleteBtn.addEventListener ('click', () => {
    const newPassword = checkPasswordInput.value.trim();

     if (newPassword === password) {
        guestbookList.removeChild(newGuestBook);
    } else {
        alert('비밀번호가 다릅니다!');
    }
    })

  // 입력창 초기화
  nameInput.value = '';
  titleInput.value = '';
  contentInput.value = '';
  passwordInput.value = '';
});

getData();




