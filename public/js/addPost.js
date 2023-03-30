async function newPostHandler(event) {
    event.preventDefault();

    const nav = document.querySelector('.nav');
    // nav.classList.add('hide');

    const postTitle = document.querySelector('input[name="post-title"]').value;
    const postContent = document.querySelector('textarea[name="post-content"]').value;

    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
        post_title: postTitle,
        post_content: postContent,
        post_date: new Date()
    }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
        alert("post added successfully!")
    } else {
        alert('Failed to add Post');
    }
}

document.querySelector('.add-post-form').addEventListener('submit', newPostHandler);
