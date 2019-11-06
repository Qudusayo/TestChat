const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

let name = prompt('What is your name?')
while (name === null || name === '' || name.length <  3) {
  name = prompt('What is your name?')
}
messageContainer.innerHTML += `<div class='user-on'>You joined</div>`
socket.emit('new-user', name)

socket.on('chat-message', data => {
  messageContainer.innerHTML +=  `<div  class='yours'>${data.name}: ${data.message}</div>`
})

socket.on('user-connected', name => {
  messageContainer.innerHTML += `<div class='user-on'>${name} connected</div>`
})

socket.on('user-disconnected', name => {
  messageContainer.innerHTML += `<div class='user-off'>${name} disconnected</div>`
})

messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  messageContainer.innerHTML +=  `<div  class='mine'>You: ${message}</div>`
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

// function appendMessage(message) {
//   const messageElement = document.createElement('div')
//   messageElement.innerText = message
//   messageContainer.append(messageElement)
// }