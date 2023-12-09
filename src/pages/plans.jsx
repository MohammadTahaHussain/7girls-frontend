import "../App.css"
import goldImg from '../assets/images/basic.png'
import platinumImg from '../assets/images/pro.png'
import titaniumImg from '../assets/images/business.png'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../configs/firebase"

const PlansPage = () => {
    const [user, setUser] = useState(null)

    const name = "ITEMNAME";
    const TotalPrice = 50;
    const count = 3;

    const goToStripe = async (price, plan) => {

        try {

            const res = await fetch("https://frail-clam-shoe.cyclic.app/auth/checkout", {
            // const res = await fetch("http://localhost:4000/auth/checkout", {
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
                            uid: user?.uid
                        },
                    ],
                }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            // Assuming the server response is a URL
            const data = await res.json();
            const saveData = async () => {
                const docRef = doc(db, "users", user?.id);
                console.log(docRef)
                await updateDoc(docRef, {
                    membership: {
                        status: true,
                        plan: plan
                    }
                });
                return true
            }
            // saveData().then(() => {
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
                setUser(user)
                const q = query(collection(db, "users"), where("uid", "==", user?.uid));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const users = [];
                    querySnapshot.forEach((doc) => {
                        users.push({
                            data: doc.data(),
                            id: doc.id
                        });
                    });
                    setUser(users[0])
                });
                // ...
            } else {
                // User is signed out
                setUser(null)
                // ...
            }
        });
    }, [])

    return (
        <div className="bg-2 flex justify-center items-center min-h-screen bg-cover bg-no-repeat py-3">
            <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="bg-white p-2 rounded-lg flex-col gap-y-2 w-[375px]">
                    <div><img src={goldImg} alt="" className="w-56 block m-auto" /></div>
                    <div className="flex flex-col gap-y-2 my-2">
                        <h1 className="font-bold text-center text-[25px]">Gold</h1>
                        <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque debitis magnam similique ad nisi dolores doloribus laboriosam dolorem molestias! Modi perspiciatis facere aliquid dolores amet veniam asperiores, nisi iure quas.</p>
                        <p className="text-[25px] font-bold text-blue-600 text-center">$29.99</p>
                    </div>
                    <button className="block m-auto bg-pink-500 text-white p-2 rounded" onClick={() => goToStripe(29.99, 'Gold')}>
                        Buy Now
                    </button>
                </div>
                <div className="bg-white p-2 rounded-lg flex-col gap-y-2 w-[375px]">
                    <div><img src={platinumImg} alt="" className="w-56 block m-auto" /></div>
                    <div className="flex flex-col gap-y-2 my-2">
                        <h1 className="font-bold text-center text-[25px]">Platinum</h1>
                        <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque debitis magnam similique ad nisi dolores doloribus laboriosam dolorem molestias! Modi perspiciatis facere aliquid dolores amet veniam asperiores, nisi iure quas.</p>
                        <p className="text-[25px] font-bold text-blue-600 text-center">$49.99</p>
                    </div>
                    <button className="block m-auto bg-pink-500 text-white p-2 rounded" onClick={() => goToStripe(49.99, 'Platinum')}>
                        Buy Now
                    </button>
                </div>
                <div className="bg-white p-2 rounded-lg flex-col gap-y-2 w-[375px]">
                    <div><img src={titaniumImg} alt="" className="w-56 block m-auto" /></div>
                    <div className="flex flex-col gap-y-2 my-2">
                        <h1 className="font-bold text-center text-[25px]">Titanium</h1>
                        <p className="text-center">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque debitis magnam similique ad nisi dolores doloribus laboriosam dolorem molestias! Modi perspiciatis facere aliquid dolores amet veniam asperiores, nisi iure quas.</p>
                        <p className="text-[25px] font-bold text-blue-600 text-center">$89.99</p>
                    </div>
                    <button className="block m-auto bg-pink-500 text-white p-2 rounded" onClick={() => goToStripe(89.99, 'Titanium')}>
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PlansPage