import React from 'react'

const ChatLoading = () => {

    return (
        <div className="flex flex-col gap-4 p-5 max-w-md mx-auto animate-pulse">

            <LoadingCard />

            <LoadingCard />

            <LoadingCard />

            <LoadingCard />

        </div>
    )
}

function LoadingCard() {

    return (
        <>
            <div className='flex flex-col gap-2 truncate'>
                {/* <!-- Incoming message skeleton --> */}
                <div className="flex gap-3 items-end">
                    <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                    <div className="h-10 w-48 rounded-2xl bg-gray-300"></div>
                </div>

                {/* <!-- Incoming message skeleton (shorter) --> */}
                <div className="flex gap-3">
                    <div className="h-10 w-32 rounded-2xl relative left-18 bg-gray-300"></div>
                </div>
            </div>
        </>
    )
}

export default ChatLoading