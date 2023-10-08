async function editMemo(event) {
  const id = event.target.dataset.id;
  const editedInput = prompt("Enter the input that you want to edit.");
  const res = await fetch(`/memos/${id}`, {
    //updating specific input-> use PUT method
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //same as id:id
      id,
      content: editedInput,
    }),
  });
  readMemo();
}

//DELETE
async function deleteMemo(event) {
  const id = event.target.dataset.id;

  //REST API by using delete method rather than Get method with memos/delete
  const res = await fetch(`/memos/${id}`, {
    //updating specific input-> use PUT method
    method: "DELETE",
  });
  readMemo();
}
//READ
function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");

  const li = document.createElement("li");
  li.innerText = ` ${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", editMemo);
  //need to know ID of the specific memo to edit
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
}

async function readMemo() {
  const res = await fetch("/memos");
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

async function createMemo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().getTime(),
      content: value,
    }),
  });
  readMemo();
}

function handleSubmit(event) {
  //once it's submit it prevents event redirects
  event.preventDefault();
  const input = document.querySelector("#memo-input");
  createMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

readMemo();
