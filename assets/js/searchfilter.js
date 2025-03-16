

import { db, collection, getDocs } from "../../config.js";

// Firebase se sab blogs laane ka function
async function fetchAllBlogs() {
    let blogCollection = collection(db, 'blogs');
    let querySnapshot = await getDocs(blogCollection);
    
    let blogs = [];
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        blogs.push({
            id: doc.id,
            topic: data.topic.toLowerCase(),
            category: data.category.toLowerCase(),
            author: data.author ? data.author.toLowerCase() : "",
            text: data.text,
            image: data.image
        });
    });

    return blogs;
}

// Search aur filter function
async function searchBlogs() {
    let searchTerm = document.getElementById("searchInput").value.toLowerCase();
    let selectedCategory = document.getElementById("categoryFilter").value.toLowerCase();

    let blogs = await fetchAllBlogs();

    let filteredBlogs = blogs.filter(blog => {
        let matchesSearch = searchTerm ? 
            blog.topic.includes(searchTerm) || 
            blog.author.includes(searchTerm) || 
            blog.category.includes(searchTerm) 
            : true;

        let matchesCategory = (selectedCategory === "all" || blog.category === selectedCategory);

        return matchesSearch && matchesCategory;
    });

    displayFilteredBlogs(filteredBlogs);
}

// Function to display filtered blogs
function displayFilteredBlogs(filteredBlogs) {
    let blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = "";

    filteredBlogs.forEach((blog) => {
        blogContainer.innerHTML += `
            <div class="col-md-4 blog-item" data-category="${blog.category}">
                <div class="card">
                    <img src="${blog.image}" class="card-img-top" alt="Blog Image">
                    <div class="card-body">
                        <h5 class="card-title">${blog.topic}</h5>
                        <p class="card-text">${blog.text}</p>
                    </div>
                </div>
            </div>
        `;
    });
}

// Event listeners for search input and category filter
document.getElementById("searchInput").addEventListener("input", searchBlogs);
document.getElementById("categoryFilter").addEventListener("change", searchBlogs);