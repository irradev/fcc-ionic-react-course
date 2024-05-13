import {
  IonCard,
  IonContent,
  IonCardContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonIcon,
  useIonRouter,
  useIonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import GeneticData from '../assets/genetic-data.svg';
import { useEffect, useState } from 'react';
import { Intro } from '../components/Intro';
import { Preferences } from '@capacitor/preferences';

const INTRO_KEY = 'intro-seen';

const Login = () => {
  const router = useIonRouter();
  const [introSeen, setIntroSeen] = useState(true);
  const [present, dismiss] = useIonLoading();

  useEffect(() => {
    const checkStorage = async () => {
      const seen = await Preferences.get({ key: INTRO_KEY });
      setIntroSeen(seen.value === 'true');
    };

    checkStorage();
  }, []);

  const doLogin = (event: any) => {
    event.preventDefault();
    present('Logging in...');
    setTimeout(() => {
      dismiss();
      router.push('/app', 'root', 'replace');
    }, 2000);

    // router.push('/app', 'forward', 'replace');
  };

  const finishIntro = async () => {
    setIntroSeen(true);
    await Preferences.set({ key: INTRO_KEY, value: 'true' });
  };

  const setIntroAgain = async () => {
    setIntroSeen(false);
    await Preferences.remove({ key: INTRO_KEY });
  };

  if (!introSeen) return <Intro onFinish={finishIntro} />;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        scrollY={false}
        className="ion-padding"
      >
        <IonGrid fixed>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              sizeMd="8"
              sizeLg="6"
              sizeXl="4"
            >
              <div className="ion-text-center ion-padding ">
                <img
                  src={GeneticData}
                  alt="Logo"
                  width={'50%'}
                  // style={{ maxWidth: '300px' }}
                />
              </div>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              sizeMd="8"
              sizeLg="6"
              sizeXl="4"
            >
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doLogin}>
                    <IonInput
                      mode="md"
                      fill="outline"
                      label="Email"
                      labelPlacement="floating"
                      type="email"
                      placeholder="yourname@company.com"
                    ></IonInput>
                    <IonInput
                      mode="ios"
                      className="ion-margin-top"
                      fill="outline"
                      label="Password"
                      labelPlacement="floating"
                      type="password"
                    ></IonInput>

                    <IonButton
                      mode="ios"
                      className="ion-margin-top"
                      type="submit"
                      expand="block"
                    >
                      Login
                      <IonIcon
                        slot="end"
                        icon={logInOutline}
                      />
                    </IonButton>
                    <IonButton
                      routerLink="/register"
                      className="ion-margin-top"
                      color="secondary"
                      type="button"
                      expand="block"
                    >
                      Create account
                      <IonIcon
                        slot="end"
                        icon={personCircleOutline}
                      />
                    </IonButton>
                    <IonButton
                      className="ion-margin-top"
                      fill="clear"
                      expand="block"
                      size="small"
                      color="medium"
                      type="button"
                      onClick={setIntroAgain}
                    >
                      Watch intro again
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
