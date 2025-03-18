

import { 
    db,
    updateDoc,
    deleteDoc,
    onSnapshot,
    query,
    collection,
    getDocs,
    doc
} from "../../config.js";

let blogs = []; 
let currentPage = 1;
const blogsPerPage = 3;


// *All Blogs Fetch Karna*
let Allblogs = () => {
    let cardref = query(collection(db, "blogs"));
    onSnapshot(cardref, (cardquery) => {
        blogs = [];
        cardquery.forEach((carddata) => {
            let blogData = { id: carddata.id, ...carddata.data() };
            blogs.push(blogData);
        });

        displayBlogs();
        displayWishlist();  
    });
};



function displayBlogs() {
    let cards = document.getElementById("blogs-cards");
    cards.innerHTML = "";

    let start = (currentPage - 1) * blogsPerPage;
    let end = start + blogsPerPage;
    let paginatedBlogs = blogs.slice(start, end);

    paginatedBlogs.forEach((card) => {
        cards.innerHTML += `
            <div class="motivation-card">
                <div class="image-box">
                    <img src="${card.image}" alt="Blog Image">
                </div>
                <div class="text-box">
                    <h2 class="head">${card.topic}</h2>
                    <h3 class="head">${card.category}</h3>
                    <p>${card.text.substring(0, 100)}...</p>
                  
                    <i class="far fa-heart heart-icon" data-id="${card.id}" style="cursor:pointer;"></i>
                </div>
            </div>
        `;
    });

    updateButtons();
    setupLikeButtons();
}


// *..............Wishlist Fetch & Display Karna.....*
async function displayWishlist() {
    const teamContainer = document.querySelector(".team-container");
    teamContainer.innerHTML = "";

    try {
        const querySnapshot = await getDocs(collection(db, "blogs"));
        let wishlistBlogs = [];

        querySnapshot.forEach((doc) => {
            wishlistBlogs.push({ id: doc.id, ...doc.data() });
        });

        // ..................Randomly select 5 blogs..................
        wishlistBlogs = shuffleArray(wishlistBlogs).slice(0, 4);

        wishlistBlogs.forEach((blog) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("team-card");

            blogCard.innerHTML = `
                <img src="${blog.image}" alt="${blog.author}">
                <h3>${blog.author}</h3>
                <p>${blog.category}</p>
              
            `;

            teamContainer.appendChild(blogCard);
        });

        setupLikeButtons();
    } catch (error) {
        console.error("Error fetching wishlist blogs:", error);
    }
}


// *.....................Random Shuffle Function.................*
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}


//................ Like Button Functionality..................
function setupLikeButtons() {
    document.querySelectorAll(".heart-icon").forEach((icon) => {
        icon.addEventListener("click", function () {
            const blogId = this.getAttribute("data-id");
            toggleLike(blogId, this);
        });
    });
}

async function toggleLike(blogId, icon) {
    const blogRef = doc(db, "blogs", blogId);

    try {
        const blogSnap = await getDocs(query(collection(db, "blogs")));
        let blogData = null;

        blogSnap.forEach((doc) => {
            if (doc.id === blogId) {
                blogData = doc.data();
            }
        });

        if (blogData) {
            let likes = blogData.likes || 0;
            let isLiked = icon.classList.contains("fas");

            if (isLiked) {
                likes--;
                icon.classList.replace("fas", "far");
            } else {
                likes++;
                icon.classList.replace("far", "fas");
            }

            await updateDoc(blogRef, { likes: likes });
        }
    } catch (error) {
        console.error("Error updating like:", error);
    }
}


// *Pagination Buttons*
function updateButtons() {
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage * blogsPerPage >= blogs.length;
}


document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayBlogs();
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    if (currentPage * blogsPerPage < blogs.length) {
        currentPage++;
        displayBlogs();
    }
});



Allblogs();