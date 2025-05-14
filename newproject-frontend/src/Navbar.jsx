import { useState, useEffect } from "react";
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar(){
    return(
        <div className="flex flex-row justify-between w-screen">
            <div className="">
                <button>button 1</button>
                <button>button 2</button>
                <button>button 3</button>
            </div>
            <div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}