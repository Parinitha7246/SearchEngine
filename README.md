# **Mini Search Engine for Articles**

## **Overview**
The Mini Search Engine enables users to upload and search articles efficiently. This backend mimics the behavior of a simple search engine by supporting keyword searches and relevance-based sorting.

---

## **Features**
1. **Add Articles**: Users can add articles with a title, content, and tags.
2. **Search Articles**: Search articles by keywords in the title or content.
3. **Sort Results**: Search results can be sorted by **relevance** (based on keyword frequency) or **date** (newest first).
4. **Retrieve Articles by ID**: Fetch the full details of an article using its unique ID.

---

## **Endpoints**
### 1. **Add Article**
- **Method**: `POST`
- **URL**: `/articles`
- **Description**: Add a new article with metadata.
- **Request Body**:
  ```json
  {
      "title": "Article Title",
      "content": "Article Content",
      "tags": ["tag1", "tag2"]
  }
  ```
- **Response**:
  ```json
  {
      "id": "1234-5678-91011",
      "title": "Article Title",
      "content": "Article Content",
      "tags": ["tag1", "tag2"],
      "createdAt": "2024-12-04T12:00:00.000Z"
  }
  ```

---

### 2. **Search Articles**
- **Method**: `GET`
- **URL**: `/articles/search`
- **Description**: Search articles by a keyword or tag.
- **Query Parameters**:
  - `query`: The keyword to search for (required).
  - `sort`: Sorting option (`relevance` or `date`, optional).
- **Response**:
  ```json
  [
      {
          "id": "1234-5678-91011",
          "title": "Matching Article",
          "content": "Content with matching keyword",
          "tags": ["tag1", "tag2"],
          "createdAt": "2024-12-04T12:00:00.000Z",
          "relevance": 2
      }
  ]
  ```

---

### 3. **Get Article by ID**
- **Method**: `GET`
- **URL**: `/articles/:id`
- **Description**: Retrieve full article details by its ID.
- **Response**:
  ```json
  {
      "id": "1234-5678-91011",
      "title": "Article Title",
      "content": "Article Content",
      "tags": ["tag1", "tag2"],
      "createdAt": "2024-12-04T12:00:00.000Z"
  }
  ```

---

## **Solution Design**
### **Storage**
- Articles are stored in an in-memory array for quick access and manipulation.
- Articles have the following structure:
  ```json
  {
      "id": "unique-identifier",
      "title": "Article Title",
      "content": "Article Content",
      "tags": ["tag1", "tag2"],
      "createdAt": "timestamp"
  }
  ```

### **Search Logic**
1. Articles are filtered based on keywords in the `title` or `content`.
2. Results can be sorted by:
   - **Relevance**: Number of occurrences of the keyword in the article.
   - **Date**: Newer articles appear first.

### **Optional Persistence**
- The application can be enhanced to use the `fs` module to persist articles to a file for long-term storage.

---

## **Installation and Usage**

### **Prerequisites**
- Node.js (version 14 or higher).

### **Installation Steps**
1. Clone this repository:
   ```bash
   git clone https://github.com/Parinitha7246/SearchEngine
   cd SearchEngine
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node index.js
   ```
4. Access the API on `http://localhost:3000`.

---

## **Usage Examples**

### **Add an Article**
```bash
curl -X POST http://localhost:3000/articles \
-H "Content-Type: application/json" \
-d '{
    "title": "Learning Node.js",
    "content": "Node.js is a runtime environment for JavaScript.",
    "tags": ["nodejs", "javascript"]
}'
```

### **Search Articles**
```bash
curl -X GET "http://localhost:3000/articles/search?query=nodejs&sort=relevance"
```

### **Get an Article by ID**
```bash
curl -X GET "http://localhost:3000/articles/1234-5678-91011"
```

---

## **Project Structure**
```
mini-search-engine/
├── index.js         # Main server file
├── package.json     # Project metadata and dependencies
└── README.md        # Documentation
```

---

## **Future Enhancements**
1. Add **file-based persistence** using the `fs` module.
2. Implement **pagination** for large datasets.
3. Integrate with a database like MongoDB or PostgreSQL for scalability.
4. Add **user authentication** for managing articles securely.

---

## **Contributing**
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Submit a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
