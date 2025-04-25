import React, { useState } from 'react'
import userImg from '../src/assets/images/user.jpg'
import './Blogs.css'

const Blogs = ({onBack , onCreateBlog}) => {
  const [showForm, setShowForm] = React.useState(false)
  const[image , setImage] = useState(null)
  const[title , setTitle] = useState('')
  const[content , setContent] = useState('')
  return (
    <div className='blogs'>
        <div className='blogs-left'>
            <img src={userImg} alt="User Image" />
        </div>
        <div className="blogs-right">
          {showForm ?( <div className="blogs-right-form">
            <h1>New Post</h1>
            <form>
              <div className='img-upload'>
                <label htmlFor="file-upload" className="file-upload">
                  <i className="bx bx-upload"></i> Upload Image
                </label>
                <input type="file" id='file-upload' />
              </div>
              <input type="text" placeholder='Add Title (Max 60 Characters)' className='title-input' />
              <textarea className='text-input' placeholder='Add Text'></textarea>
              <button type='submit' className='submit-btn'> Submit Button</button>
            </form>
           </div>):(  <button className="post-btn" onClick={()=> setShowForm(true)}>Create New Post</button>)}
          
            <button className="blogs-close-btn" onClick={onBack}>Back <i className="bx bx-chevron-right"></i></button>
        </div>
    </div>
  )
}

export default Blogs