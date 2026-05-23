import React from 'react'
import { MessageCircleWarning } from 'lucide-react';

const NoConversationPlaceholder = () => {
  return (
    <div className='flex w-full h-full justify-center items-center'>
      <div className='flex flex-col items-center gap-3'>

        <div className='flex size-25 rounded-full bg-blue-600 items-center justify-center'>
          <MessageCircleWarning size={60} className='text-slate-300' />
        </div>
        <h1 className='font-bold text-2xl text-slate-300'>Select a Conversation</h1>
        <p className='text-center'>
          Choose a Contact from the sidebar to start chatting or <br />
          Continue a previouse conversation.
        </p>
      </div>
    </div>
  )
}

export default NoConversationPlaceholder