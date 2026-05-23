import React, { useRef, useState } from 'react'
import { Image as ImageIcon, Send, X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import axiosInstance from '../../lib/axiosInstance';

const SendingMsg = ({ selectedUer }) => {

    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [image, setImage] = useState(null)

    // Create a reference to the hidden file input
    const inputRef = useRef(null)

    // Handles picking an image and showing a preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file)
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    //    Create a function to clear the image AND reset the input
    const removeFile = () => {
        setImagePreview(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    // Handle form submit
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imagePreview) return; // Don't send empty messages

        const formData = new FormData()
        formData.append("text", text)
        if (imagePreview) {
            formData.append("image", image)
        }

        try {

            const { data } = await axiosInstance.post(`/api/messages/send/${selectedUer?._id}`, formData)
            if (data.success) {
                // Clear the input after sending
                setText("");
                removeFile()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    };

    return (
        // shrink-0 ensures this bar never gets squished by the messages above it
        <div className='p-4 bg-slate-800/50 border-t border-slate-700/50 shrink-0 w-full'>
            <div className='max-w-3xl mx-auto w-full'>

                {/* Image Preview popup (Only shows if an image is selected) */}
                {imagePreview && (
                    <div className="relative inline-block mb-3">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="h-20 w-20 object-cover rounded-lg border border-slate-600"
                        />
                        <button
                            onClick={removeFile}
                            className="absolute -top-2 -right-2 bg-slate-700 text-slate-300 rounded-full p-1 hover:bg-slate-600 transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                )}

                {/* The Input Form */}
                <form onSubmit={handleSendMessage} className='flex items-center gap-3'>

                    {/* Image Picker Button */}
                    <label
                        htmlFor="image-upload"
                        className='cursor-pointer text-slate-400 hover:text-slate-200 transition-colors p-2 bg-slate-900/50 hover:bg-slate-700 rounded-full'
                    >
                        <ImageIcon size={22} />
                        {/* Hidden file input */}
                        <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                            ref={inputRef}
                        />
                    </label>

                    {/* Text Input Field */}
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className='flex-1 bg-slate-900 border border-slate-700 text-slate-200
                         placeholder-slate-400 text-[15px] rounded-full px-5 py-2.5 focus:outline-none focus:border-blue-500
                             focus:ring-1 focus:ring-blue-500 transition-all'
                    />

                    {/* Send Button */}
                    <button
                        type="submit"
                        disabled={!text.trim() && !imagePreview}
                        className={`p-2.5 rounded-full flex items-center justify-center transition-colors ${text.trim() || imagePreview
                            ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        <Send size={20} className='ml-0.5' /> {/* ml-0.5 slightly centers the paper airplane visually */}
                    </button>

                </form>
            </div>
        </div>
    )
}

export default SendingMsg