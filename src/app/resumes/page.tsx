'use client'

import "../globals.css"
import {AuthProvider, useAuth} from '@/context/AuthContext';
import MyLayout from "@/layout/Layout";

import ResumeList from "@/component/ResumeList/ResumeList";
import NewCvButton from "@/component/CvCreator/NewCvButton/NewCvButton";

export default function ResumesPage() {
  return (
    <AuthProvider>
      <MyLayout>
        <ResumeList />
        <NewCvButton />
      </MyLayout>
    </AuthProvider>
  )
}
