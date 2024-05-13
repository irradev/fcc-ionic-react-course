import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Redirect, Route } from 'react-router';
import Tab1Page from './Tab1';
import Tab2Page from './Tab2';
import { lockClosedOutline, personOutline } from 'ionicons/icons';

const SettingsPage = () => {
  return (
    <IonTabs>
      <IonTabBar slot="bottom">
        <IonTabButton
          tab="tab1"
          href="/app/settings/tab1"
        >
          <IonIcon icon={personOutline} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="tab2"
          href="/app/settings/tab2"
        >
          <IonIcon icon={lockClosedOutline} />
          <IonLabel>Security</IonLabel>
        </IonTabButton>
      </IonTabBar>

      <IonRouterOutlet>
        <Route
          path="/app/settings/tab1"
          component={Tab1Page}
        />
        <Route
          path="/app/settings/tab2"
          component={Tab2Page}
        />
        <Route
          path="/app/settings"
          exact
        >
          <Redirect to="/app/settings/tab1" />
        </Route>
      </IonRouterOutlet>
    </IonTabs>
  );
};

export default SettingsPage;
