"use strict";
const endpoint =
  "https://forms-rest-crud-project-default-rtdb.europe-west1.firebasedatabase.app/";
window.addEventListener("load", initApp);
async function initApp() {
  console.log("initApp is running");
  const posts = await getPosts();
  posts.forEach(showPosts);
  const users = await getUsers();
  users.forEach(showUsers);
  createPost(
    "My First Post",
    "https://images.unsplash.com/photo-1641876749963-550554c7258d",
    "My body text"
  );
}
async function getPosts() {
  const response = await fetch(`${endpoint}/posts.json`);
  const data = await response.json();
  const posts = preparePostData(data);
  preparePostData(data);
  return posts;
}
function preparePostData(dataObject) {
  const postArray = [];
  for (const key in dataObject) {
    const post = dataObject[key];
    post.id = key;
    postArray.push(post);
  }
  return postArray;
}
function showPosts(post) {
  console.log("showPosts is running");
  const postHTML = /*html*/ ` <article class="grid-item">
                <img src="${post.image}">
                <h2>${post.title}</h2>
                <h2>${post.body}</h2>
                
            </article>`;
  document.querySelector("#posts").insertAdjacentHTML("beforeend", postHTML);
  document
    .querySelector("#posts article:last-child")
    .addEventListener("click", clickPost);

  function clickPost() {
    console.log("clickPost is running");
    document.querySelector("#postDetails").showModal();
    const dialogHTML = /*html*/ `
    <h1>${post.title}</h1>
<img src="${post.image}" class="center">
<h2>${post.body}</h2>
    <form method="dialog">
		<button id ="closeModalButton">Close</button>
    </form>`;

    document.querySelector("#postDetails").innerHTML = dialogHTML;
  }
}
async function getUsers() {
  console.log("getUsers is running");
  const response = await fetch(`${endpoint}/users.json`);
  const data = await response.json();
  const users = prepareUserData(data);
  prepareUserData(data);
  return users;
}
function prepareUserData(dataObject) {
  console.log("prepareUserData is running");
  const userArray = [];
  for (const key in dataObject) {
    const user = dataObject[key];
    user.id = key;
    userArray.push(user);
  }
  return userArray;
}
function showUsers(user) {
  console.log("showUsers is running");
  const userHTML = /*html*/ ` <article class="grid-item">
                <img src="${user.image}">
                <h2>${user.name}</h2>
                <h2>${user.title}</h2>
                <h2>${user.mail}</h2>
                <h2>${user.phone}</h2>
                
            </article>`;
  document.querySelector("#users").insertAdjacentHTML("beforeend", userHTML);
}
// === CREATE (POST) === //
async function createPost(title, image, body) {
  const newPost = { title: title, image: image, body: body };
  const postAsJson = JSON.stringify(newPost);

  const res = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: postAsJson,
  });
  console.log(newPost);
  const data = await res.json();
  console.log(data);
}

// test the function
// createPost("My First Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");
// === UPDATE (PUT) === //
// async function updatePost(id, title, image) {
//   const postToUpdate = { title, image };
//   const postAsJson = JSON.stringify(postToUpdate);
//   const url = `${endpoint}/posts/${id}.json`;

//   const res = await fetch(url, { method: "PUT", body: postAsJson });
//   const data = await res.json();
//   console.log(data);
// }

// // test the function
// // updatePost("5tl4jHHSRaKEB0UW9nQd", "My Second Post", "https://images.unsplash.com/photo-1641876749963-550554c7258d");
// // === DELETE (DELETE) === //
// async function deletePost(id) {
//   const url = `${endpoint}/posts/${id}.json`;
//   const res = await fetch(url, { method: "DELETE" });
//   console.log(res);
// }

// test the function
// deletePost("5tl4jHHSRaKEB0UW9nQd");
