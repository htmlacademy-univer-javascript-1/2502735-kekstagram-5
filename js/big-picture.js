export function showBigPicture(photo) {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCaption = bigPicture.querySelector('.social__caption');
  const commentCountBlock = bigPicture.querySelector('.social__comment-count');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  const body = document.body;
  const closeButton = bigPicture.querySelector('#picture-cancel');

  let currentIndex = 0;
  const commentsUploadedCount = 5;

  commentCountBlock.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');

  function updateComments() {
    const commentsFragment = document.createDocumentFragment();
    const commentsToShow = photo.comments.slice(currentIndex, currentIndex + commentsUploadedCount);

    commentsToShow.forEach((comment) => {
      const commentElement = document.createElement('li');
      commentElement.classList.add('social__comment');

      const commentImg = document.createElement('img');
      commentImg.classList.add('social__picture');
      commentImg.src = comment.avatar;
      commentImg.alt = comment.name;

      const commentText = document.createElement('p');
      commentText.classList.add('social__text');
      commentText.textContent = comment.message;

      commentElement.appendChild(commentImg);
      commentElement.appendChild(commentText);
      commentsFragment.appendChild(commentElement);
    });

    socialComments.appendChild(commentsFragment);

    currentIndex += commentsUploadedCount;

    const displayedComments = Math.min(currentIndex, photo.comments.length);
    commentCountBlock.innerHTML = `${displayedComments} из <span class="comments-count">${photo.comments.length}</span> комментариев`;

    if (currentIndex >= photo.comments.length) {
      commentsLoader.classList.add('hidden');
    }
  }

  function onCommentsLoaderClick() {
    updateComments();
  }

  function onEscPress(evt) {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  }

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  }

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;

  socialComments.innerHTML = '';
  currentIndex = 0;
  updateComments();

  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    const commentImg = document.createElement('img');
    commentImg.classList.add('social__picture');
    commentImg.src = comment.avatar;
    commentImg.alt = comment.name;

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = comment.message;

    commentElement.appendChild(commentImg);
    commentElement.appendChild(commentText);

    socialComments.appendChild(commentElement);
  });

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  closeButton.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onEscPress);
}
