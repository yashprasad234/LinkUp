import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const SF = import.meta.env.VITE_APP_SRC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img className="sidebarFriendImg" src={SF + user.profilePicture} alt="" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}
