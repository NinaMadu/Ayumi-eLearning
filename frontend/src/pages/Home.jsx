import React from 'react'
import logo from '../assets/logo.png';


export default function Home() {
  return (
    <div>

      <div className='flex px-16 gap-4'>
        <div className=' text-6xl font-semibold text-[#F61627] pl-32 '>
          Ayumi Japanese <br/>
          Language Institute
          <br/>
          <p className=' text-lg text-[#2B3090] mt-4'>
          At Ayumi Japanese Language Institute, we are committed<br/>
           to providing quality, affordable language programs.<br/>
            We guide our students through the process of learning<br/>
             a new language in an easy-to-understand manner.<br/>
          </p>

          <div className='mt-4 flex text-xl gap-16 text-white '>
            <button  className='' style={{
              background: 'linear-gradient(to right, #DC7676, #C53B3B)',
            }} > 
              Our Courses
            </button>

            <button className=''
            style={{
              background: 'linear-gradient(to right, #2B3090, #8487BE)',
            }} > 
              Learn More
            </button>

          </div>
        </div>
        <div className='pl-24'>

          <img src={logo} alt="Logo" className='' />

        </div>
      </div>

      <div>

      </div>
    </div>
  )
}