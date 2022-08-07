const log = console.log;
const buy_list = document.getElementsByTagName('button');
//const buy_list1 = document.getElementsByClassName('button');
//console.log(buy_list);
/* for (let i = 0; i < buy_list.length; i++) {
    buy_list[i].addEventListener('click', function () {
        console.log(this.innerHTML);
    }
    );
} */
/* console.log(buy_list);
console.log(Array.from(buy_list)[0].innerHTML);
Array.from(buy_list).forEach((item) => {
  item.addEventListener('click', () => {
    console.log(item.innerHTML);
  });
}); */
/* [...buy_list].forEach((item) => {
  item.addEventListener('click', () => {
    console.log(item.innerHTML);
  });
}); */
// console.log(buy_list.namedItem('hi').innerHTML);
// console.log(buy_list.item(0).innerHTML);
/* const buy_list_node = document.querySelectorAll('button');
console.log(buy_list_node.values());
buy_list_node.forEach((item) => {
  item.addEventListener('click', () => {
    console.log(item.innerHTML);
  });
}); */

/* // retrieve element using querySelectorAll
const listItems_querySelector = document.querySelectorAll('li');
console.log('querySelector', listItems_querySelector);
// retrieve element using childNodes
const list  = document.querySelector('ul')
const listItems_childNodes = list.childNodes;
console.log('childNodes', listItems_childNodes);
const listItems_children = list.children;
console.log('children', listItems_children);

const listItems_getElementsByTagName = document.getElementsByTagName('li');
console.log('getElementsByTagName', listItems_getElementsByTagName);

console.log('*************************');
console.log('add one list item');
console.log('*************************');
list.appendChild(document.createElement('li'));

console.log('querySelector', listItems_querySelector);
console.log('childNodes', listItems_childNodes);
console.log('children', listItems_children);
console.log('getElementsByTagName', listItems_getElementsByTagName);

console.log('*************************');
console.log('add one more list item');
console.log('*************************');
listItems_getElementsByTagName[0].parentNode.appendChild(
  document.createElement('li')
);

console.log('querySelector', listItems_querySelector);
console.log('childNodes', listItems_childNodes);
console.log('children', listItems_children);
console.log('getElementsByTagName', listItems_getElementsByTagName);  */

/* Array.from(buy_list).forEach((item) => {
  item.addEventListener('click', () => {
    console.log(item.innerHTML);
    item.style.backgroundColor = 'red';
  });
});
 */
for (i = 0; i < buy_list.length; i++) {
  buy_list[i].addEventListener('click', function () {
    this.style.backgroundColor = 'red';
    for (j = 0; j < buy_list.length; j++) {
      if (buy_list[j] != this) {
        buy_list[j].style.backgroundColor = '#4CAF50';
      }
    }
  });
}

// buy_list[0].addEventListener('click', function () {
//     this.style.backgroundColor = 'red';
// });

const list_list = document.getElementById('list');
list_list.remove();

const h1 = document.createElement('h1');
h1.innerHTML = 'Hello World';
const html = document.getElementsByTagName('html')[0];
html.append(h1);
html.prepend(h1);
/* h1.className = 'hello';
h1.classList.add('hello');
h1.classList.remove('hello');
//Using "classList", you can add or remove a class without affecting any others the element may have. But if you assign "className", it will wipe out any existing classes while adding the new one (or if you assign an empty string it will wipe out all of them). */

const getValue = document.getElementById('blog-test');
console.log(getValue.innerHTML);
console.log(getValue.innerText);
console.log(getValue.textContent);
getValue.innerHTML = '<h1>Hello World</h1>';
getValue.innerText = '<h1>Hello World</h1>';
getValue.textContent = '<h1>Hello World</h1>';

const x = document.getElementsByTagName('a')[0];
console.log(x);
document.getElementById('demo').innerHTML =
  '<a id="myAnchor1" href="https://www.w3schools.com/html/">HTML</a>';

h1.setAttribute('class', 'hello');
