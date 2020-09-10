console.log('this is client side browser data ')

const weatherform = document.querySelector('form')
const searchdata = document.querySelector('input')
const messageone = document.querySelector('#message-1')
const messagetwo = document.querySelector('#message-2')
//const messagethreee = document.querySelector('#message-3')
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    messageone.textContent='Loading...'
    messagetwo.textContent=''
    //messagethreee.textContent=''
    const location = searchdata.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            return messageone.textContent=data.error
        }
        messageone.textContent=data.address
        messagetwo.textContent='It is '+data.description+' and the temperature here is '+data.temperature+' fahrenheit'
    })
})
})