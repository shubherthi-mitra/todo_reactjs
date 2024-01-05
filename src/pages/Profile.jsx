import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";

const Profile = () => {
  const { isAuthenticated, loading, user } = useContext(Context);

  if (isAuthenticated) {
    return loading ? (
      <Loader />
    ) : (
      <div>
        <h1>{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
    );
  }else {
    return (
      <div>
        <h1>...</h1>
      </div>
    );
  }
};

export default Profile;
