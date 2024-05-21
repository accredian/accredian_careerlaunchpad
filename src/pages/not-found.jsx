// @ts-nocheck
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-full min-h-screen flex items-center justify-center lg:px-12 px-4 font-circular'>
      <div className='max-w-xl w-full text-center flex flex-col items-center'>
        <img className='w-full' src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/404.webp" alt="404" />
        <h2 className='text-2xl font-semibold mt-4'>404 - PAGE NOT FOUND</h2>
        <h4 className='mt-4 font-medium max-w-md'>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</h4>
        <Link to="/">
          <button className='py-3 mt-4 px-6 rounded-full bg-universal hover:bg-darkBlue text-white font-semibold text-lg'>
            Go to Homepage
          </button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound