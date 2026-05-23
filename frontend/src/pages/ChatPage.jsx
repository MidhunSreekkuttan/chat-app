import React, { useEffect, useState } from 'react'
import ProfileHeader from '../components/ProfileHeader'
import ActiveTabSwitch from '../components/ActiveTabSwitch'
import ChatList from '../components/ChatList'
import ContactList from '../components/ContactList'
import ChatContainer from '../components/chat-box/ChatContainer'
import NoConversationPlaceholder from '../components/NoConversationPlaceholder'

const ChatPage = () => {

  const [activeTab, setActiveTab] = useState("chats")
  const [seletedUser, setSeletedUser] = useState(null)

  return (
    <div className='relative flex min-w-screen min-h-screen justify-center items-center text-white'>
      <div className='flex w-6xl h-[700px] p-4 bg-slate-900 rounded-2xl'>

        {/* Left Side */}
        <div className='flex flex-col w-80 h-full bg-slate-800/80 backdrop-blur-sm rounded-l-lg'>
          <ProfileHeader />
          <ActiveTabSwitch setActiveTab={setActiveTab} activeTab={activeTab} />

          <div className='flex-1 overflow-y-auto p-4 space-y-2'>
            {
              activeTab === "chats" ?
                <ChatList setSeletedUser={setSeletedUser} /> :
                <ContactList setSeletedUser={setSeletedUser} />
            }
          </div>
        </div>

        {/* Right Side */}
        <div className='flex flex-1 flex-col w-full h-full bg-slate-900 backdrop-blur-sm rounded-r-lg'>
          {seletedUser ? <ChatContainer key={seletedUser._id} seletedUser={seletedUser} /> : <NoConversationPlaceholder />}
        </div>

      </div>
    </div>
  )
}

export default ChatPage