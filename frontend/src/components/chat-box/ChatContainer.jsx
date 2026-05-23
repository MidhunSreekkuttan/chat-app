import React, { useCallback, useContext, useEffect } from 'react'
import axiosInstance from '../../lib/axiosInstance';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import ChatHeader from './ChatHeader';
import NoMessageHistory from './NoMessageHistory';
import BouncingChatLoading from '../loading-screen/BouncingChatLoading';
import { UserContext } from '../../lib/UserContext';

const ChatContainer = ({ seletedUser, setSeletedUser }) => {

  const { userData, getUserData } = useContext(UserContext)

  const getMessagesByuserId = useCallback(async () => {

    try {

      const { data } = await axiosInstance.get(`/api/messages/${seletedUser?._id}`)
      if (data.success) {
        return data.messages
      } else {
        toast.error(data.message)
        return []
      }

    } catch (error) {
      console.log();
      toast.error(error.message)
    }

  }, [axiosInstance])

  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", seletedUser],
    queryFn: getMessagesByuserId,
    enabled: !!seletedUser
  })

  if (error) return <div>Error:{error.message}</div>

  useEffect(() => {
    getUserData()
  }, [getUserData])

  return (

    <>

      <ChatHeader seletedUser={seletedUser} setSeletedUser={setSeletedUser} />

      <div className='px-6 py-8 overflow-y-auto scrollbar-hide'>
        {data?.length > 0 ? (
          <div className='max-w-3xl mx-auto space-y-6'>
            {Array.isArray(data) &&
              data.map((msg) => (
                <div key={msg._id}
                  className={`flex w-full ${msg?.senderId === userData?.id ? 'justify-end' : 'justify-start'} mb-4`}>
                  <div className={`flex flex-col max-w-[75%] md:max-w-[60%] 
                    ${msg?.senderId === userData?._id ? 'items-end' : 'items-start'}`}>

                    {/* The actual bubble */}
                    <div
                      className={`relative flex flex-col p-3 rounded-2xl ${msg?.senderId === userData?.id
                        ? 'bg-blue-600 text-white rounded-br-sm' // Your messages (Blue, flat bottom-right)
                        : 'bg-slate-800 text-slate-200 rounded-bl-sm' // Their messages (Dark slate, flat bottom-left)
                        }`}
                    >
                      {/* 1. Render Image if it exists */}
                      {msg?.image && (
                        <div className="mb-2 rounded-xl overflow-hidden bg-slate-900/50">
                          <img
                            src={msg?.image}
                            alt="Shared visual"
                            className="w-full max-h-64 object-cover"
                          />
                        </div>
                      )}

                      {/* 2. Render Text if it exists */}
                      {msg?.text && (
                        <p className="text-[15px] leading-relaxed break-words">
                          {msg?.text}
                        </p>
                      )}
                    </div>

                    {/* Timestamp (Optional) */}
                    <span className="text-xs text-slate-500 mt-1 px-1">
                      {new Date(msg?.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>

                  </div>
                </div>
              ))
            }
          </div>
        ) : (
          <div className='flex-1 overflow-y-auto'>

            {isLoading && <BouncingChatLoading />}

            {!isLoading && data?.length > 0 ? (
              <div className="px-6 py-8">
                {/* Map messages here */}
                We have messages!
              </div>
            ) : (
              !isLoading && <NoMessageHistory name={seletedUser?.name} />
            )}

          </div>
        )}
      </div>

    </>

  )
}

export default ChatContainer