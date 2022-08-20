// var input = document.getElementById('input')
// var main = document.getElementById('main')
var parent = document.getElementById('displaylist')


window.add = function () {
    // var li = document.createElement('li')
    // var litext = document.createTextNode(.value)
    // li.appendChild(litext)
    // li.className = 'hamza'
    // litext.className = 'ja'
    // parent.appendChild(li)
    // input.value = ""

    var button = document.createElement('button')
    var text = document.createTextNode('Edit')
    button.appendChild(text)
    button.setAttribute("onclick", "edit(this)")
    button.className = 'button1'
    parent.appendChild(button)
    input.value = ""

    var button = document.createElement('button')
    var text = document.createTextNode('Delete')
    button.appendChild(text)
    button.setAttribute("onclick", "deletea(this)")
    button.className = 'button2'
    parent.appendChild(button)
    input.value = ""

}

// var list = []

// function newdat() {
//     var obj = {
//         text: "user input value",
//         Time: new Date().getHours()+":"+ new Date().getMonth()

//     }
// }
// list.push(obj)


window.edit = function (element) {
    var val = prompt("Enter Task", element.parentNode.firstChild.nodeValue);
    element.parentNode.firstChild.nodeValue = val
    // console.log(val);

}


window.deletea = function (e) {
    e.parentNode.remove();
}

window.DeleteAll = function (element) {
    main.remove();
}










// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-analytics.js";
import { getDatabase, ref, push, onValue, set } from "https://www.gstatic.com/firebasejs/9.9.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDTXh3wzxIl6JaqG0Tz4_aai1hFhSaVPyo",
    authDomain: "todo-app-d3a04.firebaseapp.com",
    projectId: "todo-app-d3a04",
    storageBucket: "todo-app-d3a04.appspot.com",
    messagingSenderId: "684291882718",
    appId: "1:684291882718:web:37fade26d7eecad0fe8c4f",
    measurementId: "G-0WV4LZJ0NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();



window.sendValue = function () {
    var inp = document.getElementById('input');
    console.log(inp.value);

    var id = Math.random().toString().slice(2);


    var obj = {
        text: inp.value,
        // id:id,
        time: new Date().getHours() +
            new Date().getMinutes() +
            new Date().getSeconds(),
            
    };

    var reference = ref(database, 'task/' );
    var newRef = push(reference)
    set(newRef, obj);


    inp.value = ""
};

var tasksData;

function render() {
    var parent = document.getElementById('displaylist')
    parent.innerHTML = "";
    for (var i = 0; i < tasksData.length; i++) {
        parent.innerHTML += ` <div class=" bg-light  text-primary name mx-5 my-2 rounded shadow"> <div class="d-flex justify-content-between"><div> <p class="mx-3">Task: ${tasksData[i].text}</p> </div>
       <div class="my-2 mx-3"> <button class="bg-primary rounded mn text-white" onclick="edit(this)">Edit</button>
        <button class="bg-primary rounded mn text-white" onclick="deletea(this )">Delete</button> </div> </div>
        <p class="mx-3"> Time:  ${tasksData[i].time}</p></div>`;
    }
}




function getAlllist() {
    var reference = ref(database, 'task/');
    onValue(reference, function (data) {
        tasksData = Object.values(data.val());
        console.log(tasksData);
        render();
    })

}

getAlllist();