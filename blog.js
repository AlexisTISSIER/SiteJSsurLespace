document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('article-form');
    const articlesList = document.getElementById('articles-list');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        saveArticle(title, content);
        displayArticles();
        
        form.reset();
    });

    function saveArticle(title, content) {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles.push({ title, content });
        localStorage.setItem('articles', JSON.stringify(articles));
    }

    function displayArticles() {
        articlesList.innerHTML = '';

        let articles = JSON.parse(localStorage.getItem('articles')) || [];

        articles.forEach(function (article, index) {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('article');
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
                <button onclick="deleteArticle(${index})">Supprimer</button>
            `;
            articlesList.appendChild(articleDiv);
        });
    }

    function deleteArticle(index) {
        let articles = JSON.parse(localStorage.getItem('articles')) || [];
        articles.splice(index, 1);
        localStorage.setItem('articles', JSON.stringify(articles));
        displayArticles();
    }
    displayArticles();
});