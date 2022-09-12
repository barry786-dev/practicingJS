const postsUl = document.querySelector('.posts');
const liTemplate = document.querySelector('#single-post').content;

const xhr = new XMLHttpRequest();
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

xhr.send();
