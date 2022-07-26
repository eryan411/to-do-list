const update = document.querySelector('#complete-button')
const deleteText = document.querySelector('.trash-can')
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = `${mm}/${dd}/${yyyy}`

Array.from(update).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', completeTodo)
})

async function deleteTask(){
    console.log('test')
    const action = this.parentNode.childNodes[1].innerText
    const date = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteTask', {
            method: 'delete',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
                'action': action,
                'date': date
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err){
        console.log(err)
    }
}

async function completeTodo(){
    console.log('test')
    const action = this.parentNode.childNodes[1].innerText
    const date = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('/to-dos', {
            method: 'put',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                'action': 'Done!',
                'date': today
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}