import { useEffect, useState } from "react";
import "./chatOnline.css";
import axios from "axios";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const REQUEST_URL = "http://localhost:3000/api/";
  const SF = import.meta.env.VITE_APP_SRC_FOLDER;

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await axios.get(`${REQUEST_URL}users/friends/${currentId}`);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchFriends();
  }, []);

  console.log(friends);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${REQUEST_URL}conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend"
          onClick={() => {
            handleClick(o);
          }}
        >
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o.profilePicture
                  ? SF + o.profilePicture
                  : SF + "person/noAvatar.png"
              }
              alt="pfp"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o.username}</span>
        </div>
      ))}
    </div>
  );
}
