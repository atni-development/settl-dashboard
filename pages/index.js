import DashboardMain from "@/components/dashboard/DashboardMain";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Spinner, } from 'reactstrap';
import firebase_app from "@/firebase/config";


export default function Home() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    var auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) { 
        setLoading(false);
        const uid = user.uid;
      } else {
        router.push("/login");
      }
    });
  }, [])
  // return <DashboardMain />;
  return loading ? (
    <span>loading</span>
  ) : (
    <DashboardMain />
  );
};