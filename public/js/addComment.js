async function newPostHandler(event) {
    event.preventDefault();

    const commentContent = document.querySelector('textarea[name="comment-content"]').value;

    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
            comment_content: commentContent,
            
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to add Comment');
    }
}
