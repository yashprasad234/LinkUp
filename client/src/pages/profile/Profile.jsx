import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Profile() {
  const SF = import.meta.env.VITE_APP_SRC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  console.log(username);
  const REQUEST_URL = "http://localhost:3000/api/";

  useEffect(() => {
    console.log("useEffect called");
    const fetchUser = async () => {
      try {
        console.log("entered try");
        const response = await axios.get(
          `${REQUEST_URL}users?username=${username}`
        );
        console.log(response);
        console.log(response.data);
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={
                  user.coverPicture
                    ? `${SF}${user.coverPicture}`
                    : `${SF}person/noCover.png`
                }
                alt="cover-img"
                className="profileCoverImg"
              />
              <img
                src={
                  user.profilePicture
                    ? `${SF}${user.profilePicture}`
                    : `${SF}person/noAvatar.png`
                }
                alt="profile-img"
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
