import React, { useState, useRef, useCallback } from "react";
import { Eye, EyeOff, Lock, Shield, ArrowRight, User } from "lucide-react";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {

    const navigate = useNavigate()

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [newPassword, setNewPassword] = useState("");
    const [email, setEmail] = useState('')
    const [showNewPassword, setShowNewPassword] = useState(false);

    const inputRefs = useRef([]);

    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleBackspace = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const sendOtp = useCallback(async () => {

        try {

            if (!email) {
                return toast.error("Email Must Enter")
            }

            const { data } = await axiosInstance.post("/api/user/sendOtp", { email })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-right"
            })
        }

    }, [axiosInstance, email])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const { data } = await axiosInstance.post("/api/user/forgetPassword",
                { email, otp: otp.join(''), password: newPassword })

            if (data.success) {
                navigate("/login")
                toast.success(data.message)
            } else {
                toast.error(data.message, {
                    position: "top-right"
                })
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message, {
                position: "top-right"
            })
        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#020308] px-4 relative overflow-hidden font-sans select-none">

            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-[-15%] -translate-y-1/2 w-[700px] h-[700px] bg-[#0044ff] rounded-full blur-[180px] opacity-25 pointer-events-none" />
            <div className="absolute top-1/2 right-[-15%] -translate-y-1/2 w-[700px] h-[700px] bg-[#ff003c] rounded-full blur-[180px] opacity-25 pointer-events-none" />

            {/* Main Card Container */}
            <div className="relative w-full max-w-[540px] z-10">

                {/* Neon Frame Gradient Border */}
                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-[#0055ff] via-[#101423] to-[#ff003c] p-[1.5px] opacity-80 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                    <div className="w-full h-full bg-[#070912] rounded-[30px]" />
                </div>

                {/* Intense Left Blue Neon Streak */}
                <div className="absolute -left-[1px] top-[15%] bottom-[15%] w-[2px] bg-[#0066ff] shadow-[0_0_20px_5px_rgba(0,102,255,0.7),_0_0_40px_10px_rgba(0,102,255,0.4)] blur-[0.5px]" />

                {/* Intense Right Red Neon Streak */}
                <div className="absolute -right-[1px] top-[15%] bottom-[15%] w-[2px] bg-[#ff003c] shadow-[0_0_20px_5px_rgba(255,0,60,0.7),_0_0_40px_10px_rgba(255,0,60,0.4)] blur-[0.5px]" />

                {/* Glassmorphic Inner Content */}
                <div className="relative rounded-[30px] bg-[#090b14]/90 backdrop-blur-2xl w-full h-full px-8 py-12 md:px-14 flex flex-col items-center border-[0.5px] border-white/5">

                    {/* App Icon (Lock + Lightning) */}
                    <div className="w-[64px] h-[64px] rounded-[20px] mb-6 bg-gradient-to-b from-[#4A55FF] via-[#8532FF] to-[#D115FF] flex items-center justify-center relative shadow-[0_8px_20px_rgba(133,50,255,0.3)] border border-white/20">
                        <Lock size={26} className="text-white fill-white/10" strokeWidth={2} />
                        <span className="absolute bottom-1 right-2 text-[#ff003c] text-sm font-black drop-shadow-[0_0_5px_rgba(255,0,60,0.8)]">⚡</span>
                    </div>

                    {/* Header */}
                    <h1 className="text-center text-[28px] font-black text-white tracking-widest uppercase m-0 leading-tight">
                        Reset Password
                    </h1>
                    <p className="text-center text-[#8e95aa] text-[13px] mt-2 mb-8 max-w-[300px]">
                        Enter the OTP sent to your email and set a new password
                    </p>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">

                        {/* Enter email */}
                        <div className="w-full">
                            <label className="flex items-center gap-2 text-[11px] text-[#ff003c] font-bold tracking-[0.15em] uppercase mb-3">
                                <User size={14} className="stroke-[2.5px]" /> Enter Email
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter Your Email"
                                    className="w-full h-[52px] px-4 rounded-[14px] bg-[#0e1222] border border-white/10
                                         text-white text-sm tracking-wide focus:border-[#ff003c] focus:ring-1
                                             focus:ring-[#ff003c]/40 outline-none transition-all placeholder:text-[#5a6072]"
                                />

                            </div>
                        </div>

                        {/* OTP Section */}
                        <div className="w-full">
                            <label className="flex items-center gap-2 text-[11px] text-[#0066ff] font-bold tracking-[0.15em] uppercase mb-3">
                                <Shield size={14} className="stroke-[2.5px]" /> Enter OTP
                            </label>

                            <div className="flex justify-between gap-2 sm:gap-3">
                                {otp.map((val, i) => (
                                    <input
                                        key={i}
                                        ref={(el) => (inputRefs.current[i] = el)}
                                        value={val}
                                        maxLength={1}
                                        onChange={(e) => handleOtpChange(e.target.value, i)}
                                        onKeyDown={(e) => handleBackspace(e, i)}
                                        placeholder="•"
                                        className="w-full h-[56px] text-center text-white text-xl bg-[#0e1222] border border-white/10 rounded-[14px] focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff]/40 outline-none transition-all placeholder:text-gray-600 placeholder:text-2xl"
                                    />
                                ))}
                            </div>

                            <p className="text-[12px] text-gray-500 mt-4 flex justify-center gap-1 sm:justify-start sm:ml-1 tracking-wide">
                                Didn't receive the code?{" "}
                                <button
                                    onClick={sendOtp}
                                    type="button" className="text-[#ff003c] hover:text-[#ff3360] font-medium
                                         transition-colors">
                                    Send OTP
                                </button>
                            </p>
                        </div>

                        {/* "THEN" Divider */}
                        <div className="flex items-center justify-center w-full py-2 opacity-80">
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
                            <span className="text-[9px] text-[#6b7280] font-bold tracking-[0.3em] px-4 uppercase">Then</span>
                            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
                        </div>

                        {/* New Password Section */}
                        <div className="w-full">
                            <label className="flex items-center gap-2 text-[11px] text-[#ff003c] font-bold tracking-[0.15em] uppercase mb-3">
                                <Lock size={14} className="stroke-[2.5px]" /> New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full h-[52px] px-4 rounded-[14px] bg-[#0e1222] border border-white/10
                                         text-white text-sm tracking-wide focus:border-[#ff003c] focus:ring-1
                                             focus:ring-[#ff003c]/40 outline-none transition-all placeholder:text-[#5a6072]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5a6072]
                                         hover:text-gray-300 transition-colors"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full h-[56px] rounded-[14px] font-black tracking-[0.15em] uppercase text-white
                                 bg-gradient-to-r from-[#0044ff] via-[#b30071] to-[#ff003c] hover:opacity-95 transform
                                     hover:scale-[1.01] transition-all flex items-center justify-center gap-3
                                         shadow-[0_10px_30px_-10px_rgba(255,0,60,0.5)] relative overflow-hidden"
                        >
                            Reset Password
                            <ArrowRight size={20} className="stroke-[2.5px]" />
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default ForgetPassword