'use client'

import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import awsmobile from "../src/aws-exports";
import "./globals.css";

Amplify.configure({ ...awsmobile, ssr: true });

import { Authenticator } from "@aws-amplify/ui-react";
import Navbar from "./components/navbar/page";
import Input from "./components/input/page";


export default function Home() {
  return (
    <Authenticator>
      {({signOut, user}) => (
      <>
        <Navbar signOut={signOut} user={user} />
        <Input user={user} />
      </>        
      
      )}
  </Authenticator>
  )
}