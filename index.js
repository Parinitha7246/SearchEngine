const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// In-memory storage and index
let articles = [];
let index = {};

// Load articles from file if persistence is needed
const loadArticles = () => {
    if (fs.existsSync('articles.json')) {
        articles = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
        buildIndex();
    }
};

// Save articles to file
const saveArticles = () => {
    fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
};

// Build index for quick search
const buildIndex = () => {
    index = {};
    articles.forEach((article, i) => {
        const words = `${article.title} ${article.content}`.toLowerCase().split(/\W+/);
        words.forEach(word => {
            if (!index[word]) index[word] = [];
            index[word].push(i);
        });
    });
};

// API: Add Article
app.post('/articles', (req, res) => {
    const { title, content, tags } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const article = { id: uuidv4(), title, content, tags: tags || [], createdAt: new Date() };
    articles.push(article);

    saveArticles();
    buildIndex();

    res.status(201).json(article);
});

// API: Search Articles
app.get('/articles/search', (req, res) => {
    const { query, sort } = req.query;

    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const queryWords = query.toLowerCase().split(/\W+/);
    const resultScores = {};

    queryWords.forEach(word => {
        (index[word] || []).forEach(idx => {
            resultScores[idx] = (resultScores[idx] || 0) + 1;
        });
    });

    const results = Object.keys(resultScores)
        .map(idx => ({
            ...articles[idx],
            relevance: resultScores[idx],
        }))
        .sort((a, b) => {
            if (sort === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
            return b.relevance - a.relevance;
        });

    res.json(results);
});

// API: Get Article by ID
app.get('/articles/:id', (req, res) => {
    const { id } = req.params;
    const article = articles.find(a => a.id === id);

    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }

    res.json(article);
});

// Start server and load data
app.listen(PORT, () => {
    loadArticles();
    console.log(`Server is running on http://localhost:${PORT}`);
});
