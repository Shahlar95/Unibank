    const submitOrder = document.querySelector('.order-submit-btn');
    const orderForm = document.querySelector('.order-form')


async function addOrderPsot(){
    const orderFullName = document.querySelector('.fullname').value;
    const pinkod = document.querySelector('.pinkod').value;
    const numberMobile = document.querySelector('.mobil-number').value;
    const workPlace = document.querySelector('.work').value;
    const profit = document.querySelector('.profit').value;
    try{
        const res = await fetch("http://localhost:4444/order", {
            method: "POST",
            body: JSON.stringify({
                name: orderFullName,
                pinkod: pinkod,
                mobile: numberMobile,
                work: workPlace,
                revenue: profit
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = res.json()
       
    } catch(error){
        console.log("Error:", error);
    }
   
}
orderForm.addEventListener('submit', function(e){
    const checkLegal = document.querySelector('#order-legal');
    if (checkLegal.checked) {
        submitOrder.disabled = false
        e.preventDefault()
        addOrderPsot()
        
    }
   
   
})


function customValidation(){
   
    const allInput = document.querySelectorAll('.order-input input')
    
    allInput.forEach(item => {
        item.addEventListener('input', function(){
            if (item.value == "") {
                
                
                item.parentElement.classList.add('empty')
                
            }else{
                item.parentElement.classList.remove('empty')
    
        
            }
        })
    })

   
   
}

customValidation()