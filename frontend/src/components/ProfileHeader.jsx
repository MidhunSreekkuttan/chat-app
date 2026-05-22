import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../lib/UserContext'
import toast from 'react-hot-toast'
import { Loader, LogOut } from 'lucide-react';
import axiosInstance from '../lib/axiosInstance';

const ProfileHeader = () => {

  const { logout, authState, userData, getUserData } = useContext(UserContext)
  const [selectedImg, setSelectedImg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const fileInputRef = useRef(null)

  const handleImageUpload = async (e) => {
    try {
      setIsLoading(true)

      const file = e.target.files[0]
      if (!file) return

      // 1. Show preview instantly
      const imageUrl = URL.createObjectURL(file)
      setSelectedImg(imageUrl)

      // 2. Prepare form data for backend
      const formData = new FormData()
      formData.append("profilePic", file)

      // 3. Call backend API
      const { data } = await axiosInstance.put("/api/user/updateProfile", formData)
      if (data.success) {
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className='p-6 border-b border-black'>
      <div className='flex items-center gap-3'>

        {/* Avatar */}
        <div className='rounded-full'>
          <button disabled={isLoading}
            className='relative group size-14 rounded-full overflow-hidden'
            onClick={() => fileInputRef.current.click()}
          >

            <img src={selectedImg || userData?.profilePic || "/No-Pfp-Icon-Instagram.jpg"} alt="User image"
              className={`size-full object-cover ${isLoading ? "opacity-50" : ""}`}
            />

            {isLoading ? (
              <div className='absolute inset-0 flex items-center justify-center bg-black/40'>
                <Loader className='size-5 animate-spin text-white' />
              </div>
            ) : (
              <div className='absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center
                     transition-opacity'>
                <span className='text-white text-xs'>Change</span>
              </div>
            )}

          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className='hidden'
          />
        </div>

        {/* User Name */}
        <div>
          <h3 className='text-slate-200 font-medium text-base max-w-[180px] truncate'>
            {userData?.name ? userData?.name?.[0]?.toUpperCase() + userData?.name?.slice(1) : ""}
          </h3>
          <p className='text-slate-400 text-xs'>Online</p>
        </div>

        {/* Logout */}
        <div className='flex items-center'>
          <button
            onClick={logout}
            className='text-slate-400 hover:text-slate-200 transition-all relative left-25'>
            <LogOut className='size-5' />
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProfileHeader