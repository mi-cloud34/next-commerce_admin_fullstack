"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const ResetPassword = () => {
    const router = useRouter();
    const { token, email } = router.query; // URL'deki token ve email

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        try {
            const res = await axios.post("/api/users/resetpassword", {
                token,
                email,
                password,
                confirmPassword,
            });

            setMessage(res.data.message);
            // 2 saniye sonra login sayfasına yönlendir
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.error || "Bir hata oluştu.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md max-w-md w-full">
                <h1 className="text-xl font-semibold mb-4">Şifreyi Sıfırla</h1>
                {message && <p className="text-green-600">{message}</p>}
                {error && <p className="text-red-600">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Yeni Şifre
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Şifreyi Onayla
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none"
                    >
                        Şifreyi Güncelle
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
