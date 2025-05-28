import {
  Slideshow,
  CategorySection,
  Certificates,
  ContactSection,
} from "../components/compIndex";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";

const HomePage = () => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();
  const [token, setToken] = useState("");

  // Get token once auth is loaded and user is signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      getToken()
        .then((t) => {
          setToken(t);
          console.log("Token obtained:", t);
        })
        .catch((err) => {
          console.error("Failed to get token:", err);
        });
    }
  }, [isLoaded, isSignedIn, getToken]);

  // Make API calls once token and user are ready
  useEffect(() => {
    const sendUserData = async () => {
      if (!token || !user) return;
      console.log({
        token,
        userObject: user,
      });
      try {
        const signupResponse = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
          {
            clerkUserId: userId,
            FirstName: user.firstName,
            lastName: user.lastName,
            Email: user.primaryEmailAddress?.emailAddress,
            ProfileImage:user.imageUrl
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
