import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { RootStore, RootStoreContext } from "app/stores/rootStore";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";

interface RouteParams {
  username: string;
}
//берем из Route username
interface IProps extends RouteComponentProps<RouteParams> {}

const ProfilePage: React.FC<IProps> = ({ match }) => {
  const rootStore = useContext(RootStoreContext);
  const { loadProfile, profile, loadingProfile } = rootStore.profileStore;
  useEffect(() => {
    //вставляем из пути имя юзера
    loadProfile(match.params.username);
    //при обновлении параметра ререндериться всё что выше
  }, [loadProfile, match]);

  //индикатор загрузки
  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile!} />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
