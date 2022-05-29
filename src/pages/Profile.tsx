import Headers from "../components/Header";
import ProfileCard from "../components/ProfileCard";
import UserList from "../components/UserList";

const Profile = () => {
  return (
    <div className="h-screen pl-10 pr-10">
      <Headers setCurrentConvId={null} />
      <div className="flex">
        <ProfileCard />
        <UserList />
      </div>
    </div>
  );
};

export default Profile;
