
import { FaCheckCircle } from 'react-icons/fa'

export default function EmailSuccess() {
    return (
        <div className="flex-col text-center items-center w-full mx-auto my-5 p-5">
            <FaCheckCircle className="text-green-500 text-4xl mx-auto my-5"/>    
            <span className="text-2xl">Verifiez votre email!</span>

        </div>
    )
}