import {
    auth,
    onAuthStateChanged,
    db,
    getDoc,
    doc,
    
} from "../../config.js";

let log = document.getElementById("login")
let write = document.querySelector(".add")
let userIcon = document.querySelector(".userIcon")
let profileimg = document.getElementById('pro-img')
onAuthStateChanged(auth, async (user) => {

    if (user) {

        console.log(user);
        

        log.style.display = "none"
        write.style.display = "block"
        userIcon.style.display = "block"



        console.log(user);

        let userid = user.uid
        console.log(userid)

        console.log('successfully logged In');
        console.log("user location", window.location.pathname);

        //getting currnt user
        let currntref =  doc(db, 'users', userid)
        let prouser = await getDoc(currntref)

        if (prouser.exists()) {
            let loguser = prouser.data()
            console.log(loguser);

            let Username = document.getElementById('user-name')
            let email = document.getElementById('user-email')
            let age = document.getElementById('user-age')
            let proimg = document.getElementById('user-img')


            if(Username) Username.value = loguser.username
            if(email) email.innerHTML = loguser.email
            if(age) age.innerHTML = loguser.age
            if(proimg) proimg.src = loguser.showimg

            
        } else {
            console.log('no match found');
            
        }
    }

    else {
        console.log('successfully Signed Out');

        if (window.location?.pathname === '/assets/html/profile.html') {
            // console.log("user location",  window.location.pathname);
            window.location.replace('/')
        }
    }


})


