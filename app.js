import { getData, postGuestbook, deleteData } from './api.js';

const modal = document.querySelector("#modal");
const addBtn = document.querySelector("#open-add-btn");
const closeBtn = document.querySelector("#close-add-btn");

const nameInput = document.getElementById('name');
const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submit');
const guestbookList = document.getElementById('guestbook-list');

// const now = new Date();
// const created_time = now.toLocaleString();

// 방명록 모달창 (열기/닫기)
addBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

//방명록 리스트 불러오기
async function renderGuestbookList() {
    const dataList = await getData();

    guestbookList.innerHTML = ''; //불러오기 전에 기존 내용 초기화

    dataList.forEach(item => {
        const newGuestBook = document.createElement('div');
        newGuestBook.classList.add('newGuestBook');
    
        newGuestBook.innerHTML = `
          <div class="new-title">${item.title}</div>
          <div class="new-content">${item.content}</div>
          <div class="new-name">${item.writer}</div>
          <div class="new-date">${item.created_time}</div>
          <input class="check-password" placeholder="비밀번호"></input>
          <div class="delete-btn">삭제</div>
        `;

        //삭제 버튼
        const checkPwInput = newGuestBook.querySelector('.check-password'); //여기서는 새로 생길 때 삭제 버튼이 생기는거니까
        const deleteBtn = newGuestBook.querySelector('.delete-btn'); //document가 아닌 newGuestBook으로!!! 
        
        deleteBtn.addEventListener('click', async () => {
            const inputPw = checkPwInput.value.trim();

            if (!inputPw) {
                alert('비밀번호를 입력해주세요!');
                return;
            }

            const resPw = await deleteData(item.id, inputPw);
            console.log('보낸 ID:', item.id);
            console.log('보낸 비밀번호:', inputPw);

            if (resPw.status === 200) {
                alert('삭제가 완료되었습니다.');
                await renderGuestbookList(); //삭제한 화면 렌더링
            // } else if (resPw.stauts === 400) {
            //     alert('올바른 숫자를 입력해주세요.') 
            } else {
                alert(resPw.message);
            }
        });

        guestbookList.appendChild(newGuestBook);
      });
}


modal.style.display = "none"; //새로고침시 모달창 뜨지 않게
renderGuestbookList();

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
//   console.log("보내는 데이터:", postData);
  const requestData = await postGuestbook(postData); //내용 요청 후 기다림..

  if (requestData) { //새로 내용 추가시 다시 화면 렌더링
    await renderGuestbookList(); 
  }

  
  // 입력창 초기화
  nameInput.value = '';
  titleInput.value = '';
  contentInput.value = '';
  passwordInput.value = '';
});

getData();

