const deleteBtn = document.querySelectorAll('.trash-can');
const itemCompleted = document.querySelectorAll('#complete-button');

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteTask)
})

Array.from(itemCompleted).forEach((element)=>{
    element.addEventListener('click', markComplete)
})

async function deleteTask(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('delete', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    const dateText = this.parentNode.childNodes[3].innerText
    console.log(itemText)
    try{
        const response = await fetch('markComplete', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}