import "./userFriend.css";

export default function UserFriend({ friend }) {
  const SF = import.meta.env.VITE_APP_SRC_FOLDER;

  return (
    <div className="rightbarFollowing">
      <img
        src={
          friend.profilePicture
            ? SF + friend.profilePicture
            : SF + "person/noAvatar.png"
        }
        alt="following-img"
        className="rightbarFollowingImg"
      />
      <span className="rightbarFollowingName">{friend.username}</span>
    </div>
  );
}
