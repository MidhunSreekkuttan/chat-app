import React from 'react'

const ActiveTabSwitch = ({ activeTab, setActiveTab }) => {
  return (
    <div className='relative flex justify-between gap-2 p-2'>

      <button onClick={() => setActiveTab("chats")}
        className={`w-full p-2 text-center rounded-md ${activeTab === "chats" ? "bg-amber-700 text-slate-300" : ""}`}>
        Chats
      </button>

      <button onClick={() => setActiveTab("contacts")}
        className={`w-full p-2 text-center rounded-md ${activeTab === "contacts" ? "bg-amber-700 text-slate-300" : ""}`}>
        Contacts
      </button>

    </div>
  )
}

export default ActiveTabSwitch