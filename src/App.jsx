import React from 'react'
import News from './News'
import Blogs from './blogs'

const App = () => {
  const[showNews, setShowNews] = React.useState(true)
  const[showBlogs, setShowBlogs] = React.useState(false)
  const[blogs, setBlogs]= useState([])

  const handleCreateBlog =(newBlog)=> {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog])
  }

  const handleShowBlogs =() =>{
    setShowNews(false)
    setShowBlogs(true)
  }

  const handleBackToNews =() =>{
    setShowNews(true)
    setShowBlogs(false)
  }
  return (
    <div className='container'>
      <div className='did-app'>
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlogs && <Blogs onBack={handleBackToNews} onCreateBlog={handleCreateBlog} />}
      </div>
      </div>
  )
}

export default App