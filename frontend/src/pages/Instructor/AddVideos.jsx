import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import { Link } from 'react-router-dom'

export default function AddVideos() {
  return (
    <AdminLayout>
      <div>
        <div className='fixed right-4 p-6 '>
            <Link to={'/instructor/video-upload'}>
                <button className='py-2 px-4 rounded-lg text-white font-semibold ' 
                style={{
                    background: 'linear-gradient(to right, #D16262, #C53B3B)',
                }} >
                    + Add New Videos
                </button>
            </Link>
        </div>
  
      </div>
    
    </AdminLayout>
  )
}
