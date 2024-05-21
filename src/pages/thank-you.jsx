// @ts-nocheck
import { AiFillLike } from "react-icons/ai";
import { IoMail } from "react-icons/io5";

const ThankYou = () => {
  return (
    <div className="thank-you w-full h-screen font-semibold">
      <div className="w-full h-full bg-black/70 flex items-center justify-between flex-col xl:px-12 px-4 py-4">
        <div className="w-full flex items-center justify-center flex-col mt-16">
          <div className="max-w-[200px] md:max-w-[280px] w-full">
            <img className="w-full" src="https://storage.googleapis.com/accredian-assets/Frontend_Assests/Images/Accredian-react-site-images/other/accredian-white-logo.png" alt="logo" />
          </div>
          <div className="w-full max-w-4xl bg-white px-8 py-12 md:py-16 rounded-lg flex flex-col items-center mt-12">
            <div className="w-16 md:w-20 h-16 md:h-20 flex-shrink-0">
              <AiFillLike className="w-full h-full" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mt-6">Your Data is saved!</h1>
            <div className="flex items-center gap-1 mt-8 text-neutral-500">
              <div className="w-5 md:w-6 h-5 md:h-6 flex-shrink-0">
                <IoMail className="w-full h-full" />
              </div>
              <h4 className="text-base md:text-lg">Write to us at <a href="mailto:academics@accredian.com">academics@accredian.com</a></h4>
            </div>
            <h3 className="mt-6 text-base md:text-lg font-bold">Thank You!</h3>
          </div>
        </div>
        <div>
          <h2 className="mt-4 text-white">©2023 Accredian | <a className="hover:underline" href="http://accredian.com">accredian.com</a> </h2>
        </div>
      </div>
    </div>
  )
}

export default ThankYou