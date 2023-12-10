import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db, auth } from '../configs/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const location = useLocation()
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const session_id = location.search?.split("=")[1]
    const plan = location.search?.split("=")[2]
    const uid = location.search?.split("=")[3]
    console.log(session_id, plan, uid)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
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
          const data = users[0]
          const saveData = async () => {
            const docRef = doc(db, "users", data.id);
            if (session_id?.length > 10 && uid?.length > 10) {
              await updateDoc(docRef, {
                membership: {
                  status: true,
                  plan: plan.slice(0, -4),
                  session_id: session_id
                }
              });
            }
          }
          saveData().then(() => {
            navigate("/members", { replace: true });
          })
        });
        // ...
      } else {
        // User is signed out
        setUser(null)
        console.log("User not")
        // ...
      }
    });
  }, [])

  return (
    <div>
      <h1>Success</h1>
    </div>
  )
}

export default Success
