'use client'

import "../../globals.css"
import {AuthProvider} from '@/context/AuthContext';
import MyLayout from "@/layout/Layout";
import CvCreator from "@/component/CvCreator/CvCreator";
import {Flash} from '@/component/Flash/Flash';
import Bus from "@/Utils/Bus";
//import { useRouter } from 'next/navigation'

export default function ResumesPage({ params }: { params: { id: string } }) {
  //const router = useRouter();

  return (
    <AuthProvider>
      <MyLayout>
        <CvCreator id={params.id}/>
      </MyLayout>
    </AuthProvider>
  )
}
