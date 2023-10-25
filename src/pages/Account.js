import { auth } from "../firebase/fireBaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null); // Clear the user from the state upon logout
      })
      .catch((error) => {
        console.error("Logout error: ", error);
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}!</p>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="User Profile" />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Account;
