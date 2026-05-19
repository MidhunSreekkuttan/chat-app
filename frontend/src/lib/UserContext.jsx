import { createContext, useMemo } from "react";
import axios from "axios"
import { useCallback } from "react";
import { toast } from "react-hot-toast"
import { useState } from "react";
import { useEffect } from "react";

export const UserContext = createContext()

axios.defaults.withCredentials = true

const UserContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [authState, setAuthState] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const checkUserAuth = useCallback(async () => {

        try {

            const { data } = await axios.get(backendUrl + "/api/user/userAuth")
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

    }, [backendUrl])

    const values = useMemo(() => ({

        backendUrl,
        authState,
        isLoading,

    }), [backendUrl, authState, isLoading])

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