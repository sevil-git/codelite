import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <SignIn/>
      <h1>Hola Amigo</h1>
    </div>
  );
}
