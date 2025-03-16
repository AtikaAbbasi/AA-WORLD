import { 
    db,
    onSnapshot,
    query,
    collection,
} from "../../config.js";

let blogs = []; 
let currentPage = 1;
const blogsPerPage = 3;

let Allblogs = () => {
    let cardref = query(collection(db, "blogs"));
    onSnapshot(cardref, (cardquery) => {
        blogs = [];
        cardquery.forEach((carddata) => {
            let blogData = { id: carddata.id, ...carddata.data() };
            blogs.push(blogData);
        });

        displayBlogs(); 
    });
};

function displayBlogs() {
    let cards = document.getElementById("blogs-cards");
    if (!cards) return; 

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
                    <p>${card.text}</p>
                </div>
            </div>
        `;
    });

    updateButtons(); 
}

function updateButtons() {
    let prevBtn = document.getElementById("prevBtn");
    let nextBtn = document.getElementById("nextBtn");

    if (!prevBtn || !nextBtn) return; 

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage * blogsPerPage >= blogs.length;
}

document.getElementById("prevBtn")?.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayBlogs();
    }
});

document.getElementById("nextBtn")?.addEventListener("click", () => {
    if (currentPage * blogsPerPage < blogs.length) {
        currentPage++;
        displayBlogs();
    }
});

Allblogs();