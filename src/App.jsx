import { useState } from "react";

const App = () => {
  const [password, setPassword] = useState("");
  // const [length, setLength] = useState(16);
  const [copy, setCopy] = useState("copy");
  const [strong, setStrong] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });
  const [msg, setMsg] = useState("");

  const handleErrorMsg = (value) => {
    if (value === "") {
      setMsg("");
      return;
    } else if (!strong.hasUppercase) {
      setMsg("min. one upper case");
    } else if (!strong.hasLowercase) {
      setMsg("min. one lower case latter");
    } else if (!strong.hasNumber) {
      setMsg("min one number");
    } else if (!strong.hasSpecialChar) {
      setMsg("min. one special character");
    } else {
      setMsg("");
    }
  };

  // const handleCreatePassword = () => {
  //   setCopy("copy");
  //   const charset =
  //     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  //   let newPass = "";
  //   for (let i = 0; i < length; i++) {
  //     let passCharIndex = Math.floor(Math.random() * charset.length);
  //     newPass += charset[passCharIndex];
  //   }
  //   setPassword(newPass);
  //   checkStrongness(newPass);
  // };

  const handleUserGenPass = (e) => {
    setCopy("copy");
    setPassword(e.target.value);
    checkStrongness(e.target.value);
    handleErrorMsg(e.target.value);
  };

  const checkStrongness = (password) => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+]/.test(password);
    const minLength = /^.{8,16}$/.test(password);

    setStrong({
      hasLowercase: hasLowercase,
      hasUppercase: hasUppercase,
      hasNumber: hasNumber,
      hasSpecialChar: hasSpecialChar,
      hasMinLength: minLength,
    });
  };

  const copyPass = () => {
    if (
      strong.hasLowercase &&
      strong.hasUppercase &&
      strong.hasNumber &&
      strong.hasSpecialChar &&
      strong.hasMinLength
    ) {
      setCopy("coppied");
      navigator.clipboard
        .writeText(password)
        .then(() => alert("Password copied to clipboard!"))
        .catch((err) => alert("Failed to copy password: " + err));
    } else {
      alert("generate strong password first");
    }
  };

  return (
    <div className="w-[90%] max-w-[800px] mx-auto mt-12 min-h-60 flex flex-col items-center justify-center bg-slate-200 ">
      <div className="flex   items-center gap-6 w-full px-4">
        <div className=" flex flex-1">
          <input
            type="text"
            className=" py-2 flex-1 px-4  "
            placeholder="generate random password"
            value={password}
            onChange={(e) => handleUserGenPass(e)}
          />
          <button className="py-2 px-4 rounded-sm bg-white" onClick={copyPass}>
            {copy}
          </button>
        </div>
        {/* <button
          className="py-2 px-4 rounded-sm bg-white"
          onClick={handleCreatePassword}
        >
          Create Password
        </button> */}
      </div>
      <p className={`${msg ? "text-red-600" : "hidden"}`}>{msg}</p>
      <div className="w-full min-h-32 bg-purple-300 mt-6 px-4 py-4">
        <div className={`flex justify-between  `}>
          <p>min. 8 character</p>
          <input type="checkbox" checked={strong.hasMinLength} />
        </div>
        <div className={`flex justify-between  `}>
          <p>min. one upperCase latter</p>
          <input type="checkbox" checked={strong.hasUppercase} />
        </div>
        <div className={`flex justify-between  `}>
          <p>min. one lowerCase latter</p>
          <input type="checkbox" checked={strong.hasLowercase} />
        </div>
        <div className={`flex justify-between  `}>
          <p>min. one number latter</p>
          <input type="checkbox" checked={strong.hasNumber} />
        </div>
        <div className={`flex justify-between  `}>
          <p>min. one special character</p>
          <input type="checkbox" checked={strong.hasSpecialChar} />
        </div>
      </div>
    </div>
  );
};

export default App;
