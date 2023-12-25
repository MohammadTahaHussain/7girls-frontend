import '../App.css'
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, auth } from '../configs/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const MembersPage = () => {
    const [members, setMembers] = useState([])
    const navigate = useNavigate()

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }

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
        const q = query(
            collection(db, 'users'),
            where('uid', '!=', user?.data?.uid),
            where('membership.plan', '==', user?.data?.membership?.plan)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const members = [];
            querySnapshot.forEach((doc) => {
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
                navigate('/')
            }
        })
    }, [])

    return (
        <div className="min-h-screen bg-3 flex justify-center items-center">

            <div className='flex flex-col gap-y-4'>
                {
                    members?.map((val, ind) => {
                        return (
                            <div className='md:w-[520px] w-[300px] flex-col md:flex-row h-72 md:h-48 flex rounded-lg' key={ind}>
                                <div className='md:w-[30%] w-full h-[40%] md:h-full rounded-lg'>
                                    <img src={val?.data?.profile} className='w-full h-full md:rounded-l-lg rounded-t-lg md:rounded-t-none' alt="" />
                                </div>
                                <div className='md:w-[70%] h-[60%] md:h-full rounded-lg p-3 bg-black text-white'>
                                    <h1 className='text-center'>{val?.data?.Name}</h1>
                                    <p className='text-gray-400 mt-2'>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt, ut adipisci odio harum maiores possimus nobis omnis aut pariatur.
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button className="bg-pink-500 text-white absolute top-2 rounded p-2" onClick={logout}>Logout</button>
        </div>
    )
}

export default MembersPage  