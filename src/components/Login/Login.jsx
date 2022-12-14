import React, { useEffect, useRef, useState } from 'react'
import { auth } from '../../config/firebase'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import './_login.scss'

const Login = () => {

    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")


    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const signIn = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth,
            emailRef.current.value, passwordRef.current.value
        ).then(user => {
            console.log('user', user)
        }).catch(err => {
            console.log(err)
        })
    }



    return (
        <div id="login">
            {/* <form action="">
                <h1>Sign in</h1>
                <input ref={emailRef} type="email" />
                <input ref={passwordRef} type="password" />
                <button onClick={signIn}> Sign in</button>
            </form> */}

            <div className="container my-5">
                <div className="row">


                    <div className="well">
                        <div className="icon">
                            <i class="fa-solid fa-lock"></i>
                        </div>
                        <h2>Login</h2>
                        <p><strong>Email</strong></p>
                        <input type="email" name="email" placeholder="example@gmail.com" id="input-email" class="form-control" ref={emailRef} />
                        <p style={{ marginTop: "10px" }}><strong>Password</strong></p>
                        <input type="password" name="password" placeholder="Password" id="input-password" class="form-control" ref={passwordRef} />
                        <div class="comment-submit">
                            <button type="submit" class="cart-btn" onClick={() => signIn()}>
                                Login
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login



