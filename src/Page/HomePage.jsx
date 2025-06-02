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
  const { user } = useUser();
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
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/map/clerk/${user.id}`
      );
      storeUser(res.data.user[0]._id);
    } catch (error) {
      console.log(`Error getting MONGOUSER Id`, error);
    }
  };

  useEffect(() => {
    const sendUserData = async () => {
      if (!token || !user) return;
      // test token send in backend
      const response = await fetch("http://localhost:8000/api/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      try {
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

        const protectedResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/protected`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Protected response:", protectedResponse.data);
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    sendUserData();
    getMongoUserId();
  }, [token, user]);

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
