"use strict";
const endpoint =
  "https://forms-rest-crud-project-default-rtdb.europe-west1.firebasedatabase.app/";
window.addEventListener("load", initApp);
async function initApp() {
  console.log("initApp is running");
  // const users = await getUsers();
  // users.forEach(showUsers);
  updatePostsGrid();
  document
    .querySelector(".create")
    .addEventListener("click", createPostClicked);
}
async function updatePostsGrid() {
  const posts = await getPosts();
  showPosts(posts);
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
function showPosts(listOfPosts) {
  document.querySelector("#posts").innerHTML = "";
  for (const post of listOfPosts) {
    showPost(post);
  }
}
function showPost(post) {
  console.log("showPosts is running");
  const postHTML = /*html*/ ` <article class="grid-item">
                <img src="${post.image}">
                <h1>${post.title}</h1>
                <h2>${post.body}</h2>
                <div class="btns">
                <button class="delete">Delete</button>
                <button class="update">Update</button>
                </div>
                
            </article>`;
  document.querySelector("#posts").insertAdjacentHTML("beforeend", postHTML);
  document
    .querySelector("#posts article:last-child img")
    .addEventListener("click", clickPost);
  document
    .querySelector("#posts article:last-child .delete")
    .addEventListener("click", deleteClicked);
  document
    .querySelector("#posts article:last-child .update")
    .addEventListener("click", updateClicked);
  function deleteClicked() {
    deletePost(post.id);
  }
  function updateClicked() {
    const title = `${post.title} Updated`;
    const body = "Updated";
    const image =
      "https://images.unsplash.com/photo-1641876749963-550554c7258d";
    updatePost(post.id, title, body, image);
  }
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

async function deletePost(id) {
  console.log(id);
  const response = await fetch(`${endpoint}/posts/${id}.json`, {
    method: "DELETE",
  });
  if (response.ok) {
    updatePostsGrid();
  }
}
// === UPDATE (PUT) === //
async function updatePost(id, title, body, image) {
  const postToUpdate = { title, body, image };
  const postAsJson = JSON.stringify(postToUpdate);
  const url = `${endpoint}/posts/${id}.json`;

  const response = await fetch(url, { method: "PUT", body: postAsJson });
  if (response.ok) {
    console.log("Post succesfully updated");
    updatePostsGrid();
  }
}
// === CREATE (POST) === //
function createPostClicked() {
  const randomNumber = Math.floor(Math.random() * 100 + 1);
  const title = `My post title ${randomNumber}`;
  const body = "Body text 123";
  const image =
    "https://images.twinkl.co.uk/tr/raw/upload/u/ux/usawiki-fish-clownfish_ver_1.jpg";
  createPost(title, image, body);
}
async function createPost(title, image, body) {
  const newPost = { title, body, image };
  const json = JSON.stringify(newPost);

  const response = await fetch(`${endpoint}/posts.json`, {
    method: "POST",
    body: json,
  });
  if (response.ok) {
    console.log("New post succesfully created");
    updatePostsGrid();
  }
}
// async function getUsers() {
//   console.log("getUsers is running");
//   const response = await fetch(`${endpoint}/users.json`);
//   const data = await response.json();
//   const users = prepareUserData(data);
//   prepareUserData(data);
//   return users;
// }
// function prepareUserData(dataObject) {
//   console.log("prepareUserData is running");
//   const userArray = [];
//   for (const key in dataObject) {
//     const user = dataObject[key];
//     user.id = key;
//     userArray.push(user);
//   }
//   return userArray;
// }
// function showUsers(user) {
//   console.log("showUsers is running");
//   const userHTML = /*html*/ ` <article class="grid-item">
//                 <img src="${user.image}">
//                 <h2>${user.name}</h2>
//                 <h2>${user.title}</h2>
//                 <h2>${user.mail}</h2>
//                 <h2>${user.phone}</h2>

//             </article>`;
//   document.querySelector("#users").insertAdjacentHTML("beforeend", userHTML);
// }
