import { auth,
    signInWithEmailAndPassword ,
    sendPasswordResetEmail,
     GoogleAuthProvider, signInWithPopup,
    signOut
 } from "../../config.js";


 
//  ..............LOGIN...............//

 
let  logInform =  document.getElementById('log-form')

logInform.addEventListener('submit' , async (e) => {
e.preventDefault()
let email = document.getElementById('email').value
let pass = document.getElementById('password').value

try {
    
    let userCredintial = await signInWithEmailAndPassword(auth, email, pass );
    let user = userCredintial?.user;
    if (user) {
        window.location.replace("/index.html")
    }
    
      console.log(user)
      console.log("user logged In" , email)

} catch (error) {
    console.log('error in sinUp' ,error);
    
}
})

//RESET PASS.........

let fpass = document.getElementById('forgotp')

fpass.addEventListener('click' , async () =>{

try {
    let email = document.getElementById('email').value
      await sendPasswordResetEmail(auth,email)

} catch (error) {
    console.log(error);
    
}

})




/////// GOOGLE PROVIDOR


let loginwithGoogle = document.getElementById('google')


let provider = new  GoogleAuthProvider()
provider.setCustomParameters({prompt : "select_account"})

loginwithGoogle.addEventListener("click" , async () =>{

try {
    
    await signOut(auth)
console.log('user tired to sign In');
let result = await signInWithPopup(auth,provider)


} catch (error) {
    console.log(error ,'mila hai');
    
}


})

