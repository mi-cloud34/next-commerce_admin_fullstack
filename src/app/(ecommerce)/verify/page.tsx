"use client"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function VerifyForm() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     await axios.post("/api/users/verify", {
          email,
          verificationCode,
  
      }).then((res) => {
        if (res.status==200) {
            console.log("işlem başarılı", res.data);
            
              router.push("/"); // Doğrulama sayfasına yönlendir.
            setMessage("Hesabınız başarıyla doğrulandı.");
          }  else {
            setError(res.data.error);
            setMessage("");
          }
      }).catch(() =>{
        setMessage("");
        setError("Doğrulama kodu yanlış. Lütfen tekrar deneyin.");
      });

      
      
    } catch (err) {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
      setMessage("");
    }
  };

  return (
    <div>
      <h1>Hesap Doğrulama</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-posta:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="code">Doğrulama Kodu:</label>
          <input
            type="text"
            id="code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Doğrula</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
