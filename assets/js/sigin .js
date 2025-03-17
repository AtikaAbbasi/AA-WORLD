import { auth,
    createUserWithEmailAndPassword 
    ,   signInWithEmailAndPassword , 
    // firebasestore
    db,
    doc, setDoc

 } from "../../config.js";


// .........................




let  signUpform =  document.getElementById('signup-form')

signUpform.addEventListener('submit' , async (e) => {
e.preventDefault()
let email = document.getElementById('email').value
let pass = document.getElementById('password').value
let username = document.getElementById('name').value
let age = document.getElementById('age').value

//cloudinary

let file = document.getElementById('proimge')
let img = file.files[0]


let showimg = 'https://i.pinimg.com/736x/df/2a/7a/df2a7ac38b06a090929fff170e4f4d26.jpg'


if (img) {
    const Cloudname = 'dgubeimpp'
    const persetname = 'blog-app'

    let formdata = new FormData()
    formdata.append('file',img)
    formdata.append('upload_preset',persetname)
    formdata.append('cloud_name', Cloudname)

    try {
        const res = await fetch (`https://api.cloudinary.com/v1_1/${Cloudname}/image/upload`, {

            method : 'POST',
            body : formdata
        });

        const data = await res.json();
        let secureImg = data.secure_url
        console.log(secureImg);
        
        
if(secureImg){
showimg = secureImg
}
 } catch (error) {
        console.log(error);
        
    }
} 
    

try {
    
    let userCredintial = await createUserWithEmailAndPassword(auth, email, pass );
    //email verification
    //  await  sendEmailVerification(auth.currentUser)
    let user = userCredintial?.user;
console.log(user.uid);



    const docRef = await setDoc(doc(db, "users",  user.uid),{
        email,
        age,
        username,
        showimg,
        isActive : true,
       });

      alert("Signed In  ✔");
      



if (user) {
    window.location.pathname  = '/index.html'
}


      console.log(user)
      console.log("user signedUP " , email)

} catch (error) {
    console.log('error in sinUp' ,error);
    
}
});





