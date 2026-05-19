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
    const [isLoading, setIsLoading] = useState(true)

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

    const values = useMemo(() => ({

        axiosInstance,
        authState,
        isLoading,

    }), [axiosInstance, authState, isLoading])

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