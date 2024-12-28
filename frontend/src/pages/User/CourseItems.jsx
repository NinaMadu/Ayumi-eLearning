import React from 'react'
import Courses from '../../components/CourseCards'
import UserLayout from '../../components/UserLayout'


export default function 
() {
  return (
    <div>
        <UserLayout>
          <div>
          <h2 className="text-4xl font-bold mb-4 mt-8 mx-4  text-gray-800">Let's Start Learning...</h2>
          </div>
            <Courses />
        </UserLayout>
    </div>
  )
}
