
function newFormHandler(){
  async (event) => {
 event.preventDefault();
 console.log('it should be working')
 const blogname = document.querySelector('#blog-name').value.trim();
 const blogName = document.querySelector('#manga-name').value.trim();
 const body = document.querySelector('#blog-body').value.trim();

 if (name && blogName && body) {
   
   const response = await fetch(`/api/blog`, {
     method: 'POST',
     body: JSON.stringify({ name, blogName, body }),
     headers: {
       'Content-Type': 'application/json',
     },
   });

   if (response.ok) {
     console.log("being sent================")
     document.location.replace('/profile');
   } else {
     alert('Try Again');
   }
 }
};
}
document.addEventListener('DOMContentLoaded', () => {
  document
  .querySelector('.form.new-blog-form').addEventListener('submit', newFormHandler)
    

  // document
  //   .querySelector('.blog-list')
  //   .addEventListener('click', delButtonHandler);
});
const form = document.querySelector('#submitBlog');
form.addEventListener('submit', newFormHandler);
//none of this S*** worked so im keeping it here just in case the way i wrote it now doesnt work 