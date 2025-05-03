"use client";

import { SignedIn, SignedOut, SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SuperheroLoader from "./components/SuperheroLoader";
import Navbar from "./components/Navbar";
import { setupBatchFavorites } from "@/utils/sendBatchFavorites";

// Minimum time to show the loader in milliseconds (0 seconds as per your code)
const MIN_LOADER_TIME = 0;

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const [showLoader, setShowLoader] = useState(true);
  const [loaderStartTime, setLoaderStartTime] = useState(Date.now());

  useEffect(() => {
    // Record when the loader started displaying
    setLoaderStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // Wait until Clerk is ready

    // Calculate how long the loader has been shown
    const loaderDisplayTime = Date.now() - loaderStartTime;

    // If the loader hasn't been shown for minimum time, set a timeout
    if (loaderDisplayTime < MIN_LOADER_TIME) {
      const remainingTime = MIN_LOADER_TIME - loaderDisplayTime;

      // Wait for the remaining time before hiding the loader
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, remainingTime);

      return () => clearTimeout(timer);
    } else {
      // If minimum time has passed, hide the loader immediately
      setShowLoader(false);
    }
  }, [isLoaded, loaderStartTime]);

  useEffect(() => {
    if (showLoader) return; // Don't navigate until loader is finished

    if (isSignedIn) {
      if (pathname === "/" || pathname === "/authentication") {
        router.push("/home");
      }
    } else {
      if (pathname !== "/" && pathname !== "/authentication") {
        router.push("/");
      }
    }
  }, [isSignedIn, pathname, router, showLoader]);

  // Initialize batch favorites handler
  useEffect(() => {
    if (!isLoaded || !isSignedIn) return; // Wait for Clerk and signed-in state

    setupBatchFavorites();
  }, [isLoaded, isSignedIn]);

  // Show loader if Clerk is still loading OR if minimum display time hasn't elapsed
  if (!isLoaded || showLoader) {
    return <SuperheroLoader />;
  }

  // Allow public pages
  if (pathname === "/" || pathname === "/authentication") {
    return <>{children}</>;
  }

  return (
    <>
      <SignedOut>
        <SignInButton />
        {children}
      </SignedOut>
      <SignedIn>
        <Navbar />
        <div className="mt-8">{children}</div>
      </SignedIn>
    </>
  );
}
