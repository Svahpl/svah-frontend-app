import {
  Slideshow,
  CategorySection,
  Certificates,
  ContactSection,
} from "../components/compIndex";

import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useEffect } from "react";

const HomePage = () => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (isLoaded) {
      console.log("isLoaded:", isLoaded);
      console.log("isSignedIn:", isSignedIn);
      console.log("userId:", userId);
      console.log("sessionId:", sessionId);

      getToken().then((token) => {
        console.log("getToken result:", token);
      });

      if (user) {
        const signupResponse = axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
          {
            FirstName: user?.firstName,
            LastName: user?.lastName,
            Email: user?.primaryEmailAddress?.emailAddress,
          }
        );
        // console.log(
        //   "user:",
        //   user?.firstName,
        //   user?.lastName,
        //   user?.imageUrl,
        //   user?.verification?.verification,
        //   user?.primaryEmailAddress?.emailAddress
        // );
      } else {
        console.log("user is undefined or not available yet");
      }
    }
  }, [isLoaded, isSignedIn, userId, sessionId, getToken, user]);

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
