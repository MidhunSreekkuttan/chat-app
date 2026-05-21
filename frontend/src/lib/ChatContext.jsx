import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { toast } from 'react-hot-toast'
import axiosInstance from "./axiosInstance";

export const ChatContext = createContext()

const ChatContextProvider = ({ children }) => {

    const [chats, setChats] = useState([])
    const [allContacts, setAllContacts] = useState([])
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //get all contacts
    const getAllContacts = useCallback(async () => {
        try {

            const { data } = await axiosInstance.get("/api/messages/contacts")
            if (data.success) {
                setAllContacts(data.filteredUsers)
            } else {
                toast.error(data.messages)
                return []
            }

        } catch (error) {
            console.log(error);
            toast.error(error.messages, {
                position: "top-right"
            })
        }
        finally {
            setIsLoading(false)
        }

    }, [axiosInstance])

    // get all chat partners
    const getChatPartners = useCallback(async () => {

        try {

            const { data } = await axiosInstance.get("/api/messages/chats")
            if (data.success) {
                setChats(data.chatPartners)
            } else {
                toast.error(data.messages)
                return []
            }

        } catch (error) {
            console.log(error);
            toast.error(error.messages, {
                position: "top-right"
            })
        }
        finally {
            setIsLoading(false)
        }

    }, [axiosInstance])

    const value = useMemo(() => ({

        chats,
        allContacts,
        messages,
        isLoading, setIsLoading

    }), [chats, allContacts, messages, isLoading])

    return (
        <ChatContext value={value}>
            {children}
        </ChatContext>
    )
}

export default ChatContextProvider