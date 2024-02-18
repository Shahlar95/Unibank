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