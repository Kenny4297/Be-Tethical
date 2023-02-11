async function newFormHandler(event) {
    event.preventDefault();

    const postTitle = document.querySelector('input[name="post_title"]').value;
    const postContent = document.querySelector('input[name="post_content"]').value;

    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        postTitle,
        postContent
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to add Post');
    }
  }
  
  document.querySelector('.add-post-form').addEventListener('submit', newFormHandler);