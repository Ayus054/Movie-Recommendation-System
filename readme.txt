# 🎬 Movie Recommendation System

A full-stack Movie Recommendation Web App that suggests 5 similar movies when a user inputs a movie title. It uses content-based filtering (cosine similarity on movie metadata) and displays movie posters dynamically using TMDB.

## 🔧 Features

- 🧠 Content-based recommendation using cosine similarity
- 🎥 Movie posters with titles in a Tailwind CSS-styled UI
- 🌐 Built with Node.js, Express, EJS
- 🐍 Python backend to compute and return recommendations
- 📦 TMDB API integration to fetch poster URLs

---

## 📁 Project Structure
├── index.js # Main Express server
├── movierecommendationsystem.py # Python script for recommendation
├── movie-recommendation-system
  └── views/
    └── index.ejs # Frontend HTML (EJS)
  └── movies.jason # Movie metadata (title, id, etc.)
  └── similarity.jason # Precomputed cosine similarity matrix
  └── package.json
  └── README.md

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ayus054/Movie-Recommendation-System.git
cd Movie-Recommendation-System

### 2. Install Node dependencies
```bash
npm install
### 3. Set up Python environment and install dependencies
```bash
Copy
Edit
pip install -r requirements.txt
requirements.txt:
pandas
scikit-learn
numpy

### 4. Run the movierecommendationsystem.py to generate the similarity.json file
### 6. Screenshot
![Screenshot](https://raw.githubusercontent.com/Ayus054/Movie-Recommendation-System/main/Screenshot%20(63).png)



