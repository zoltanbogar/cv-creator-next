'use client'

import "../globals.css"
import {AuthProvider} from '@/context/AuthContext';
import MyLayout from "@/layout/Layout";

import ResumeList from "@/component/ResumeList/ResumeList";

export default function ResumesPage() {
  return (
    <AuthProvider>
      <MyLayout>
        <ResumeList />
      </MyLayout>
    </AuthProvider>
  )
}
