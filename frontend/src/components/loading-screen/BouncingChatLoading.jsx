import React from 'react'

const BouncingChatLoading = () => {
    return (
        // flex-col to keep it centered and looking natural inside your chat window
        <div className="flex justify-center items-center p-6 w-full h-full">

            {/* The chat bubble shape matching your dark slate theme */}
            <div className="flex items-center justify-center gap-1.5 bg-slate-800 py-4 px-6 rounded-t-3xl rounded-br-3xl rounded-bl-sm border border-slate-700/50 shadow-md">

                {/* Staggered bouncing dots matching your slate-400 text color */}
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2.5 h-2.5 bg-slate-400 rounded-full animate-bounce"></div>

            </div>

        </div>
    )
}

export default BouncingChatLoading