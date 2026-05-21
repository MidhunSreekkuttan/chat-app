import { createContext, useMemo } from "react";
import axios from "axios"
import { useCallback } from "react";
import { toast } from "react-hot-toast"
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";

export const UserContext = createContext()

axios.defaults.withCredentials = true

const UserContextProvider = ({ children }) => {

    const [authState, setAuthState] = useState(false)
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    // check user is logged in or not
    const checkUserAuth = useCallback(async () => {

        try {

            const { data } = await axiosInstance.get("/api/user/userAuth")
            if (data.success) {
                setAuthState(true)
            } else {
                setAuthState(false)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }

    }, [axiosInstance])

    //get userData
    const getUserData = useCallback(async () => {

        try {

            const { data } = await axiosInstance.get("/api/user/userData")
            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
                return []
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
        finally {
            setIsLoading(false)
        }

    }, [axiosInstance])

    // user logout
    const logout = useCallback(async () => {

        try {

            const { data } = await axiosInstance.post("/api/user/logout")
            if (data.success) {
                setAuthState(false)
                toast.success(data.message)
            } else {
                toast.error(data.messagef)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    }, [axiosInstance])

    const values = useMemo(() => ({

        axiosInstance,
        authState, setAuthState,
        isLoading,
        logout,
        userData,
        getUserData

    }), [axiosInstance, authState, isLoading, logout, userData, getUserData])

    useEffect(() => {
        checkUserAuth()
    }, [checkUserAuth])

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    )

}

export default UserContextProvider