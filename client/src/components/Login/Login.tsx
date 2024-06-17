import React, { useState } from "react";
import bcrypt from "bcryptjs-react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(" http://localhost:3000/user");
      const users = response.data;
      const user = users.find((item: any) => item.email === email);
      if (!user) {
        alert("Email không đúng.");
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        alert("Mật khẩu không đúng.");
        return;
      }
      alert("Đăng nhập thành công!");
    } catch (error) {
      console.error("Có lỗi xảy ra khi đăng nhập!", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Đăng nhập</h1>
        <label htmlFor="signInEmail" className="login-label">
          Email
        </label>
        <input
          type="email"
          id="signInEmail"
          placeholder="Email"
          required
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="signInPassword" className="login-label">
          Mật khẩu
        </label>
        <input
          type="password"
          id="signInPassword"
          placeholder="Mật khẩu"
          required
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
