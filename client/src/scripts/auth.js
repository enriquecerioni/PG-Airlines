const singInUp= document.querySelector('#sing-up');



singInUp.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    const email = singInUp['singup-email'].value
    const password = singInUp['singup-password'].value

    console.log(email,password)
})