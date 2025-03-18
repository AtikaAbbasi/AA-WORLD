
document.addEventListener("DOMContentLoaded", () => {
    const hearts = document.querySelectorAll(".heart-icon");

    hearts.forEach(heart => {
        heart.addEventListener("click", () => {
            heart.classList.toggle("active");
            heart.classList.toggle("far");
            heart.classList.toggle("fas");
        });
    });
});



// .....................SEARCH--FILTER...................... //





document?.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const categoryFilter = document.getElementById("categoryFilter");
    const blogItems = document.querySelectorAll(".blog-item");

    function filterBlogs() {
        const searchValue = searchInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value;

        blogItems.forEach(item => {
            const title = item.querySelector(".card-title").innerText.toLowerCase();
            const category = item.getAttribute("data-category");

            if (
                (title.includes(searchValue) || searchValue === "") &&
                (category === selectedCategory || selectedCategory === "all")
            ) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    }

    searchInput?.addEventListener("input", filterBlogs);
    categoryFilter?.addEventListener("change", filterBlogs);
});
