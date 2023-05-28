const newBlogHandler = async (event) => {
  const submitButton = document.getElementById('create')
  event.preventDefault();
  const blogName = document.querySelector('#blog-name').value;
  const blogBody = document.querySelector('#blog-body').value;
  const mangaBody = document.querySelector('#manga-name').value;
  console.log(blogBody,blogName,mangaBody)
  if (blogBody && blogName && mangaBody) {
    console.log(blogBody,blogName,mangaBody)
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({blogBody,blogName,mangaBody}),
      headers: { 'Content-Type': 'application/json' }
    });
    if (response.ok) {
      console.log(blogBody,blogName,mangaBody)
      console.log(response)
      // document.location.replace('/profile');
    } else {
      alert(response);
    }
  }
  };



const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Oh, something wasnt right, try again');
    }
  }
};

document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newBlogHandler);
