function updateForm() {
  document.querySelector("#update-form").showModal();
  const updatePostForm = /*html*/ `
    <form id="update-post">
      <label for image-url>
        Image URL:
      </label>
      <input type="url" id="image" name="image"/>
      <label for="title">Title:</label>
      <input type="text" id="title" name="title" required />
      <label for="description">Description:</label>
      <input type="text" id="description" name="description" />
      <div id="privacy">
        <label for privacy_settings_public>
          Public
        </label>
        <input type="radio" id="public" name="public" value="public" />
        <label for privacy_settings_private>
          Private
        </label>
        <input type="radio" id="private" name="private" value="private" />
      </div>
      <input type="button" id="btn-submit" value="Post">
    </form>
    `;
  document.querySelector("#update-form").innerHTML = updatePostForm;
  document.querySelector("#btn-submit").addEventListener("click", prepareUpdatedPostData);
}
function prepareUpdatedPostData() {
  console.log("prepareNewPostData is running");

  const image = document.querySelector("#image").value;
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#description").value;
  submitUpdatedPost(image, title, body);
}
async function submitUpdatedPost(image, title, body) {
  console.log("submitNewPost is running");
  const newPost = { image, title, body };
  const postAsJson = JSON.stringify(newPost);
  const response = await fetch(`${endpoint}/posts.json`, { method: "POST", body: postAsJson });
  if (response.ok) {
    console.log("Post updated");
    updatePostsGrid();
    document.querySelector("#update-form").close();
  }
}
