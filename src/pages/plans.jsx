import "../App.css"
import goldImg from '../assets/images/basic.png'
import platinumImg from '../assets/images/pro.png'
import titaniumImg from '../assets/images/business.png'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot, updateDoc, } from "firebase/firestore";
import { auth, db } from "../configs/firebase"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";


const PlansPage = () => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }


    const goToStripe = async (price, plan) => {

        try {
            const res = await fetch("https://smiling-ant-overcoat.cyclic.app/auth/checkout", {
            // const res = await fetch("http://localhost:3002/auth/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    items: [
                        {
                            quantity: 1,
                            price: price,
                            name: plan,
                            uid: user?.data?.uid
                        },
                    ],
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            // Assuming the server response is a URL
            const data = await res.json();
            //  ().then(() => {

            window.location = data.url;
            // })

        } catch (err) {
            console.error("Error during fetch:", err);
        }
    };


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                const uid = user.uid;
                const q = query(collection(db, "users"), where("uid", "==", uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const users = [];
                    querySnapshot.forEach((doc) => {
                        users.push({
                            data: doc.data(),
                            id: doc.id
                        });
                    });
                    setUser(users[0])
                    let data = users[0].data
                    if (data?.membership?.status == true) {
                        navigate('/members')
                    } else {
                        setIsLoading(false)
                    }
                });
                // ...
            } else {
                // User is signed out   
                setUser(null)
                navigate("/")
                // ...
            }
        });
    }, [])


    return (
        <div className="bg-2 flex justify-center items-center min-h-screen bg-cover bg-no-repeat py-3">
            {
                isLoading && <div role="status">
                    <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            }
            {
                !isLoading && <div className="flex items-center justify-center gap-4 flex-wrap">
                    <div className="bg-white p-2 rounded-lg flex-col gap-y-2 w-[375px]">
                        <div><img src={goldImg} alt="" className="w-full block m-auto" /></div>
                        <div className="flex flex-col gap-y-2 my-2">
                            <h1 className="font-bold text-center text-[25px]">Gold</h1>
                            <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque debitis magnam similique ad nisi dolores doloribus laboriosam dolorem molestias! Modi perspiciatis facere aliquid dolores amet veniam asperiores, nisi iure quas.</p>
                            <p className="text-[25px] font-bold text-blue-600 text-center">$30</p>
                        </div>
                        <button className="block m-auto bg-pink-500 text-white p-2 rounded" onClick={() => goToStripe(30, 'Gold')}>
                            Buy Now
                        </button>
                    </div>
                    <div className="bg-white p-2 rounded-lg flex-col gap-y-2 w-[375px]">
                        <div><img src={platinumImg} alt="" className="w-full block m-auto" /></div>
                        <div className="flex flex-col gap-y-2 my-2">
                            <h1 className="font-bold text-center text-[25px]">Platinum</h1>
                            <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque debitis magnam similique ad nisi dolores doloribus laboriosam dolorem molestias! Modi perspiciatis facere aliquid dolores amet veniam asperiores, nisi iure quas.</p>
                            <p className="text-[25px] font-bold text-blue-600 text-center">$50</p>
                        </div>
                        <button className="block m-auto bg-pink-500 text-white p-2 rounded" onClick={() => goToStripe(50, 'Platinum')}>
                            Buy Now
                        </button>
                    </div>
                    <div className="bg-white p-2 rounded-lg flex-col gap-y-2 w-[375px]">
                        <div><img src={titaniumImg} alt="" className="w-full block m-auto" /></div>
                        <div className="flex flex-col gap-y-2 my-2">
                            <h1 className="font-bold text-center text-[25px]">Titanium</h1>
                            <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque debitis magnam similique ad nisi dolores doloribus laboriosam dolorem molestias! Modi perspiciatis facere aliquid dolores amet veniam asperiores, nisi iure quas.</p>
                            <p className="text-[25px] font-bold text-blue-600 text-center">$90</p>
                        </div>
                        <button className="block m-auto bg-pink-500 text-white p-2 rounded" onClick={() => goToStripe(90, 'Titanium')}>
                            Buy Now
                        </button>
                    </div>
                </div>
            }
            {!isLoading && <button className="bg-pink-500 text-white absolute top-2 rounded p-2" onClick={logout}>Logout</button>}

        </div>
    )
}

export default PlansPage