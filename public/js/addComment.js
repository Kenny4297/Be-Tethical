document.addEventListener('DOMContentLoaded', function() {
    let commentFormDisplayed = false;
    const createCommentButton = document.querySelector('.create-comment-button');
  
    async function newCommentHandler(event) {
      event.preventDefault();
  

      function formatDate(date) {
        const newDate = new Date(date);
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const year = newDate.getFullYear();
        return `${month}/${day}/${year}`;
      }
  
      const commentContent = document.querySelector('textarea[name="comment-content"]').value;
      const postId = document.querySelector('.post-options').getAttribute('data-post-id'); // get post ID value
  
      const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify({
          comment_content: commentContent,
          post_id: postId // include post ID value in fetch request
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(postId);
  
      if (response.ok) {
        const commentData = await response.json();
        const commentTemplate = `
          <div class="comment">
            <p class="comment-content">${commentData.comment_content}</p>
            <p>${formatDate(commentData.comment_date)}</p>
          </div>
        `;
        document.querySelector('.comment-to-post-section > div').insertAdjacentHTML('beforeend', commentTemplate);
        document.querySelector('textarea[name="comment-content"]').value = '';
        document.querySelector('.add-comment-form').remove(); // remove comment form
        commentFormDisplayed = false;
        createCommentButton.style.display = 'block'; // show "Add a Comment" button again
      } else {
        alert('Failed to add comment');
      }
    }
  
    function displayCommentForm() {
      if (!commentFormDisplayed) {
        commentFormDisplayed = true;
        const commentFormTemplate = `
          <form class="add-comment-form">
            <label for="comment-content">Add your thoughts!</label>
            <textarea type="text" name="comment-content" id="comment-title"></textarea>
            <button class="add-comment" type="submit">Post your Comment!</button>
          </form>
        `;
        createCommentButton.insertAdjacentHTML('afterend', commentFormTemplate);
        document.querySelector('.add-comment-form').addEventListener('submit', newCommentHandler);
        createCommentButton.style.display = 'none'; // hide "Add a Comment" button
      }
    }
  
    createCommentButton.addEventListener('click', (event) => {
      event.preventDefault();
      displayCommentForm();
    });
  });