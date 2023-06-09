"use strict";
import { getPosts, deletePost, submitUpdatedPost, submitNewPost } from "./rest-service.js";
import { compareTitle, compareBody } from "./helpers.js";
window.addEventListener("load", initApp);
async function initApp() {
  updatePostsGrid();
  document.querySelector("#select-sort-by").addEventListener("change", sortByChanged);
  document.querySelector(".create").addEventListener("click", createPostClicked);
  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
}
async function updatePostsGrid() {
  const posts = await getPosts();
  showPosts(posts);
}

function showPosts(listOfPosts) {
  document.querySelector("#posts").innerHTML = "";
  for (const post of listOfPosts) {
    showPost(post);
  }
}
function showPost(post) {
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
  document.querySelector("#posts article:last-child img").addEventListener("click", () => postClicked(post));
  document.querySelector("#posts article:last-child .delete").addEventListener("click", () => deleteClicked(post));
  document.querySelector("#posts article:last-child .update").addEventListener("click", () => updateClicked(post));
}
async function deleteClicked(post) {
  const response = await deletePost(post.id);
  if (response.ok) {
    updatePostsGrid();
  }
}
function updateClicked(post) {
  document.querySelector("#update-form").showModal();
  const updatePostForm = /*html*/ `
    <form id="update-post" method="dialog">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required maxlength="20" />
      <label for image-url>
        Image URL:
      </label>
      <input type="url" id="image" name="image"/>
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" maxlength="140" />
      <br>
      <button>Update</button>
      <input type="button" id="btn-cancel" value="Cancel">
    </form>
    `;
  document.querySelector("#update-form").innerHTML = updatePostForm;
  document.querySelector("#image").value = post.image;
  document.querySelector("#title").value = post.title;
  document.querySelector("#description").value = post.body;
  document.querySelector("#update-form").addEventListener("submit", () => prepareUpdatedPostData(post));
  document.querySelector("#btn-cancel").addEventListener("click", () => {
    document.querySelector("#update-form").close();
  });
}

function postClicked(post) {
  document.querySelector("#postDetails").showModal();
  const dialogHTML = /*html*/ `
    <h1>${post.title}</h1>
<img src="${post.image}" class="center">
<p>${post.body}</p>
    <form method="dialog">
		<button id ="closeModalButton">Close</button>
    </form>`;

  document.querySelector("#postDetails").innerHTML = dialogHTML;
}
// === UPDATE (PUT) === //

async function prepareUpdatedPostData(post) {
  const image = document.querySelector("#image").value;
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#description").value;

  const response = await submitUpdatedPost(post.id, title, body, image);
  if (response.ok) {
    document.querySelector("#update-form").close();
    updatePostsGrid();
  }
}

// === CREATE (POST) === //
function createPostClicked(event) {
  document.querySelector("#create-form").showModal();
  const createPostForm = /*html*/ `
    <form id="update-post" method="dialog">
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required maxlength="20" placeholder="Your title here" />
      <label for image-url>
        Image URL:
      </label>
      <input type="url" id="image" name="image" placeholder="Your image URL here"/>
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" maxlength="140" placeholder="Your description here" />
      <br>
      <button>Submit</button>
      <input type="button" id="btn-cancel" value="Cancel">
    </form>
    `;
  document.querySelector("#create-form").innerHTML = createPostForm;
  document.querySelector("#create-form").addEventListener("submit", prepareNewPostData);
  document.querySelector("#btn-cancel").addEventListener("click", () => {
    document.querySelector("#create-form").close();
  });
}
async function prepareNewPostData() {
  const image = document.querySelector("#image").value;
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#description").value;
  const response = await submitNewPost(image, title, body);
  if (response.ok) {
    updatePostsGrid();
    document.querySelector("#create-form").close();
  }
}
async function inputSearchChanged(event) {
  const query = event.target.value.toLowerCase();
  const posts = await getPosts();
  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(query) || post.body.toLowerCase().includes(query));
  showPosts(filteredPosts);
}
async function sortByChanged() {
  const sortField = document.querySelector("#select-sort-by").value;
  const posts = await getPosts();

  if (sortField === "title") {
    posts.sort(compareTitle);
  } else if (sortField === "body") {
    posts.sort(compareBody);
  }

  showPosts(posts);
}
