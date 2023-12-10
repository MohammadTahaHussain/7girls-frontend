import '../App.css'
import { useState, useEffect } from 'react'
import Button from '../components/button'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { auth, db, storage } from '../configs/firebase'
import { getDownloadURL, uploadBytes, ref } from "firebase/storage"
import { collection, addDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

const SignupPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState([null])
    const navigate = useNavigate()

    const FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

    const submit = async (e) => {
        e.preventDefault()

        if (!image.length > 0) {
            return false
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                let imageName = `profile/${image[0].name}${Math.random()}`
                let imageRef = ref(storage, imageName)
                let uploaded = await uploadBytes(imageRef, image[0])
                let imageUrl = await getDownloadURL(imageRef)
                const user = userCredential.user;
                try {
                    const docRef = await addDoc(collection(db, "users"), {
                        Name: name,
                        Email: email,
                        profile: imageUrl,
                        uid: user.uid
                    });
                    navigate('/plans')
                    setEmail("")
                    setImage([])
                    setName("")
                    setPassword('')
                } catch (e) {
                    console.log(e)
                }
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                // ..
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
                        <input type="text" onChange={(e) => setName(e.target.value)} value={name} className='focus:outline-none border border-gray-600 p-1' placeholder='Full Name' />
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className='focus:outline-none border border-gray-600 p-1' placeholder='Email address' />
                        <input type="file" max={FILE_SIZE} accept={SUPPORTED_FORMATS} className='focus:outline-none border border-gray-600 p-1' onChange={(e) => setImage(e.target.files)} />
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className='focus:outline-none border border-gray-600 p-1' placeholder='Password' />
                    </div>
                    <div className='flex justify-center mt-2'>
                        <Button type={"submit"} classes={"w-full rounded border border-white py-1"}>Sign up</Button>
                    </div>
                    <div className='flex gap-x-2 mt-2'>
                        <span>Already have an account?</span>
                        <Link to={'/signin'} className='text-blue-700 underline hover:no-underline'>Sign in</Link>
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

export default SignupPage