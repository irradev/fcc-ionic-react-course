import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';

const Tab1Page = () => {
  const [image, setImage] = useState<string | null>(null);

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      // resultType: CameraResultType.Uri,
      resultType: CameraResultType.Base64,
    });

    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    // var imageUrl = image.webPath;

    // Can be set to the src of an image now
    // imageElement.src = imageUrl;

    const img = `data:image/jpeg;base64,${image.base64String}`;
    setImage(img);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton
          expand="full"
          onClick={takePicture}
        >
          Take picture
        </IonButton>
        {image ? (
          <img
            src={image}
            alt=""
          />
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default Tab1Page;
