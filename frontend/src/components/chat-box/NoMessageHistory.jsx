import { MessageSquareDashed } from 'lucide-react'
import React from 'react'

const NoMessageHistory = ({ name }) => {
    return (
        <div className='flex w-full h-full justify-center items-center'>
            <div className='flex flex-col items-center gap-3'>

                <div className='flex size-24 rounded-full bg-blue-600/20 items-center justify-center'>
                    <MessageSquareDashed size={50} className='text-blue-500' />
                </div>

                <h1 className='font-bold text-2xl text-slate-300'>No messages yet</h1>

                <p className='text-center text-slate-400'>
                    You haven't chatted with {name ? name : "this user"} yet. <br />
                    Send a message below to say hi!
                </p>

            </div>
        </div>
    )
}

export default NoMessageHistory