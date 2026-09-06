"use client";
import { authClient } from "@/lib/authClient.lib";

export default function signup() {
    async function signupUser() {
        await authClient.signUp.email({
            name: "Anurag Mishra",
            email: "anurag246805@gmail.com",
            password: "Anurag@79201"
        }, {
            onSuccess(ctx) {
                alert("User reqistered sucessfully...");
                console.log("Data : ", ctx.data)
            },
            onError(ctx) {
                alert("An error occured...");
                console.log("Error : ", ctx.error)
            }
        })
    }

    return <div>
        <h1>Signup</h1>
        <button onClick={signupUser}>Submit</button>
    </div>
}