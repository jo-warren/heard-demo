import { NextResponse } from "next/server"
import { isAuthenticated } from "../lib/auth"

export function middleware(req, res) {
    try {
        if (req.nextUrl.pathName.startsWith("/auth")) {
            return NextResponse.next()
        }
    
        if (isAuthenticated()) {
            return NextResponse.next()
        } else {
            return NextResponse.json({ displayMessage: "Login required"})
            // redirect to login
        }
    } catch (err) {
        console.log(err)
    }
}