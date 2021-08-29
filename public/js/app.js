const form = document.forms[0];
const name = document.getElementById('name');
const email = document.getElementById('email');
const message = document.getElementById('message');
form.addEventListener('submit', (event) => {
    event.preventDefault()
    let formData = {
        name: name.value,
        email: email.value,
        message: message.value
    }
    let request = new XMLHttpRequest()
    request.open('POST', '/')
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = () => {
        console.log(request.responseText)
        if (request.responseText == 'success') {
            alert('Email sent')
            name.value = '';
            email.value = '';
            message.value = ''
        } else { alert('Somthing went wrong') }
    }
    request.send(JSON.stringify(formData))
})