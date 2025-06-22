import {
  Slideshow,
  CategorySection,
  Certificates,
  ContactSection,
  UseTitle,
} from "../components/compIndex";
import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {
  UseTitle("SVAH | Agros & Herbs");

  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();

  const [token, setToken] = useState("");

  const { storeTokenInLocalStorage, storeUser } = useAuthContext();

  // STEP 1: Get token once auth is loaded and user is signed in
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
  }, [isLoaded, isSignedIn, getToken, storeTokenInLocalStorage]);

  // STEP 2: Get Mongo User ID by Clerk ID
  const getMongoUserId = async (clerkUserId) => {
    if (!clerkUserId) {
      console.warn("Clerk user ID is not available yet");
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/map/clerk/${clerkUserId}`
      );

      const mongoUserId = res?.data?.user?.[0]?._id;

      if (mongoUserId) {
        console.log("MongoDB User ID:", mongoUserId);
        storeUser(mongoUserId);
      } else {
        console.warn("No MongoDB user ID found in response");
      }
    } catch (error) {
      console.error("Error getting MongoDB user ID:", error);
    }
  };

  // STEP 3: Send user data to backend
  useEffect(() => {
    const sendUserData = async () => {
      if (!token || !user || !userLoaded || !isSignedIn) {
        console.log("Waiting for user/token to be ready", {
          token: !!token,
          user: !!user,
          userLoaded,
          isSignedIn,
        });
        return;
      }

      try {
        // Signup call to backend
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

        // Protected call example
        const protectedResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/protected`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Protected API response:", protectedResponse.data);

        // Get MongoDB user ID after signup
        if (user.id) {
          await getMongoUserId(user.id);
        }
      } catch (error) {
        console.error("API call failed:", error);
      }
    };

    sendUserData();
  }, [token, user, userLoaded, isSignedIn]);

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
