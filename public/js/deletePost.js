async function deletePostFormHandler(event) {
    event.preventDefault();
    const idToDelete = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${idToDelete}`, {
        method: 'DELETE',
        });

    if (response.ok) {
        document.location.replace('/dashboard');
        return
    } else {
        return;
    }
}

document.querySelector('.delete-something-button').addEventListener('click', event => {
    deletePostFormHandler(event);
  });