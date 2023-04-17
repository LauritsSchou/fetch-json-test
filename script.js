"use strict";
const endpoint = "https://forms-rest-crud-project-default-rtdb.europe-west1.firebasedatabase.app/";
window.addEventListener("load", initApp);
async function initApp() {
  console.log("initApp is running");
  const posts = await getPosts();
  posts.forEach(showPosts);
}
async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  const posts = preparePostData(data);
  console.log(data);
  preparePostData(data);
  return posts;
}
function preparePostData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    console.log(post);
    postArray.push(post);
  }
  console.log(postArray);
  return postArray;
}
function showPosts(post) {
  console.log("showPosts is running");
  const postHTML = /*html*/ ` <article class="grid-item">
                <img src="${post.image}">
                <h2>${post.title}</h2>
                
            </article>`;
  document.querySelector("#posts").insertAdjacentHTML("beforeend", postHTML);
  document.querySelector("#posts article:last-child").addEventListener("click", clickPost);

  function clickPost() {
    console.log("clickPost is running");
    document.querySelector("#postdetails").showModal();
    const dialogHTML = /*html*/ `
    <h1>${post.title}</h1>
<img src="${post.image}" class="center">
    <form method="dialog">
		<button id ="closeModalButton">Close</button>
    </form>`;

    document.querySelector("#postdetails").innerHTML = dialogHTML;
  }
}
// === CREATE (POST) === //
async function createPost(title, image) {
  const newPost = { title, image };
  const postAsJson = JSON.stringify(newPost);

  const res = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });
  const data = await res.json();
  console.log(data);
}

// test the function
// createPost("My First Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");
// === UPDATE (PUT) === //
async function updatePost(id, title, image) {
  const postToUpdate = { title, image };
  const postAsJson = JSON.stringify(postToUpdate);
  const url = `${endpoint}/posts/${id}.json`;

  const res = await fetch(url, { method: "PUT", body: postAsJson });
  const data = await res.json();
  console.log(data);
}

// test the function
// updatePost("5tl4jHHSRaKEB0UW9nQd", "My Second Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");
// === DELETE (DELETE) === //
async function deletePost(id) {
  const url = `${endpoint}/posts/${id}.json`;
  const res = await fetch(url, { method: "DELETE" });
  console.log(res);
}

// test the function
// deletePost("5tl4jHHSRaKEB0UW9nQd");
