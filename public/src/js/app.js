 const timer = document.querySelectorAll('.exchange-time');
 const body = document.querySelector('body')
 const darkModeBtn = document.querySelectorAll('.dark-mode-icon')
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
darkModeBtn.forEach(btn =>{
  btn.addEventListener('click', localToCheck)
})
}

darkModeChange()


let exchangeTable = document.querySelectorAll('.exchange-information');

API = 'https://json-server-for-for-vercel.vercel.app'


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





const select = document.querySelectorAll("select");

const input = document.querySelectorAll("input");

input[0].addEventListener('change', function(e){
  
})
const apiUrl = "http://localhost:4444/rates";
let html = "";

function currency() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
     
      const arrKeys = Object.keys(data[0].conversion_rates);
      const rates = data[0].conversion_rates;
      
      arrKeys.forEach(item => {
          html += `<option  value=${item}>${item}</option>`;
        });          
      for (let i = 0; i < select.length; i++) {
        select[i].innerHTML = html;
      }

      input[0].addEventListener("keyup", () => {
        const result = input[0].value * rates[`${select[2].value}`] / rates[`${select[1].value}`];
        input[1].value = result.toFixed(2);
      });
      input[1].addEventListener("keyup", () =>{
        const result = input[1].value * rates[`${select[1].value}`] / rates[`${select[2].value}`];
        input[0].value = result.toFixed(2);
      });
      select[0].addEventListener("change", () => {
        const result = input[0].value * rates[`${select[2].value}`] / rates[`${select[1].value}`];
        input[1].value = result.toFixed(2);
      });
      select[1].addEventListener("change", () =>  {
        const result = input[1].value * rates[`${select[1].value}`] / rates[`${select[2].value}`];
        input[0].value = result.toFixed(2);
      });
      
    })
    .catch(err => console.error(err));
}

currency();



