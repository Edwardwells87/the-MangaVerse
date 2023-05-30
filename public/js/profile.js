const newBlogHandler = async (event) => {
  const submitButton = document.getElementById('create')
  event.preventDefault();
  const Blog_Name = document.querySelector('#blog-name').value;
  const Blog_Content = document.querySelector('#blog-body').value;
  const Manga_title = document.querySelector('#manga-name').value;
  console.log(Blog_Content, Blog_Name, Manga_title)
  if (Blog_Content && Blog_Name && Manga_title) {

    const response = await fetch('/api/blog', {
      method: 'POST',
      body: JSON.stringify({ Blog_Content, Blog_Name, Manga_title }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      console.log(Blog_Content, Blog_Name, Manga_title)
      console.log(response)
      document.location.replace('/profile');
    } else {
      alert(response);
    }
  }
};


const delButtonHandler = async (event) => {
  console.log('delete button clicked');
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Oh, something wasn\'t right. Please try again.');
    }
  }
};
document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);

console.log(Array.from(document
  .getElementsByClassName('btn')))

Array.from(document
  .getElementsByClassName('btn')).forEach(delBtnEl => {
    delBtnEl.addEventListener('click', delButtonHandler);
  })
