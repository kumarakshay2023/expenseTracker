

let expense = document.getElementById('expense')
let description = document.getElementById('description')
let category = document.getElementById('options')
let addExpense = document.getElementById('addExpence')
let btn = document.getElementById('submit');


btn.addEventListener('click',AddExpense);
addExpense.addEventListener('click',deleteExpense);
addExpense.addEventListener('click',editExpense);

function AddExpense(event){
  event.preventDefault();
  
  if(expense.value==''||description.value==''||category.value==''){
    alert('plz enter all values');
     expense.value='';
     description.value='';
     category.value='';
  }
  else if(expense.value<=0){
    alert('plz enter positive value for expense');
    expense.value='';
  }
  else{
    let obj={
        expense:expense.value,description:description.value,category:category.value
    }
  axios.post('https://crudcrud.com/api/0e7b883817ad4b10a6e536839b574987/track',obj).then((res)=>{
    showItems(res.data)
  }).catch((err)=>{
    console.log(err);
  })



  }
 
 
}
 


function showItems(obj){

  let li = document.createElement('li');
   li.id=`${obj._id}`;

   let delBtn = document.createElement('button');
   delBtn.className="btn btn-danger delete";
  delBtn.appendChild(document.createTextNode('Delete Expense'))
   let editBtn = document.createElement('button');
   editBtn.className = "btn btn-info edit";
    editBtn.appendChild(document.createTextNode('Edit Expense'));

    li.appendChild(document.createTextNode(`${obj.expense} ${obj.category} ${obj.description}`))
    li.appendChild(delBtn);
    li.appendChild(editBtn);
    addExpense.appendChild(li);

  



}

window.addEventListener('DOMContentLoaded',async(e)=>{

    await axios.get('https://crudcrud.com/api/0e7b883817ad4b10a6e536839b574987/track')
    .then((res)=>res.data.map(ele=>{
      showItems(ele);
    }))
})

function deleteExpense(event){
   if(event.target.classList.contains('delete')){
      const id = event.target.parentElement.id;
      axios.delete(`https://crudcrud.com/api/0e7b883817ad4b10a6e536839b574987/track/${id}`)
       addExpense.removeChild(event.target.parentElement);
   }
}

function editExpense(event){
     if(event.target.classList.contains('edit')){
        const id = event.target.parentElement.id;

       axios.get(`https://crudcrud.com/api/0e7b883817ad4b10a6e536839b574987/track/${id}`)
       .then((res)=>{
          expense.value=res.data.expense
          category.value = res.data.category
          description.value = res.data.description
       }).catch((err)=>console.log(err));
        
     axios.delete(`https://crudcrud.com/api/0e7b883817ad4b10a6e536839b574987/track/${id}`)
      addExpense.removeChild(event.target.parentElement);

     }
}


