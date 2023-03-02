async function deletePostFormHandler(event) {
    event.preventDefault();
    const idToDelete = event.target.getAttribute("data-id");
    console.log(`The id to delete is ${idToDelete}`);
    const response = await fetch(`/api/posts/${idToDelete}`, {
        method: 'DELETE',
        });

    if (response.ok) {
        document.location.replace('/dashboard');
        return
    } else {
        // alert('Failed to delete post');
        return;
    }
}

document.querySelector('.delete-something-button').addEventListener('click', event => {
    deletePostFormHandler(event);
  });