import React, { useCallback } from 'react'
import axiosInstance from '../lib/axiosInstance';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const ChatContainer = ({ seletedUser }) => {

  const getMessagesByuserId = useCallback(async () => {

    try {

      const { data } = await axiosInstance.get(`/api/messages/${seletedUser}`)
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

  console.log(data);
  

  if (error) return <div>Error:{error.message}</div>

  return (
    <div>ChatContainer</div>
  )
}

export default ChatContainer