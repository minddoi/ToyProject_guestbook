const modal = document.querySelector("#modal");
const addBtn = document.querySelector("#open-add-btn");
const closeBtn = document.querySelector("#close-add-btn");

// 방명록 모달창 (열기/닫기)
addBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}