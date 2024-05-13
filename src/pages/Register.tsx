import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import {
  checkmarkOutline,
  logInOutline,
  personCircleOutline,
} from 'ionicons/icons';
import { Router } from 'react-router';

const Register = () => {
  const router = useIonRouter();

  const doRegister = (event: any) => {
    event.preventDefault();
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent scrollY={false}>
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol
              size="12"
              sizeMd="8"
              sizeLg="6"
              sizeXl="4"
            >
              <IonCard>
                <IonCardContent>
                  <form onSubmit={doRegister}>
                    <IonInput
                      fill="outline"
                      label="Email"
                      labelPlacement="floating"
                      type="email"
                      placeholder="yourname@company.com"
                    ></IonInput>
                    <IonInput
                      className="ion-margin-top"
                      fill="outline"
                      label="Password"
                      labelPlacement="floating"
                      type="password"
                    ></IonInput>

                    <IonButton
                      className="ion-margin-top"
                      type="submit"
                      expand="block"
                    >
                      Create my account
                      <IonIcon
                        slot="end"
                        icon={checkmarkOutline}
                      />
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

export default Register;
