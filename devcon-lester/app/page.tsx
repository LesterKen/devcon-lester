import { useEffect, useRef } from "react";

export default function Home() {
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const threshold = 100; // Distance in pixels within which the button will move
  const originalPosition = useRef({ left: 0, top: 0 });
  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!loginButtonRef.current) return;

      clearTimeout(timeoutId.current); // Clear the timeout if mouse is moving

      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const rect = loginButtonRef.current.getBoundingClientRect();

      const buttonX = rect.left + rect.width / 2;
      const buttonY = rect.top + rect.height / 2;

      const distanceX = mouseX - buttonX;
      const distanceY = mouseY - buttonY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < threshold) {
        const moveX = (distanceX / distance) * 50;
        const moveY = (distanceY / distance) * 50;
        const newLeft = rect.left - moveX;
        const newTop = rect.top - moveY;

        loginButtonRef.current.style.position = "absolute";
        loginButtonRef.current.style.left = `${newLeft}px`;
        loginButtonRef.current.style.top = `${newTop}px`;
      }

      timeoutId.current = window.setTimeout(() => {
        // Return the button to its original position after 5 seconds
        if (loginButtonRef.current) {
          loginButtonRef.current.style.left = `${originalPosition.current.left}px`;
          loginButtonRef.current.style.top = `${originalPosition.current.top}px`;
        }
      }, 5000);
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Store the button's original position
    if (loginButtonRef.current) {
      originalPosition.current = {
        left: loginButtonRef.current.offsetLeft,
        top: loginButtonRef.current.offsetTop,
      };
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container">
        <div className="login-box">
          <h2>Login</h2>
          <form>
            <div className="user-box">
              <input type="text" name="username" required />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input type="password" name="password" required />
              <label>Password</label>
            </div>
            <button type="button" id="login-btn" ref={loginButtonRef}>
              Login
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: #f2f2f2;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
        }

        .container {
          text-align: center;
        }

        .login-box {
          background: #fff;
          padding: 40px;
          border-radius: 10px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        h2 {
          margin: 0 0 20px;
        }

        .user-box {
          position: relative;
          margin-bottom: 30px;
        }

        .user-box input {
          width: 100%;
          padding: 10px;
          background: #f0f0f0;
          border: none;
          outline: none;
          border-radius: 5px;
        }

        .user-box label {
          position: absolute;
          top: 10px;
          left: 10px;
          color: #999;
          pointer-events: none;
          transition: 0.5s;
        }

        .user-box input:focus ~ label,
        .user-box input:valid ~ label {
          top: -20px;
          left: 10px;
          color: #333;
          font-size: 12px;
        }

        #login-btn {
          display: inline-block;
          background: #007bff;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.2s;
        }

        #login-btn:hover {
          background: #0056b3;
        }
      `}</style>
    </main>
  );
}
