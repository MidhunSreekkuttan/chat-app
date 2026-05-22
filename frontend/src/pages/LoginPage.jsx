import React, { useCallback, useContext, useState } from 'react'
import { Eye, EyeOff, Loader, Mail, Lock, User, ArrowBigRightDash } from 'lucide-react';
import { toast } from 'react-hot-toast'
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../lib/UserContext';

const LoginPage = () => {

  const navigate = useNavigate()

  const { setAuthState } = useContext(UserContext)

  const [state, setState] = useState("login")
  const [showPassword, setShowPassword] = useState("password")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const onChangeHandler = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    if (state === "login") {

      try {
        setIsLoading(true)

        const { data } = await axiosInstance.post("/api/user/login", formData)
        if (data.success) {
          setAuthState(true)
          toast.success(data.message)
          navigate('/')
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: "top-right"
        })
      }
      finally {
        setIsLoading(false)
      }

    } else {

      try {
        setIsLoading(true)

        const { data } = await axiosInstance.post("/api/user/registration", formData)
        if (data.success) {
          toast.success(data.message)
          navigate('/')
        } else {
          toast.error(data.message, {
            position: "top-right"
          })
        }

      } catch (error) {
        console.log(error);
        toast.error(error.message, {
          position: "top-right"
        })
      }
      finally {
        setIsLoading(false)
      }

    }

  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 blur-[180px] opacity-30 rounded-full" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600 blur-[180px] opacity-30 rounded-full" />

      {/* Main Card */}
      <div
        className="
          relative
          w-full
          max-w-6xl
          h-fit
          rounded-[40px]
          overflow-hidden
          border
          border-white/20
          backdrop-blur-xl
          bg-white/5
          shadow-[0_0_40px_rgba(255,255,255,0.08)]
        "
      >

        {/* Outer Neon Border */}
        <div className="absolute inset-0 rounded-[40px]">
          <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 shadow-[0_0_25px_5px_#3b82f6]" />
          <div className="absolute right-0 top-0 h-full w-1 bg-red-500 shadow-[0_0_25px_5px_#ef4444]" />
        </div>

        <div className="grid lg:grid-cols-2 h-full">

          {/* LEFT SIDE */}
          <div className="relative flex flex-col justify-center items-center px-12 overflow-hidden">

            {/* Blue Glow */}
            <div className="absolute inset-0 bg-blue-500/10" />
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500 blur-[140px] opacity-40 rounded-full" />

            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-400 to-red-500 flex items-center justify-center text-3xl font-bold">
                ⚡
              </div>

              <h1 className="mt-8 text-6xl font-black uppercase tracking-widest text-white">
                Welcome
              </h1>

              {state === "login" && (
                <h2 className="text-6xl font-black uppercase tracking-widest bg-gradient-to-r from-blue-400 to-red-500 bg-clip-text text-transparent">
                  Back
                </h2>
              )}

              <p className="mt-4 text-gray-400">
                {state === "login" ? (
                  "Glad to see you again!"
                ) : (
                  "Glad to see you"
                )}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="relative flex items-center justify-center p-12">

            {/* Red Glow */}
            <div className="absolute inset-0 bg-red-500/5" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 blur-[140px] opacity-40 rounded-full" />

            <form onSubmit={submitHandler} className="relative z-10 w-full max-w-md">

              <h2 className="text-4xl font-bold text-white">
                {state === 'login' ? (
                  "Login"
                ) : (
                  "SignUp"
                )}
              </h2>

              <p className="text-gray-400 mt-2">
                Enter your credentials to continue
              </p>

              {/* Name */}
              {state === "signUp" && (
                <div className="mt-5 relative">
                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    name='name'
                    value={formData.name}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Name or Username"
                    className="
                    w-full
                    bg-white/5
                    border border-white/10
                    rounded-xl
                    pl-12
                    pr-4
                    py-4
                    text-white
                    outline-none
                    focus:border-blue-500
                    backdrop-blur-md
                  "
                  />
                </div>
              )}

              {/* Email */}
              <div className="mt-5 relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name='email'
                  value={formData.email}
                  onChange={onChangeHandler}
                  type="email"
                  placeholder="Email or Username"
                  className="
                    w-full
                    bg-white/5
                    border border-white/10
                    rounded-xl
                    pl-12
                    pr-4
                    py-4
                    text-white
                    outline-none
                    focus:border-blue-500
                    backdrop-blur-md
                  "
                />
              </div>

              {/* Password */}
              <div className="mt-5 relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  name='password'
                  value={formData.password}
                  onChange={onChangeHandler}
                  type={showPassword === "password" ? "password" : "text"}
                  placeholder="Password"
                  className="
                    w-full
                    bg-white/5
                    border border-white/10
                    rounded-xl
                    pl-12
                    pr-12
                    py-4
                    text-white
                    outline-none
                    focus:border-red-500
                    backdrop-blur-md
                  "
                />

                {showPassword === "password" ? (
                  <Eye
                    onClick={() => setShowPassword("text")}
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setShowPassword("password")}
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                  />
                )}
              </div>

              {/* Forget */}
              <div className="flex mt-5  text-sm">

                <button onClick={() => navigate("/forgetPassword")} type='button' className="text-red-400 hover:text-red-300">
                  Forgot password?
                </button>
              </div>

              {/* Button */}
              <button
                className="
                 group
                  w-full
                  mt-8
                  py-4
                  rounded-xl
                  text-white
                  font-semibold
                  bg-gradient-to-r
                  from-blue-500
                  to-red-500
                  shadow-[0_0_30px_rgba(99,102,241,0.6)]
                  active:scale-98
                  transition
                "
              >
                {state === "login" ? (
                  <h2>
                    {isLoading ? (
                      <span className='flex justify-center items-center'>
                        Loading...
                        <Loader className='animate-spin' />
                      </span>
                    ) : (
                      <span className='flex justify-center gap-1'>
                        SIGN IN <ArrowBigRightDash className=' transition-all duration-300 group-hover:translate-x-2' />
                      </span>
                    )}
                  </h2>
                ) : (
                  <h2>
                    {isLoading ? (
                      <span className='flex justify-center items-center'>
                        Loading...
                        <Loader className='animate-spin' />
                      </span>
                    ) : (
                      <span className='flex justify-center gap-1'>
                        SIGN Up <ArrowBigRightDash className=' transition-all duration-300 group-hover:translate-x-2' />
                      </span>
                    )}
                  </h2>
                )}
              </button>

              {state === "login" ? (
                <p className="mt-8 text-center text-gray-400">
                  Don't have an account?
                  <span onClick={() => setState("signUp")} className="text-red-400 ml-2 cursor-pointer">
                    Sign Up
                  </span>
                </p>
              ) : (
                <p className="mt-8 text-center text-gray-400">
                  Already have an account?
                  <span onClick={() => setState("login")} className="text-red-400 ml-2 cursor-pointer">
                    Login
                  </span>
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>

  )
}
export default LoginPage