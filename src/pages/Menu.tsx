import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import ListPage from './List';
import { Redirect, Route } from 'react-router';
import SettingsPage from './Settings';
import { homeOutline, logOutOutline, settingsOutline } from 'ionicons/icons';
import './Menu.css';

const Menu = () => {
  const paths = [
    { name: 'Home', url: '/app/list', icon: homeOutline },
    { name: 'Settings', url: '/app/settings', icon: settingsOutline },
  ];

  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <IonMenu contentId="main">
          <IonHeader>
            <IonToolbar color="secondary">
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                background: 'var(--ion-item-background)',
              }}
            >
              <div>
                {paths.map((path) => (
                  <IonMenuToggle
                    key={path.name}
                    autoHide={false}
                  >
                    <IonItem
                      detail={true} // Defualts true. If false, removes the arrow in IOS
                      routerLink={path.url}
                      routerDirection="none"
                    >
                      <IonIcon
                        slot="start"
                        icon={path.icon}
                      />
                      <IonLabel>{path.name}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}
              </div>

              <IonMenuToggle
                autoHide={false}
                className=" ion-margin-bottom  ion-padding"
              >
                <IonButton
                  className=""
                  expand="full"
                  routerLink="/"
                  routerDirection="root"
                >
                  <IonIcon
                    slot="start"
                    icon={logOutOutline}
                  />
                  <IonLabel>Logout</IonLabel>
                </IonButton>
              </IonMenuToggle>
            </div>
          </IonContent>
        </IonMenu>
        <IonRouterOutlet id="main">
          <Route
            exact
            path="/app/list"
            component={ListPage}
          />
          <Route
            path="/app/settings"
            component={SettingsPage}
          />
          <Route
            exact
            path="/app"
          >
            <Redirect to="/app/list" />
          </Route>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

export default Menu;
