

let expense = document.getElementById('expense')
let description = document.getElementById('description')
let category = document.getElementById('options')
let addExpense = document.getElementById('addExpence')
let btn = document.getElementById('submit');


btn.addEventListener('click',AddExpense);
addExpense.addEventListener('click',deleteExpense);
addExpense.addEventListener('click',editExpense);

async function AddExpense(event){

  try {
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
  const items  = await axios.post('https://crudcrud.com/api/d9dc3f37615048b4861fc65778f07d6f/track',obj);
   showItems(items.data);

}
  } catch (error) {
     throw Error(error);
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
   try {
    const  items  = await axios.get('https://crudcrud.com/api/d9dc3f37615048b4861fc65778f07d6f/track')
      items.data.map((ele)=>{
        showItems(ele);
      })
     
   } catch (error) {
     throw Error(error);
   }
    
})

async function deleteExpense(event){
   try {
    if(event.target.classList.contains('delete')){
      const id = event.target.parentElement.id;
    await axios.delete(`https://crudcrud.com/api/d9dc3f37615048b4861fc65778f07d6f/track/${id}`)
       addExpense.removeChild(event.target.parentElement);
   }
   } catch (error) {
     throw Error(error);
   }
  
}

async function editExpense(event){
  try {
    if(event.target.classList.contains('edit')){
      const id = event.target.parentElement.id;

     const item = await axios.get(`https://crudcrud.com/api/d9dc3f37615048b4861fc65778f07d6f/track/${id}`)
    
        expense.value=item.data.expense
        category.value = item.data.category
        description.value = item.data.description
   
      
   await axios.delete(`https://crudcrud.com/api/d9dc3f37615048b4861fc65778f07d6f/track/${id}`)
    addExpense.removeChild(event.target.parentElement);

   }
  } catch (error) {
    throw Error(error);
  }
    
}


