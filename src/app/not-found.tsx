'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl text-white mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-300 mb-8 max-w-md">
          The page you&apos;re looking for seems to have evolved beyond our current reality.
        </p>
        <Link
          href="/"
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-medium hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
