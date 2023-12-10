import '../App.css'
import { useState, useEffect } from 'react'
import Button from '../components/button'
import { Link, useNavigate } from 'react-router-dom'
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebase'
import { onAuthStateChanged } from 'firebase/auth';


const SignInPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                navigate('/plans')
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    



    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/plans')
            } else {
                // User is signed out
                // ...
            }
        });
    }, [])

    return (
        <div>
            <div className="h-screen bg-signup flex flex-col justify-center items-center">
                <div><img src="https://7girlsclub.com/sign.png" alt="" /></div>
                <form onSubmit={submit} className='bg-white rounded-lg p-4 lg:p-6 xl:p-10'>
                    <div className="flex flex-col gap-y-2">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='focus:outline-none border border-gray-600 p-1' placeholder='Email address' />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='focus:outline-none border border-gray-600 p-1' placeholder='Password' />
                    </div>
                    <div className='flex justify-center mt-2'>
                        <Button type={"submit"} classes={"w-full rounded border border-white py-1"}>Sign In</Button>
                    </div>
                    <div className='flex gap-x-2 mt-2'>
                        <span>Don't have an account?</span>
                        <Link to={"/"} className='text-blue-700 underline hover:no-underline'>Sign up</Link>
                    </div>
                </form>
            </div>
            <div className='max-w-screen-xl text-center m-auto p-2'>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste atque ea quis molestias. Fugiat pariatur maxime quis culpa corporis vitae repudiandae aliquam voluptatem veniam, est atque cumque eum delectus sint!</p>
            </div>
            <div className='flex w-fit m-auto items-center gap-x-2 mt-4'>
                <p>Follow Us</p>
                <div className="flex items-center gap-x-2">
                    <FaFacebookF className='text-[#67134a]' />
                    <FaInstagram className='text-[#67134a]' />
                    <FaXTwitter className='text-[#67134a]' />

                </div>
            </div>
        </div>
    )
}

export default SignInPage