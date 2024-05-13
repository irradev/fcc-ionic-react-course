import {
  CreateAnimation,
  Gesture,
  GestureDetail,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  createGesture,
  useIonViewDidEnter,
} from '@ionic/react';
import { useRef } from 'react';

const Tab2Page = () => {
  const animationRef = useRef<CreateAnimation | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useIonViewDidEnter(() => {
    animationRef.current?.animation.play();

    const gesture: Gesture = createGesture({
      el: elementRef.current!,
      gestureName: 'my-gesture',
      threshold: 0,
      // onMove: (ev) => {
      //   console.log(ev);
      // },
      onStart: onStartHandler,
      onMove: onMoveHandler,
      onEnd: onEndHandler,
    });

    gesture.enable();
  });

  const onStartHandler = () => {
    elementRef.current!.style.transition = 'none';
  };
  const onMoveHandler = (detail: GestureDetail) => {
    const x = detail.currentX - detail.startX;
    const y = detail.currentY - detail.startY;

    elementRef.current!.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onEndHandler = () => {
    elementRef.current!.style.transition = 'transform 0.2s ease-out';
    elementRef.current!.style.transform = 'translate(0px, 0px)';
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Privacity and Security</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="ion-padding"
        scrollY={false}
      >
        <CreateAnimation
          ref={animationRef}
          duration={2000}
          iterations={Infinity}
          delay={1000}
          keyframes={[
            { offset: 0, transform: 'scale(1)', opacity: 1 },
            { offset: 0.5, transform: 'scale(1.5)', opacity: 0.5 },
            { offset: 1, transform: 'scale(1)', opacity: 1 },
          ]}
        >
          <IonButton
            className="ion-margin"
            color="primary"
            expand="block"
          >
            Join Ionic Academy
          </IonButton>
        </CreateAnimation>
        <div
          ref={elementRef}
          style={{ width: 50, height: 50, backgroundColor: 'tomato' }}
        ></div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2Page;
