import { useEffect, useState } from "react";

const USERNAME_MIN_LENGTH = 3; // Adjust as needed
const USERNAME_MAX_LENGTH = 20; // Adjust as needed

const useUsernameValidation = (
  username: string | null,
  status: string | null,
  message: string | null,
  invalidUsernames: string[],
  setInvalidUsernames: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const [isUsernameGood, setUsernameGood] = useState(false);

  useEffect(() => {
    if (!username) return;
    const trimmedUsername = username.trim();

    const isGood =
      status !== "ERROR" &&
      message !== "USERNAME INVALID" &&
      trimmedUsername.length > USERNAME_MIN_LENGTH &&
      trimmedUsername.length < USERNAME_MAX_LENGTH &&
      !invalidUsernames.includes(trimmedUsername);

    setUsernameGood(isGood);

    if (!isGood && !invalidUsernames.includes(trimmedUsername)) {
      setInvalidUsernames((prev) => [...prev, trimmedUsername]);
    }
  }, [username, status, message, setInvalidUsernames, invalidUsernames]); // Removed `invalidUsernames` to avoid unnecessary re-renders

  return isUsernameGood;
};

export default useUsernameValidation;
