async function deletePostFormHandler(event) {
    event.preventDefault();
   const idToDelete = event.target.getAttribute("data-id")
    //Tutor gave me this hint: 
    // const id = window.location.toString().split('/')[
    //     window.location.toString().split('/').length -1
    // ];
    // console.log(window.location.toString())
    const response = await fetch(`/api/posts/${idToDelete}`, {
      method: 'DELETE',
      });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
  
  document.querySelector('.delete-something-button').addEventListener('click', deletePostFormHandler);