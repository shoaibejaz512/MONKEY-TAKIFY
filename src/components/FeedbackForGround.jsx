import React, { useEffect, useRef, useState } from 'react';
import { Heart } from "lucide-react";
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../context/FirebaseAuthContext';
import { motion } from "framer-motion";

const FeedbackForGround = () => {
  const dragAreaRef = useRef(null);
  const [contacts, setContacts] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const fetchContacts = async () => {
      const snapshot = await firebase.getContacts();
      if (!snapshot.empty) {
        const contactList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setContacts(contactList);
      } else {
        console.log("No contacts found");
      }
    };
    fetchContacts();
  }, [firebase]);

  return (
    <div
      ref={dragAreaRef}
      className='w-full overflow-hidden px-5 py-5 absolute left-0 top-0 bg-[#121212e4] z-[50]'
    >
      <h1 className='text-white text-center drag-heading'>you can drag the cards</h1>
      <NavLink to={"/"}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          id='back-home-btn'
          className='w-[200px] py-2 mb-5 cursor-pointer bg-green-600 text-white font-extrabold'
        >
          Go Back
        </motion.button>
      </NavLink>

      {contacts.length === 0 ? (
        <p className='text-white'>NO FEEDBACK IS STILL YET!!</p>
      ) : (
        <div className="flex flex-wrap gap-5">
          {contacts.map((contact) => (
            <motion.div
              key={contact.id}
              drag
              dragConstraints={dragAreaRef}
              dragElastic={0.2}
              dragMomentum={0.4}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 1.3 }}
              className="feedback-card w-[300px] rounded-[20px] flex flex-col gap-2 py-3 h-[300px] bg-[#090909c6]"
            >
              <div className="heart w-full flex justify-end items-center">
                <Heart
                  size={32}
                  color="#00ff9d"
                  strokeWidth={2.75}
                  className='hover:border-red-600 duration-200 cursor-pointer'
                />
              </div>
              <div className="feedback">
                <p>{contact.feedback}</p>
              </div>
              <div className="feedback-name">
                <h4>{contact.firstName + " " + contact.lastName}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackForGround;
