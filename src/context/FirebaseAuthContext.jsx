import React, { createContext, useState, useEffect, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile, getAuth, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, signOut } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, getDocs, query, where, collection, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore"
import { getDatabase, ref, set } from "firebase/database"
import { toast } from "react-toastify";


const firebaseConfig = {
    apiKey: "AIzaSyBIIYUcYQkCU9TqzoykrkiSWZ9gNSf6l0M",
    authDomain: "taskify-7ae89.firebaseapp.com",
    projectId: "taskify-7ae89",
    storageBucket: "taskify-7ae89.appspot.com",
    messagingSenderId: "123248144417",
    appId: "1:123248144417:web:5059cee6f6f4198503b360",
    databaseURL: "https://taskify-7ae89-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const FirebaseContext = createContext(null);
const db = getFirestore(app);
const databaseRealTime = getDatabase()

//firebase Hook 
export const useFirebase = () => useContext(FirebaseContext);


export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null)

    //create Accouny
    const CreateAccount = async (email, password, username,) => {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        // Manually set displayName and photoURL
        await updateProfile(result.user, {
            displayName: username,
        });

        return result;
    }

    //realtime database
    const realtimeUserData = (name, email) => {
        set(ref(databaseRealTime, "users/" + name), {
            name, email
        })
    }


    const getDocsFromFirestore = async (uid) => {
        try {
            const q = query(
                collection(db, "users"),
                where("uid", "==", uid)   // ✅ use the uid passed in
            );
            const querySnapshot = await getDocs(q);
            return querySnapshot;
        } catch (error) {
            console.error("Error fetching user docs:", error);
            throw error;
        }
    };

    //handle logout
    const handleLogout = () => {
        signOut(auth).then(() => toast.success("LogOut successfully"))
    }
    //login User
    const LoginAccount = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user; // ✅ Now returns user
    };


    //google login
    const GoogleLogin = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result);
        return result;
    }

   

    //users collection and information
   const setUserInfor = async (userData) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", userData.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = doc(db, "users", querySnapshot.docs[0].id);

            // Check if name/photo are missing, then update
            const existingData = querySnapshot.docs[0].data();

            const updates = {};
            if (!existingData.name && userData.displayName) {
                updates.name = userData.displayName;
            }
            if (!existingData.photo && userData.photoURL) {
                updates.photo = userData.photoURL;
            }

            if (Object.keys(updates).length > 0) {
                await updateDoc(docRef, updates);
                console.log("User profile updated with Google data.");
            }

            localStorage.setItem("userDocId", querySnapshot.docs[0].id);
            return querySnapshot.docs[0].id;
        }

        // Create new user document if it doesn't exist
        const docRef = await addDoc(collection(db, "users"), {
            uid: userData.uid,
            email: userData.email,
            name: userData.displayName || "",
            photo: userData.photoURL || "",
            isAdmin: false
        });

        console.log("New user added to Firestore:", docRef.id);
        localStorage.setItem("userDocId", docRef.id);
        return docRef.id;

    } catch (error) {
        console.error("Error in setUserInfor:", error);
    }
};


    ///admin tasks
    const adminTask = async (taskTitle, taskDate, taskDescription) => {
        try {
            const id = localStorage.getItem("userDocId");
            const docRef = await addDoc(collection(db, "users", id, "AdminTasks"), {
                taskTitle,
                taskDate,
                taskDescription,
                taskCompleted: false,
                taskFailed: false,
            })
            console.log("task created successsfully :)")
        } catch (error) {
            console.log("task is not created please try again ", error)
        }
    }


    //get contact forms dcouments
    const getContacts = async () => {
        const id = localStorage.getItem("userDocId");
        if (!id) return console.log("no contact doucments found");

        const contactRef = collection(db, "users", id, "contacts");
        const snapshot = await getDocs(contactRef);


        return snapshot;
    }
    //getadmin Task
    const getAdminTasks = async () => {
        const id = localStorage.getItem("userDocId");

        if (!id) {
            throw new Error("No userDocId found in localStorage");
        }


        const tasksRef = collection(db, "users", id, "AdminTasks");
        const snapshot = await getDocs(tasksRef);

        console.log(snapshot)
        // Return an array of { id, ...data }
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    }

    ///employee tasks
    const employeeTasks = async (taskTitle, taskDate, taskDescription) => {
        try {
            const id = localStorage.getItem("userDocId");
            const docRef = await addDoc(collection(db, "users", id, "EmployeeTasks"), {
                taskTitle,
                taskDate,
                taskDescription,
                taskCompleted: false,
                taskFailed: false,
            })
            console.log("task created successsfully :)")
        } catch (error) {
            console.log("task is not created please try again ", error)
        }
    }



    //get employee task
    const getAllEmployeeTasks = async () => {
        const usersSnapshot = await getDocs(collection(db, "users"));
        let allTasks = [];

        for (const userDoc of usersSnapshot.docs) {
            const tasksSnapshot = await getDocs(collection(db, "users", userDoc.id, "EmployeeTasks"));
            const tasks = tasksSnapshot.docs.map(doc => ({
                id: doc.id,
                userId: userDoc.id,
                ...doc.data()
            }));
            allTasks = [...allTasks, ...tasks];
        }

        return allTasks;
    };
    // contact information on firestore database
    const contactInfo = async (firstName, lastName, number, country, feedback) => {
        try {
            // ✅ Wait for the user document ID
            const id = localStorage.getItem("userDocId");

            // ✅ Add contact info in a subcollection for that user
            const docRef = await addDoc(collection(db, "users", id, "contacts"), {
                firstName,
                lastName,
                number,
                country,
                feedback
            });

            console.log("Contact info added with ID:", docRef.id);
        } catch (error) {
            console.error("Error adding contact info:", error);
        }
    };

    //handle completed  for admin funionalify
    const handleComptedForAdmin = async (taskId) => {
        try {
            const id = localStorage.getItem("userDocId");
            const docRef = doc(db, "users", id, "AdminTasks", taskId);
            await updateDoc(docRef, { taskCompleted: true, taskFailed: false });
            return true; // ✅ return a value so your toast can trigger
        } catch (error) {
            console.error("Error updating admin task:", error);
            return false;
        }
    }

    //task completed for employee
    const handleComptedForEmployee = async (taskId) => {
        try {
            const id = localStorage.getItem("userDocId");
            const docRef = doc(db, "users", id, "EmployeeTasks", taskId);
            await updateDoc(docRef, { taskCompleted: true, taskFailed: false });
            return true; // ✅ return a value so your toast can trigger
        } catch (error) {
            console.error("Error updating employee task:", error);
            return false;
        }
    }
    //task failed for employee
    const handleFailedForEmployee = async (taskId) => {
        try {
            const id = localStorage.getItem("userDocId");
            const docRef = doc(db, "users", id, "EmployeeTasks", taskId);
            await updateDoc(docRef, { taskFailed: true, taskCompleted: false });
            return true; // ✅ return a value so your toast can trigger
        } catch (error) {
            console.error("Error updating employee task:", error);
            return false;
        }
    }
    //task failed for admin
    const handleFailedForAdmin = async (taskId) => {
        try {
            const id = localStorage.getItem("userDocId");
            const docRef = doc(db, "users", id, "AdminTasks", taskId);
            await updateDoc(docRef, { taskFailed: true, taskCompleted: false });
            return true; // ✅ return a value so your toast can trigger
        } catch (error) {
            console.error("Error updating employee task:", error);
            return false;
        }
    }

    const deletedAdminTask = async (taskId) => {
        try {
            const id = localStorage.getItem("userDocId");
            if (!id) throw new Error("No userDocId found");

            // Reference the task in the same subcollection
            const docRef = doc(db, "users", id, "AdminTasks", taskId);
            await deleteDoc(docRef);
            console.log("Task deleted successfully!");
            return true;
        } catch (error) {
            console.error("Error deleting task:", error);
            return false;
        }
    };

    const deletedEmployeeTask = async (taskId) => {
        try {
            const id = localStorage.getItem("userDocId");
            if (!id) throw new Error("No userDocId found");

            const docRef = doc(db, "users", id, "EmployeeTasks", taskId)
            await deleteDoc(docRef);
            return true;
        } catch (error) {
            return false;
        }
    }


    // ✅ Admin Task Update karne ka function
    const updateAdminTask = async (taskId, updatedData) => {
        try {
            const id = localStorage.getItem("userDocId");
            if (!id) throw new Error("No userDocId found");

            const docRef = doc(db, "users", id, "AdminTasks", taskId);
            await updateDoc(docRef, updatedData);

            console.log("Admin task update ho gaya successfully!");
            return true;
        } catch (error) {
            console.error("Admin task update karte waqt error:", error);
            return false;
        }
    };

    // ✅ Employee Task Update karne ka function
    const updateEmployeeTask = async (taskId, updatedData) => {
        try {
            const id = localStorage.getItem("userDocId");
            if (!id) throw new Error("No userDocId found");

            const docRef = doc(db, "users", id, "EmployeeTasks", taskId);
            await updateDoc(docRef, updatedData);

            console.log("Employee task update ho gaya successfully!");
            return true;
        } catch (error) {
            console.error("Employee task update karte waqt error:", error);
            return false;
        }
    };


   const updateUserInfo = async (db, uid, name, photo) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0].ref; // first matching doc
      await updateDoc(userDoc, { name, photo });
      return "User updated!";
    } else {
      console.log("No user found with uid:", uid);
      return null;
    }
  } catch (err) {
    console.error("Error updating user:", err);
    return null;
  }
};

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log("newloginuser", user)
            } else {
                console.log("No user is signed in");
                setUser(null)
            }
        })
    }, [])


    

    return (
        <FirebaseContext.Provider value={{
            handleLogout,
            employeeTasks,
            getDocsFromFirestore,
            contactInfo, adminTask,
            realtimeUserData,
            setUserInfor,
            CreateAccount,
            LoginAccount,
            GoogleLogin,
            user,
            setUser,
            getAdminTasks,
            getContacts,
            getAllEmployeeTasks,
            db,
            handleComptedForAdmin,
            handleComptedForEmployee,
            handleFailedForAdmin,
            handleFailedForEmployee,
            deletedAdminTask,
            deletedEmployeeTask,
            updateAdminTask,
            updateEmployeeTask,
            auth,
            updateUserInfo
        }}>
            {props.children}
        </FirebaseContext.Provider>
    )
}