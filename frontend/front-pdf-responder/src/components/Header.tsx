"use client"
import { useRouter } from "next/navigation"

export default function Header(){

    const router = useRouter();

    return (
        <div className= "flex flex-row justify-around text-black">
            
            <img src="../" />

            <button onClick={() => router.push('/logUp')}> Profile </button>

        </div>
    )

}