const showDropdown = (content, button) =>{
    const dropdownContent = document.getElementById(content),
          dropdownButton = document.getElementById(button)
 
    dropdownButton.addEventListener('click', () =>{
       dropdownContent.classList.toggle('show-dropdown')
    })
 }
 
 showDropdown('dropdown-content','dropdown-button')