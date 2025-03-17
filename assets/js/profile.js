import { auth,
    signOut ,
    updatePassword,
 } from "../../config.js";

 let _signout = document.getElementById('SignOut')

_signout.addEventListener('click' , () => {

    signOut(auth)

    alert("Logout")
});



// ///   updata password



//let upass = document.getElementById("upass").value



let upbtn = document.getElementById("uppass")

upbtn.addEventListener("click" ,async() =>{
try {
    
    let user = auth.currentUser
    let newpass = document.getElementById("upass").value
    await   updatePassword(user , newpass)
    alert("password updated")
} catch (error) {
    console.log(error);
    
}
} )