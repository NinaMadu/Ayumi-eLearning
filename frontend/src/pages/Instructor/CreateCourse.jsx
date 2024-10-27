import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import { Link } from 'react-router-dom'

export default function CreateCourse() {
  return (
    <AdminLayout>
      <div>
        <div className='fixed right-4 p-6 '>
            <Link to={'/instructor/create-course-first'}>
                <button className='py-2 px-4 rounded-lg text-white font-semibold hover:bg-red-600 ' 
                style={{
                    background: 'linear-gradient(to right, #D16262, #C53B3B)',
                }} >
                    + Add New Course
                </button>
            </Link>
        </div>
  
      </div>
    
    </AdminLayout>
  )
}
