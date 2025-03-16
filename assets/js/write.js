
import { 
    db,
    addDoc,
collection,
serverTimestamp,

} from "../../config.js";


let publisingblog = async (e) =>{
e.preventDefault()

//

let author = document.getElementById("Author").value ;
let topic = document.getElementById("topic").value ;
let option = document.getElementById("opt").value ;
let text = document.getElementById("blogtext").value ;

//image  //cloudinary

let file = document.getElementById('image')
let img = file.files[0]

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
        

let dis = await addDoc(collection(db, 'blogs'),{

author:  author,
topic: topic,
text:  text,
category :option,
image : secureImg,

})

   console.log("blog added " ,dis.id);
   alert("done")
   


    } catch (error) {
        console.log(error);
        
    }


}


let pub = document.getElementById('publish-blog').addEventListener('submit' , publisingblog)
