const postsUl = document.querySelector('.posts');
const liTemplate = document.querySelector('#single-post');
const fetchPostsBtn = document.querySelector('#available-posts button');
const form = document.querySelector('#new-post form');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = event.currentTarget.querySelector('#title').value;
  const content = event.currentTarget.querySelector('#content').value;
  createPost(title, content);
  form.reset();
});

fetchPostsBtn.addEventListener('click', fetchPost);

postsUl.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const postId = event.target.closest('li').id;
    deletePost(postId);
  }
});

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status !== 200 && xhr.status !== 201) {
        reject(`Error ${xhr.status}: ${xhr.statusText}`);
      } else {
        resolve(xhr.response);
      }
    };
    xhr.send(JSON.stringify(data));
  });
  return promise;
}

async function fetchPost() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts'
    );
    postsUl.innerHTML = '';
    for (const post of responseData) {
      //const postLi = document.importNode(liTemplate.content, true);
      const postLi = liTemplate.content.cloneNode(true);
      postLi.querySelector('h2').textContent = post.title.toUpperCase();
      postLi.querySelector('p').textContent = post.body;
      //postLi.id = post.id;
      postLi.querySelector('li').id = post.id;
      //postLi.children[0].id = post.id;
      postsUl.append(postLi);
    }
  } catch {
    (error) => console.log(error);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };
  try {
    const responseData = await sendHttpRequest(
      'POST',
      'https://jsonplaceholder.typicode.com/posts',
      post
    );
  } catch {
    (error) => console.log(error);
  }
}

async function deletePost(id) {
  sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${id}`
    ).catch((error) => console.log(error));
    postsUl.querySelector(`[id='${id}']`).remove();
}
//createPost('Dogs', 'Dogs are awesome!');

/* const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');

// xhr.responseType = 'json';

xhr.onload = function() {
  if (xhr.status !== 200){
    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    const postsData = JSON.parse(xhr.response);
    for (const post of postsData) {
     // const postLi = document.importNode(liTemplate, true);
      const postLi = liTemplate.cloneNode(true);
      postLi.querySelector('h2').textContent = post.title.toUpperCase();
      postLi.querySelector('p').textContent = post.body;
      postsUl.append(postLi);
    }
  }
}

xhr.send(); */
