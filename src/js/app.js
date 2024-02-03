 const timer = document.querySelectorAll('.exchange-time');
 const body = document.querySelector('body')
 const darkModeBtn = document.querySelector('.dark-mode-icon')
 const local = localStorage.getItem('mode') || null;
 

var swiper = new Swiper(".Shahlar", {
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });


  timer.forEach(elem =>{
    const time = new Date()
    elem.innerHTML += `<span>${time.toLocaleDateString()}</span>`
  
  })

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


let exchangeTable = document.querySelectorAll('.exchange-information');

API = 'http://localhost:4444'


async function moneyUi (){
  const res = await fetch(`${API}/currency`)
  const data = await res.json()
  let writer = ''

  data.forEach(item =>{
    writer += `
   
      <tr>
        <td>${item.title}</td>
        <td>${item.buy} <i class="fa-solid fa-angle-up"></i></td>
        <td>${item.sell} <i class="fa-solid fa-angle-down"></i></td>
      </tr>
  
    
    `
  })
  
  exchangeTable.forEach(element =>{
    element.innerHTML = writer
  })
}
moneyUi()


// const leftInput = document.querySelector('.calculator-left input')
// const rightInput = document.querySelector('.calculator-right input')







// async function currency() {
//   const select = document.querySelectorAll("select");
// const input = document.querySelectorAll("input");
// const apiUrl = "http://localhost:4444/rates";
//   const res = await fetch(apiUrl)
//   const data = await res.json()
//   const arrKeys = Object.keys(data.conversion_rates);
//   let html = "";
//         const rates = data.conversion_rates;
    
        
//         arrKeys.forEach(item => {
//             html += `<option  value=${item}>${item}</option>`;
//           });          
//         for (let i = 0; i < select.length; i++) {
//           select[i].innerHTML = html;
//         }
  
//         function convert(i, j) {

//            input[i].value = (input[j].value * rates[select[i].value]) / rates[select[j].value];

//            value1 =  input[i].value;
//            value2 =  input[j].value;
//            console.log(rates[select[i].value]);
           

//             if(value1 == 0 || value2 == 0 ){
               
//                 input[i].value = '';
//                 input[j].value = '';
               
//             }
           
         
//         }
      
      
  
//         input[0].addEventListener("keyup", () => convert(1, 0));
//         input[1].addEventListener("keyup", () => convert(0, 1));
//         select[0].addEventListener("change", () => convert(1, 0));
//         select[1].addEventListener("change", () => convert(0, 1));
//       }
//      const selectLeft = document.querySelector('#currency-one')
//      const selectRight = document.querySelector('#currency-two')
//      const inputLeft = document.querySelector('#amount-one');
//      const inputRight = document.querySelector('#amount-two')
// async function currency() {
//   const res = await fetch(apiUrl);
//   const data = await res.json();
//   const rates = data.conversion_rates;

//   const arrKeys = Object.keys(data.conversion_rates);
//     let html = "";
      
        
          
//           arrKeys.forEach(item => {
//               html += `<option  value=${item}>${item}</option>`;
//             });          
//           for (let i = 0; i < select.length; i++) {
//             select[i].innerHTML = html;
//           }
//   function convert(i, j) {
     
//       const rateFromUSD = rates[select[i].value];
     
//       input[j].value = input[i].value * rateFromUSD / rates[select[j].value];

     
//       if (input[i].value === 0 || input[j].value === 0) {
//           input[i].value = '';
//           input[j].value = '';
//       }
//   }

//   // Dönüşüm fonksiyonlarını etkinleştirin
//   input[0].addEventListener("keyup", () => convert(0, 1));
//   input[1].addEventListener("keyup", () => convert(1, 0));
//   select[0].addEventListener("change", () => convert(0, 1));
//   select[1].addEventListener("change", () => convert(1, 0));
// }

  

// currency();

 async function newsUi(){
  const Cards = document.querySelector('#cards')

  let writer = ''
   const API = 'http://localhost:4444/news'

   try {
    const res = await fetch(API)
    if (!res.ok) {
      throw console.log('Response not okay');
    }
    const data = await res.json()
    data.slice(0,3).forEach(item =>{
      writer += `
      <div id="${item.id}" class="col-lg-4">
      <div class="inner">
          <h3 class="news-header">
             ${item.title}
          </h3>
          <p class="news-text">
          ${item.body.slice(0,250)}
          </p>
          <p class="news-date">16.01.2024</p>
      </div>
  </div>
      `
    })

    Cards.innerHTML = writer
   

   } catch (error) {
      console.log(error);
   }  
}
newsUi()