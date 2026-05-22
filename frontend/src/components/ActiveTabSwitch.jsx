import React from 'react'

const ActiveTabSwitch = ({ activeTab, setActiveTab }) => {
  return (
    <div className='relative flex justify-between gap-2 p-2'>

      <button onClick={() => setActiveTab("chats")}
        className={`w-full p-2 text-center rounded-md text-white ${activeTab === "chats" ? "bg-blue-600" : ""}`}>
        Chats
      </button>

      <button onClick={() => setActiveTab("contacts")}
        className={`w-full p-2 text-center rounded-md text-white ${activeTab === "contacts" ? "bg-blue-600" : ""}`}>
        Contacts
      </button>

    </div>
  )
}

export default ActiveTabSwitch