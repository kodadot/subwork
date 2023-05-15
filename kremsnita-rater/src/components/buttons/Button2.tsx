import React from 'react'

const Button2 = () => (
  <button className="w-270 h-56 border border-gray-3 rounded-16 flex items-center justify-between px-4 hover:bg-gray-400 hover:text-white">
    <span className="font-semibold text-14 leading-24 text-gray-200">Label</span>
    <svg className="w-6 h-6 transform" fill="none" stroke="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
    </svg>
  </button>
)

export default Button2
