import '../App.css'
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../configs/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';

const MembersPage = () => {
    const [members, setMembers] = useState([])

    const getUserData = (uid) => {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const users = [];
            querySnapshot.forEach((doc) => {
                users.push({
                    data: doc.data(),
                    id: doc.id
                });
            });
            getMembers(users[0])
        });

    }
    const getMembers = (user) => {
        console.log(user)
        const q = query(collection(db, "users"), where("membership.plan", "==", user?.data?.membership?.plan), where('uid', '!=', user?.data?.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const members = [];
            querySnapshot.forEach((doc) => {
                console.log(doc)
                members.push({
                    data: doc.data(),
                    id: doc.id
                });
            });
            setMembers(members)
        });
    }







    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                getUserData(user.uid)
            }
            else {
                console.log(" user nto found")
            }
        })
    }, [])

    return (
        <div className="min-h-screen bg-3 flex justify-center items-center">
            <div className="max-w-screen-xl m-auto flex flex-col justify-center gap-y-4 items-center">
                {
                    members?.map((val, ind) => {
                        return (
                            <div class="max-w-md mx-auto bg-black rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                                <div class="md:flex">
                                    <div class="md:shrink-0">
                                        <img class="h-48 w-full object-cover md:h-full md:w-48" src={val?.data?.profile}/>
                                    </div>
                                    <div class="p-8">
                                        <div class="uppercase tracking-wide text-sm font-semibold text-white">{val?.data?.Name}</div>
                                        <p class="mt-2 text-slate-500">Join our exclusive club for an ad-free experience, access to premium content, enhanced interaction, priority support, special discounts, and community recognition. Elevate your social media journey today!</p>

                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MembersPage