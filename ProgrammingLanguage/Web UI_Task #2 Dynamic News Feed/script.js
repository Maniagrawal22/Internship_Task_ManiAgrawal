document.addEventListener("DOMContentLoaded", () => {
  const articles = [];
  const articlesPerPage = 4;
  let currentPage = 1;

  const form = document.getElementById("add-article-form");
  const articlesGrid = document.getElementById("articles-grid");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const pageNumbers = document.getElementById("page-numbers");

  // Function to render articles
  const renderArticles = () => {
    articlesGrid.innerHTML = "";
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    const currentArticles = articles.slice(start, end);

    currentArticles.forEach(article => {
      const articleDiv = document.createElement("div");
      articleDiv.className = "article";
      articleDiv.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        ${article.image ? `<img src="${article.image}" alt="${article.title}">` : ""}
      `;
      articlesGrid.appendChild(articleDiv);
    });

    renderPagination();
  };

  // Function to render pagination
  const renderPagination = () => {
    pageNumbers.innerHTML = "";
    const totalPages = Math.ceil(articles.length / articlesPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement("button");
      pageBtn.textContent = i;
      pageBtn.className = i === currentPage ? "active" : "";
      pageBtn.addEventListener("click", () => {
        currentPage = i;
        renderArticles();
      });
      pageNumbers.appendChild(pageBtn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  };

  // Event listener for Previous button
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderArticles();
    }
  });

  // Event listener for Next button
  nextBtn.addEventListener("click", () => {
    if (currentPage < Math.ceil(articles.length / articlesPerPage)) {
      currentPage++;
      renderArticles();
    }
  });

  // Event listener for form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const imageUrl = document.getElementById("image-url").value.trim();

    if (title && description) {
      articles.push({ title, description, image: imageUrl });
      form.reset();
      renderArticles();
    } else {
      alert("Title and description are required!");
    }
  });
});