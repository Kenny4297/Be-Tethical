async function editPostFormHandler(event) {
        event.preventDefault();

        const postTitle = document.querySelector('input[name="post-title"]').value.trim();
        const postContent = document.querySelector('input[name="post-content"]').value.trim();

        //Received help for this variable 
        const id = window.location.toString().split('/')[
            window.location.toString().split('/').length -1
        ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          post_title: postTitle,
          post_content: postContent
        }),
        headers: {
          'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
        alert("Post Updated!")
    } else {
        alert('Failed to add Post');
    }
}
  
document.querySelector('.edit-post-form').addEventListener('submit', editPostFormHandler);


 