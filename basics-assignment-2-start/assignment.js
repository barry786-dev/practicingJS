const task3Element = document.getElementById('task-3');

function hallo () {
    alert('Hallo');
}
function showName (name1) {
    alert(name1);
}
hallo();
showName('Max');

task3Element.addEventListener('click', hallo);

function concatenate (string1, string2) {
    return string1 + string2;
}

alert(concatenate('Hello', ' World'));