function searchPost(searchValue) {
  searchValue = searchValue.toLowerCase();

    const results = posts.filter((post) => post.title.toLowerCase().includes(searchValue));
    return results;
}
