// @ts-nocheck
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loader = ({ isLoading = false }) => {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 bg-black/75 ${isLoading ? "flex" : "hidden"} items-center justify-center`}>
      <div className="w-12 h-12 flex-shrink-0 animate-spin text-white">
        <AiOutlineLoading3Quarters className="w-full h-full" />
      </div>
    </div>
  )
}

export default Loader