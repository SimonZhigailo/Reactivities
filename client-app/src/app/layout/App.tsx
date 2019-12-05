import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { observer } from "mobx-react-lite";
import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import NotFound from "./NotFound";
import { ToastContainer } from "react-toastify";
import { RootStoreContext } from "app/stores/rootStore";

//принимает RouteComponentProps который содержит история перехода между страницами и прочие объекты Routing
const App: React.FC<RouteComponentProps> = ({ location }) => {
  //подключение к контексту хранилища состояний MobX
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial } = rootStore.activityStore;

  //хук при рендеринге или изменению компонента, второй аргумент в виде массива говорит о 1)если пустой, что он срабатывает только при загрузке, не обновлении (DidMount && !didUpdate) 2)если массив не пустой, при изменении праметра в массиве или при загрузке (didMount && didUpdate(activityStore))
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  //показывает загрузку, пока activityStore обрабатывает что-нибудь
  if (loadingInitial) return <LoadingComponent content="Loading activities" />;

  return (
    <Fragment>
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"} //если путь не / то рендерится всё что ниже
        render={() => (
          <Fragment>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              {/* switch говорит что каждый из Routes эксклюзивен и не прогружается больше одного раза(не прогружается на главной странице) */}
              <Switch>
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route path="/activities/:id" component={ActivityDetails} />

                <Route
                  path={["/createActivity", "/manage/:id"]}
                  component={ActivityForm}
                  key={location.key} //добавляем ключ в виде ключа location , что бы когда менялся props, компонент пересоздовался, Fully Uncontrolled Component with a key to reset component state
                />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};
//для наблюдения за общим хранилищем состояний MobX наобходимо зарегестрировать данный класс как обозреватель, withRouter позволяет использовать объект location
export default withRouter(observer(App));
