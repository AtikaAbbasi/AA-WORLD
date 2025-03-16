import { db, collection, query, where, getDocs } from "../../config.js"

const blogContainer = document.querySelector(".motivation-container"); 


async function fetchTravelBlogs() {
    try {
        const q = query(collection(db, "blogs"), where("category", "==", "books")); 
        const querySnapshot = await getDocs(q);
        
        blogContainer.innerHTML = ""; 

        if (querySnapshot.empty) {
            blogContainer.innerHTML = "<p>No travel blogs found.</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const blog = doc.data();
            const blogCard = `
                <div class="motivation-card">
                    <div class="image-box">
                        <img src="${blog.image}" alt="Blog Image">
                    </div>
                    <div class="text-box">
                     <h3><span class="authorspan"> Author </span>: ${blog.author}</h3>
                        <h3>${blog.topic}</h3>
                         <h3  class="head">${blog.category}</h3>
                        <p>${blog.text}</p>
                        
                    </div>
                </div>
            `;
            blogContainer.innerHTML += blogCard;
        });
    } catch (error) {
        console.error("Error fetching travel blogs:", error);
    }
}

// Call function when page loads
fetchTravelBlogs();