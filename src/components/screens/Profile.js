import React, { useEffect } from "react";
import NewArticleBtn from "../homepage_components/New_article_btn";
import ProfileHeader from "../profile_page/Profile_header";
import CurrentUserArticles from "../profile_page/Current_user_articles";
import UserDetails from "../profile_page/User_details";

function Profile() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <div>
      <ProfileHeader />
      <div>
        <UserDetails />
      </div>
      <div>
        <NewArticleBtn />
      </div>
      <div>
        <CurrentUserArticles />
      </div>
    </div>
  );
}

export default Profile;
