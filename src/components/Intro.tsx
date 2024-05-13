import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import './Intro.css';

import Intro1Svg from '../assets/intro/slide-1.svg';
import Intro2Svg from '../assets/intro/slide-2.svg';
import Intro3Svg from '../assets/intro/slide-3.svg';
import { IonButton, IonText } from '@ionic/react';
import { ReactNode } from 'react';

interface ContainerProps {
  onFinish: () => void;
}

export const Intro = ({ onFinish }: ContainerProps) => {
  return (
    <Swiper>
      <SwiperSlide>
        <img
          src={Intro1Svg}
          alt="Intro 1"
        />
        <IonText>
          <h3>Build awesome apps with Ionic UI components!</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={Intro2Svg}
          alt="Intro 2"
        />
        <IonText>
          <h3>Create powerful native apps with Capacitor.</h3>
        </IonText>
        <SwiperButtonNext>Next</SwiperButtonNext>
      </SwiperSlide>
      <SwiperSlide>
        <img
          src={Intro3Svg}
          alt="Intro 3"
        />
        <IonText>
          <h3>Enjoy learning to code!</h3>
        </IonText>
        <IonButton
          className="ion-margin-top"
          onClick={onFinish}
        >
          Let's START!
        </IonButton>
      </SwiperSlide>
    </Swiper>
  );
};

const SwiperButtonNext = ({ children }: { children: ReactNode }) => {
  const swiper = useSwiper();
  return (
    <IonButton
      className="ion-margin-top"
      onClick={() => swiper.slideNext()}
    >
      {children}
    </IonButton>
  );
};
