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


async function partnerUi(){
    const cards = document.querySelector('#companies-cards');
    const select = document.querySelector('#category-names');
    const input = document.querySelector('.filter')

    const categoryArr = []
   
    let writer = ''
    let writer2 = ' <option>Bütün</option>'
    const API = 'http://localhost:4444/partnerships'
    try {
        const res = await fetch(API);
        if (!res.ok) {
            throw new Error("Response problem");
        }
        const data = await res.json();
        data.forEach(item =>{
          
            if(!categoryArr.includes(item.category)){
                categoryArr.push(item.category)
                writer2 += `
           
                <option>${item.category}</option>`
            }
           
        })
        data.forEach(item => {
            writer +=`
             
            <div class="col-lg-3 p-0">
            <div class='partner-card' id=${item.id}>
            <div class="inner">
            <div class="img">
                <img src=${item.imgUrl} alt="image">
            </div>
            <h2 class="company-name">${item.name}</h2>
            <h3 class="company-category">${item.category}</h3>
            <div class="credit-months">
                <div class='month-text'><span class='month-numb'>${item.kredit[0]} </span><span>0%</span></div>
                <div class='month-text'><span class='month-numb'>${item.kredit[1]}</span><span>0%</span></div>
                <div class='month-text'><span class='month-numb'>${item.kredit[2]}</span><span>0%</span></div>
                <div class='month-text'><span class='month-numb'>${item.kredit[3]}</span> <span>0%</span></div>
                <div class='month-text'><span class='month-numb'>${item.kredit[4]}</span> <span>0%</span></div>
            </div>
            <div  class='cashback'>
               <div class='cashback-border'><p>və ya</p></div>
                <div class="cashback-percent">
                    <div class="icon">
                    <p><i class="fa-solid fa-rotate-left"></i></p>
                       <span> Keşbək</span>
                    </div>
                    <div class="percent">
                       ${item.cashbackPercent}
                    </div>
                </div>
            </div>
        </div>
            </div>
           
        </div>
           
            `
          
        });

        cards.innerHTML = writer;
        select.innerHTML = writer2
    }
    catch (error) {
        console.log(error);
    }  
}
partnerUi()



setTimeout(() => {
        const cashback = document.querySelectorAll('.cashback')
        const cashbackMonth = document.querySelectorAll('.month-text')

        cashback.forEach(element =>{
        const percent = element.querySelector('.percent')
        
            if (percent.textContent.trim() == "0") {
                element.style.display = 'none'

            }
            else{
                element.style.display = 'block'

            }
            

        })
        
        cashbackMonth.forEach(item => {
            
            if (item.firstElementChild.textContent == 'undefined') {
                item.style.display = 'none'
            }
            
        })
    const select = document.querySelector('#category-names')
    const cards = document.querySelectorAll('.partner-card')
    let cardsArr = Array.from(document.querySelectorAll('.partner-card'))
    const cardsCommon= document.querySelector('#companies-cards');

    let newData = []
        select.addEventListener('change', function(){
            newData = []
             
            cards.forEach(item =>{
                const category = item.querySelector('.company-category')
                    
                 
             if (select.value.trim().toLocaleLowerCase() == category.textContent.trim().toLocaleLowerCase()
                || select.value.trim().toLocaleLowerCase() == 'bütün'
            ){
                        item.classList.remove('select')
                        newData.push(item.parentElement)
                        cardsArr.forEach(card => {
                            card.parentElement.remove()
                        });
                        
                       newData.forEach(card=>{
                        cardsCommon.appendChild(card)
                       })
                       cardsArr = Array.from(document.querySelectorAll('.partner-card'))
                    }
                    else{
                        item.classList.add('select')
                      
                       

                    }
                })
           
        })
        const input = document.querySelector('.filter');
        let filterArr = [];
        
        input.addEventListener('input', function(e){
            const filterValue = e.target.value.toLocaleLowerCase();
            filterArr = []; 
            cards.forEach(item => {
                const name = item.querySelector('.company-name').textContent.trim().toLocaleLowerCase();
                const category = item.querySelector('.company-category').textContent.trim().toLocaleLowerCase();
                
                if (name.indexOf(filterValue) !== -1 || category.indexOf(filterValue) !== -1 || filterValue == "") {
                    item.classList.remove('select');
                    filterArr.push(item.parentElement); 
                } else {
                    item.classList.add('select');
                }
            });
        
            
            cards.forEach(card => {
                card.parentElement.remove();
            });
        
            
            filterArr.forEach(card => {
                cardsCommon.appendChild(card);
            });
        });
        
        
    

}, 1000);


