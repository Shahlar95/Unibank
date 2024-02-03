let countNews = 3
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

async function newsUi(){
    const pageNews = document.querySelector('#news-page');
    let writer = '';
    const API = 'http://localhost:4444/news';
    try {
        const res = await fetch(API);
        if (!res.ok) {
            throw new Error("Response problem");
        }
        const data = await res.json();
       
        data.reverse().forEach(item => {
            writer += `
            <div id="${item.id}" class="col-lg-12">
                <div class="inner">
                    <h3 class="news-header">
                    ${item.title}
                    </h3>
                    <p class="news-text">
                    ${item.body.slice(0,250)}
                    </p>
                    <p class="news-date">${item.date}</p>
                    <div class="news-change">
                    <div class="delete-news"><i class="fa-solid fa-trash"></i></div>
                    <div class="update-news">
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal2">
                    <i class="fa-solid fa-pen"></i>
                    </button>
                    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="exampleModalLabel2">Xəbərə düzəliş et</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="form-update" id="news-form-update">
                                <div class="add-news-input">
                                    <label for="news-title-update"-update>Xəbərin başlığı</label>
                                    <input type="text" placeholder="başlıq" id="news-title-update">
                                </div>
                                <div class="add-news-input">
                                    <label for="news-body-update">Xəbərin mətni</label>
                                    <input type="text" placeholder="mətn" id="news-body-update">
                                </div>
                                <div class="add-news-input">
                                    <label for="news-date-update">Xəbərin tarixi</label>
                                    <input type="date" placeholder="tarix" id="news-date-update">
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                              </form>
                        </div>
                      </div>
                    </div>
                  </div>
                    </div>
                    </div>
                </div>
            </div>
            `;
        });
        pageNews.innerHTML = writer;
    } catch (error) {
        console.log(error);
    }  
}

  newsUi()

//   const more = document.querySelector('.more')
//   async function waitForNewsUi() {
//     await newsUi();
//     const pageNewsCount = document.querySelectorAll("#news-page .col-lg-12");
    
//     let counter = 0;
//     let counter2 = 3
//     more.addEventListener('click', function(){
//         counter2 = counter2 + 1
//         uiPagesNews()
//         console.log(counter2);
//     })
//     function uiPagesNews(){
//         pageNewsCount.forEach(item => {
//             if (counter >= counter2) {
//                 item.style.display = 'none'; 
//             }
//             counter++;
           
//         });
//     }
//     uiPagesNews()
  
// }


// waitForNewsUi();

//   more.addEventListener('click', function(){
//       const countNewsMore = data.length - countNews
//       console.log(countNewsMore);
//     //   console.log(countNews);
//       if(countNewsMore > 0){
//         countNews = countNews + 1
       
       
//       }
//       else{
//         more.style.display = 'none'
//       }
//   })





 async function addPosts() {
    const title = document.querySelector('#news-title').value;
    const body = document.querySelector('#news-body').value;
    const date = document.querySelector('#news-date').value;
    
    try{
        const res = await fetch("http://localhost:4444/news", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                body: body,
                date: date
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        const data = res.json()
        newsUi();
    } catch(error){
        console.log("Error:", error);
    }
 }

function addPostSubmit() {
    const form = document.querySelector('#news-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addPosts();
    });
}

addPostSubmit();

async function deletePost(id){
    const API = 'http://localhost:4444/news'
    fetch( `${API}/${id}`, {
        method: 'DELETE',
      })
      .then(res => res.text()) 
      .then(res => console.log(res))
   
}

setTimeout(() => {
    const deleteNews = document.querySelectorAll('.delete-news');
    deleteNews.forEach(item => {
        item.addEventListener('click', function() {
          
           let confirmDelete = confirm("Bu Xəbəri silmək istəyirsiniz?")
           const cardId = item.parentNode.parentNode.parentNode.id;
            if (confirmDelete == true)  {
                
                deletePost(cardId)
            }
           
        });
    });
}, 1000);

async function updateNewsPut(id){
    const title = document.querySelector('#news-title').value;
    const body = document.querySelector('#news-body').value;
    const date = document.querySelector('#news-date').value;

    const API = 'http://localhost:4444/news'
    try {
        const response = await fetch( `${API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: title,
                body: body,
                date: date
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await response.text();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

setTimeout(() => {
    const updateNews = document.querySelectorAll('.update-news');
    const form = document.querySelector('#news-form');
    updateNews.forEach(item =>{
        const cardId = item.parentNode.parentNode.parentNode.id;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // updateNewsPut(cardId)
           
        });
      
    })
    
}, 1000);



