const timer = document.querySelectorAll('.exchange-time');


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
    console.log(elem);
  })