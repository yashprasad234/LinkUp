import { useEffect, useState } from "react";
import "./conversation.css";
import axios from "axios";

export default function Conversation({ conv, currentUser }) {
  const REQUEST_URL = "http://localhost:3000/api/";
  const [user, setUser] = useState(null);
  const SF = import.meta.env.VITE_APP_SRC_FOLDER;

  // console.log(conv._id);

  // console.log(currentUser);
  useEffect(() => {
    // console.log("hello, im in useEffect");
    const friendId = conv.members.find((m) => m !== currentUser._id);
    // console.log(friendId);
    const getUser = async () => {
      try {
        const res = await axios.get(`${REQUEST_URL}users?userId=${friendId}`);
        // console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conv]);

  // console.log(user);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? SF + user.profilePicture
            : SF + "person/noAvatar.png"
        }
        alt="groot"
        className="coversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}
