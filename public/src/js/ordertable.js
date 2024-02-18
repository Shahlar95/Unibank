const body = document.querySelector('body')
const darkModeBtn = document.querySelector('.dark-mode-icon')
 const local = localStorage.getItem('mode') || null;

function darkModeChange(){
    function darkMode() {
  
  
      body.classList.add('dark')
      localStorage.setItem('mode', 'dark')
  
  
  }
  
  function lightMode() {
      body.classList.remove('dark')
      localStorage.setItem('mode', '')
  }
  
  const localToCheck = () => {
      const local = localStorage.getItem('mode') || null
  
      if (!local) {
          darkMode()
  
      } else {
          lightMode()
      }
  }
  
  
  if (local) {
      darkMode()
  }
  darkModeBtn.addEventListener('click', localToCheck)
  }
darkModeChange()



async function orderTableUi(){
    const tableBody = document.querySelector('.order-table-body')
    let writer = ''
    const API = 'http://localhost:4444/order'
    try {
        const res = await fetch(API);
        if (!res.ok) {
            throw new Error("Response problem");
        }
        const data = await res.json();
        data.forEach(item => {
            writer +=`
            <tr id=${item.id}>
            <th scope="row">${item.id}</th>
            <td>${item.name}</td>
            <td>${item.pinkod}</td>
            <td>${item.mobile}</td>
            <td>${item.work}</td>
            <td>${item.revenue}</td>
            <td class='delete-order'><i class="fa-solid fa-trash-can"></i></td>
          </tr>
            `

        });
        tableBody.innerHTML = writer
    }
    catch (error) {
        console.log(error);
    }  
}
orderTableUi()




async function deleteOrderPost(id){
    const API = 'http://localhost:4444/order'
    
    fetch( `${API}/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.text()) 
      .then(res => console.log(res))
   
}

setTimeout(() => {
    const deleteOrder = document.querySelectorAll('.delete-order');
    deleteOrder.forEach(item => {
        item.addEventListener('click', function() {
          
           let confirmDelete = confirm("Bu sifarişi silmək istəyirsiz?")
           const cardId = item.parentElement.id;
           
            if (confirmDelete == true)  {
                
                deleteOrderPost(cardId)
            }
           
        });
    });
}, 1000);