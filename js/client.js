const socket = io('http://localhost:8000');

const form = document.getElementById('send-form');
const messageInput = document.getElementById('inputMessage')
const messageContainer = document.querySelector(".container")

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


let dateObj = new Date();
let myDate = (dateObj.getUTCDate()) + "/" + (dateObj.getMonth() + 1)+ "/" + (dateObj.getUTCFullYear());
document.getElementById("demo").innerHTML = myDate;

let myTime = "Time-" + (dateObj.getHours()) + ":" + (dateObj.getMinutes());
document.getElementById("time").innerHTML = myTime;

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right')
})
 
socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`, 'right')
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''
})