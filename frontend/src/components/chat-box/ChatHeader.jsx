import React, { useEffect } from 'react'
import { XIcon } from 'lucide-react'

const ChatHeader = ({ seletedUser, setSeletedUser }) => {

    useEffect(() => {

        const handleKey = (e) => {
            if (e.key === "Escape") setSeletedUser(null)
        }

        window.addEventListener("keydown", handleKey)

        //cleanup function

        return () => window.removeEventListener("keydown", handleKey)

    }, [setSeletedUser])

    return (
        <div className='flex justify-between bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] p-6'>
            <div className='flex items-center space-x-3'>

                <div className='Online'>
                    <div className='size-14 rounded-full overflow-hidden'>
                        <img className='w-full h-full object-cover' src={seletedUser?.profilePic || "/No-Pfp-Icon-Instagram.jpg"} alt="" />
                    </div>
                </div>

                <div>
                    <h3 className='text-slate-200 font-medium'>
                        {
                            seletedUser?.name ? seletedUser?.name?.[0].toUpperCase() + seletedUser?.name?.slice(1) : "UserName"
                        }
                    </h3>
                    <p className='text-slate-400 text-sm'>Online</p>
                </div>
            </div>

            <button onClick={() => setSeletedUser(null)}>
                <XIcon className='size-5 text-slate-400 hover:text-slate-200 transition-colors' />
            </button>

        </div>
    )
}

export default ChatHeader