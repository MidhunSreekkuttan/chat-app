import React, { useContext, useState } from 'react'
import { Eye, EyeOff, Loader } from 'lucide-react';
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

    <div className="w-screen h-screen flex flex-col justify-center items-center">

      <div className="bg-black/10 px-8 py-10">

        <div>
          <h1 className='text-2xl font-bold text-center'>
            {state === "login" ? "Login Form" : "SignUp Form"}
          </h1>
          <hr />
        </div>

        <form onSubmit={submitHandler} className='flex flex-col gap-3 mt-5'>

          {state === "signUp" && (
            <Form label="Name:" type="text" name={"name"} value={formData.name} onChange={onChangeHandler} />
          )}

          <Form label={"Email:"} type={"email"} name={"email"} value={formData.email} onChange={onChangeHandler} />

          <div className='flex'>
            <label>Password:</label>
            <div className='flex gap-5 bg-white/50'>
              <input
                name='password'
                value={formData.password}
                onChange={onChangeHandler}
                className='w-full outline-none' type={showPassword === "password" ? "password" : "text"} />
              {showPassword === "password" ? (
                <>
                  <Eye onClick={() => setShowPassword("text")} className='relative right-2 cursor-pointer' />
                </>
              ) : (
                <>
                  <EyeOff onClick={() => setShowPassword("password")} className='relative right-2 cursor-pointer' />
                </>
              )}
            </div>
          </div>

          <button disabled={isLoading}
            className={`mt-3 bg-amber-400 w-full rounded-lg py-1 font-semibold 
                ${isLoading ? "cursor-no-drop" : "cursor-pointer"} ${isLoading && "opacity-50"} 
                ${!isLoading && " transition-transform active:scale-95"} `} >

            {isLoading ? (
              <div className='flex justify-center items-center'>
                <h1>Loading...</h1>
                <Loader className='animate-spin' />
              </div>
            ) : (
              <>
                Submits
              </>
            )}
          </button>

          {state === "login" && (
            <div className='text-right'>
              <h2 className='underline cursor-pointer text-sm text-blue-800'>Forget Password</h2>
            </div>
          )}

          <div>
            <h2 className='text-sm flex'>
              {state === "login" ? (
                "You Don't have an account:"
              ) : (
                "You Already have an account:"
              )}
              <span className='underline cursor-pointer text-blue-800'>
                {state === "login" ? (
                  <>
                    <h1 onClick={() => setState("signUp")}>SignUp</h1>
                  </>
                ) : (
                  <>
                    <h1 onClick={() => setState("login")}>Login</h1>
                  </>
                )}
              </span>
            </h2>
          </div>

        </form>

      </div>

    </div>

  )
}

function Form({ label, type, ...prop }) {
  return (
    <>
      <div className='flex'>
        <label>{label}</label>
        <input {...prop} className='bg-white/50 w-full outline-none' type={type} />
      </div>
    </>
  )
}

export default LoginPage