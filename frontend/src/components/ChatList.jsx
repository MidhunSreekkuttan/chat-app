import React from 'react';
import axiosInstance from '../lib/axiosInstance';
import { toast } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import ChatLoading from './loading-screen/ChatLoading';

const ChatList = ({ setSeletedUser }) => {

  const getChatData = async () => {
    try {
      const { data } = await axiosInstance.get("/api/messages/chats");
      if (data.success) {
        return data.chatPartners;
      }
      return [];
    } catch (error) {
      toast.error(error.message);
      // CRITICAL: You must throw the error so React Query knows it failed!
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["ChatData"],
    queryFn: getChatData
  });

  if (error) return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;

  return (

    <>

      {isLoading && <ChatLoading />}

      <div className='flex flex-col gap-2 w-full'>

        {Array.isArray(data) &&
          data.map((item, index) => (

            <div
              key={item._id || index}
              className='flex items-center gap-5 w-full p-3 hover:bg-slate-700/50
             cursor-pointer transition-colors bg-white/10 rounded-lg'
              onClick={() => setSeletedUser(item?._id)}

            >

              {/* Avatar */}
              <div className='size-14 rounded-full overflow-hidden shrink-0'>
                <img
                  className='w-full h-full object-cover'
                  src={item?.profilePic || "/No-Pfp-Icon-Instagram.jpg"}
                  alt="User Logo"
                />
              </div>

              {/* Name */}
              <div className='flex flex-col overflow-hidden'>
                <h1 className='text-slate-300 font-semibold text-lg truncate'>
                  {item?.name ? item?.name?.[0].toUpperCase() + item?.name?.slice(1) : ""}
                </h1>
              </div>

            </div>
          ))}

      </div>

    </>

  );
};

export default ChatList;