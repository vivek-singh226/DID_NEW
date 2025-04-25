import React, { useEffect, useState } from 'react';
import Weather from './weather';
import Calender from './calender.jsx';
import './News.css';
import userImg from '../src/assets/images/user.jpg';
import noImg from '../src/assets/images/no-img.png';
import blogImg1 from'../src/assets/images/blog1.jpg';
import blogImg2 from'../src/assets/images/blog2.jpg';
import blogImg3 from'../src/assets/images/blog3.jpg';
import blogImg4 from'../src/assets/images/blog4.jpg';
import axios from 'axios';
import NewsModal from './NewsModal';
import Bookmarks from './Bookmarks'
import logo from '../src/assets/images/logo.jpeg';



const categories = [
  "general",
  "world",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
  "nation",
];

const News = ({onShowBlogs}) => {
  const [headline, setHeadline] = useState(null);
  const [news, setNews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const[searchInput,setSearchInput]= useState('')
  const[searchQuery,setSearchQuery]= useState('')
  const[showModal,setShowModal]= useState(false)
  const[selectedArticle,setSelectedArticle]= useState(null)
  const[bookmarks, setBookmarks] = useState([])
  const[showBookmarkModal, setShowBookmmarksModal] = useState(false)

 
  useEffect(() => {
    const fetchNews = async () => {
      
        // let url = `https://gnews.io/api/v4/top-headlines?apikey=bb8f1dbf027e9dc60ce85a565ea1aae3&category=${selectedCategory}&lang=en`; //shahil api
      let url = `https://gnews.io/api/v4/top-headlines?apikey=126d08b2c7e73d6f0944b69841db4e0e&category=${selectedCategory}&lang=en`; //vivek api

      if(searchQuery){
        url =`https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=126d08b2c7e73d6f0944b69841db4e0e` //vivek search endpoints 
        // url =`https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=bb8f1dbf027e9dc60ce85a565ea1aae3` //shahil search endpoints
      }
      
      const response = await axios.get(url);
        const fetchedNews = response.data.articles || [];

        
        fetchedNews.forEach((article) => {
          if (!article.image) {
            article.image = noImg;
          }
        });

        setHeadline(fetchedNews[0]);
        setNews(fetchedNews.slice(1, 7)); 

        const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [] 
        setBookmarks(savedBookmarks)
      
        console.log(news);
    };

    fetchNews();
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const handleSearch = (e) =>{
    e.preventDefault()
    setSearchQuery(searchInput)
    setSearchInput('')
  }

  const handleArticleClick =(article) =>{setSelectedArticle(article)
    setShowModal(true)

    console.log(article)
  }

 const handleBookmarkClick =(article)=>{
  setBookmarks((prevBookmarks) => {
    const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title) ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title):[...prevBookmarks, article]
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks)) 
    return updatedBookmarks
  })
 }

  return (
    <div className="news">
      <header className="news-header">
        <div className='head'>
        <h1 className="logo">D<span className="red">i</span>D</h1>
          <div className='home'>Home</div>
          <div className='about'>About Us</div>
          <div className='contact'> Contact Us</div>
        </div>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input type="text" placeholder="Search News..." value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/>
            <button type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </header>
      <div className="news-content">
        <div className="navbar">
          <div className="user" onClick={onShowBlogs} >
            <img src={userImg} alt="User" />
            <p>Vivek's Blogs</p>
          </div>
          <nav className="categories">
            <h1 className="nav-heading">Categories</h1>
            <div className="nav-links">
              {categories.map((category) => (
                <a
                  href="#"
                  key={category}
                  className="nav-link"
                  onClick={(e) => handleCategoryClick(e, category)}
                >
                  {category}
                </a>
              ))}
              <a href="#" className="nav-link" onClick={() => setShowBookmmarksModal(true)}>
                Bookmark <i className="fa-regular fa-bookmark"></i>
              </a>
            </div>
          </nav>
        </div>
        <div className="news-section">
          {headline && (
            <div className="headline" onClick={()=> handleArticleClick(headline)}>
              <img src={headline.image || noImg} alt={headline.title ||"No image" } />
              <h2 className="headline-title">
                {headline.title}
                <i className={`${bookmarks.some((bookmark) => 
                bookmark.title === headline.title) 
                  ? "fa-solid"
                  : "fa-regular"
                  } fa-bookmark bookmark`} 
                  onClick={(e) =>{
                    e.stopPropagation();
                    handleBookmarkClick(headline);
                 }}
                  ></i>
              </h2>
            </div>
          )}
          <div className="news-grid">
            {news.map((article, index) => (
              <div key={index} className="news-grid-item" onClick={()=> handleArticleClick(article)}>
                <img src={article.image || noImg} alt={article.title} />
                <h3>
                  {article.title}
                  <i className={`${bookmarks.some((bookmark) => 
                  bookmark.title === article.title) 
                  ? "fa-solid" 
                  : "fa-regular"
                  } fa-bookmark bookmark`} 
                  onClick={(e) =>{
                    e.stopPropagation();
                    handleBookmarkClick(article);
                 }}
                  ></i>
                </h3>
              </div>
            ))}
          </div>
        </div>
        <NewsModal show={showModal} article={selectedArticle} onClose={()=>setShowModal(false)} />
          <Bookmarks 
          show={showBookmarkModal} 
          bookmarks={bookmarks} 
          onClose={() =>setShowBookmmarksModal(false)} 
          onSelectArticle={handleArticleClick} 
          onDeleteBookmark={handleBookmarkClick}  
          />
        <div className="my-blogs">
          <h1 className="my-blogs-heading">My Blogs</h1>
          <div className="blog-posts">
            <div className="blog-post">
              <img src={blogImg1} alt="Post Image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImg2} alt="Post Image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImg3} alt="Post Image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
            <div className="blog-post">
              <img src={blogImg4} alt="Post Image" />
              <h3>Lorem ipsum dolor sit.</h3>
              <div className="post-buttons">
                <button className="edit-post">
                  <i className="bx bxs-edit"></i>
                </button>
                <button className="delete-post">
                  <i className="bx bxs-x-circle"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="weather-calender">
          <Weather />
          <Calender />
        </div>
      </div>
      <footer className="news-footer">
        <p>this website is maintained for only learning purpose</p>
        <p>&copy;Vivek Singh </p>
      </footer>
    </div>
  );
};



export default News;
