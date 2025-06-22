import {
  Slideshow,
  CategorySection,
  Certificates,
  ContactSection,
} from "../components/compIndex";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { UseTitle } from "../components/compIndex";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  UseTitle("SVAH | Agros & Herbs");
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const [token, setToken] = useState("");

  const { storeTokenInLocalStorage, storeUser } = useAuthContext();

  // Get token once auth is loaded and user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getToken()
        .then((t) => {
          setToken(t);
          storeTokenInLocalStorage(t);
        })
        .catch((err) => {
          console.error("Failed to get token:", err);
        });
    }
  }, [isLoaded, isSignedIn, getToken]);

  const getMongoUserId = async () => {
    // Add safety checks
    if (!user || !user.id) {
      console.log("User or user.id is not available yet");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/map/clerk/${user.id}`
      );
      console.log('user id', res?.data?.user[0]?._id);
      
      // Check if we actually got a user ID before storing
      if (res?.data?.user[0]?._id) {
        storeUser(res.data.user[0]._id);
      } else {
        console.warn("No MongoDB user ID found in response");
      }
    } catch (error) {
      console.log(`Error getting MONGOUSER Id`, error);
    }
  };

  useEffect(() => {
    const sendUserData = async () => {
      // Add comprehensive checks
      if (!token || !user || !userLoaded || !isSignedIn) {
        console.log("Missing required data:", { token: !!token, user: !!user, userLoaded, isSignedIn });
        return;
      }

      try {
        // Remove the localhost call that's being blocked
        // const response = await fetch("http://localhost:8000/api/protected", {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });

        // Signup API call
        const signupResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
          {
            clerkUserId: user.id,
            FirstName: user.firstName,
            lastName: user.lastName,
            Email: user.primaryEmailAddress?.emailAddress,
            ProfileImage: user.imageUrl,
          }
        );
        console.log("Signup response:", signupResponse.data);

        // Protected API call - use the same backend URL
        const protectedResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/protected`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Protected response:", protectedResponse.data);

        // Call getMongoUserId after successful signup
        await getMongoUserId();
        
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    // Only run when all required data is available
    if (isLoaded && userLoaded && isSignedIn && token && user) {
      sendUserData();
    }
  }, [token, user, isLoaded, userLoaded, isSignedIn]);

  return (
    <>
      <Slideshow />
      <CategorySection />
      <Certificates />
      <ContactSection />
    </>
  );
};

export default HomePage;
