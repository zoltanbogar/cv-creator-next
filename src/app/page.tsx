'use client'

import "./globals.css"
import {AuthProvider} from '@/context/AuthContext';
import MyLayout from "@/layout/Layout";
import Login from "@/component/Login/Login";
import Register from "@/component/Register/Register";
import CvCreator from "@/component/CvCreator/CvCreator";
import {Flash} from '@/component/Flash/Flash';
import Bus from "@/Utils/Bus";

export default function Home() {
  //window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));
  return (
    <AuthProvider>
      <Flash />
      <MyLayout>
        <Login />
        <Register />
        {/*<CvCreator/>*/}
      </MyLayout>
    </AuthProvider>
  )
}
