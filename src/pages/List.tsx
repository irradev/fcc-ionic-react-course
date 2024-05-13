import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonModal,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSkeletonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
  RefresherEventDetail,
  useIonAlert,
  useIonToast,
  useIonViewWillEnter,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import {
  type UsersResponseDto,
  type User,
} from '../interfaces/users-response.dto';
import { addOutline, trashBinOutline } from 'ionicons/icons';
import './List.css';

const getUsersAction = async (): Promise<UsersResponseDto> => {
  const data = await fetch('https://randomuser.me/api/?results=10');
  const users: UsersResponseDto = await data.json();
  return users;
};

const ListPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [presentingElement, setPresentingElement] =
    useState<HTMLElement | null>(null);
  const [activeSegment, setActiveSegment] = useState<any>('details');

  const modal = useRef<HTMLIonModalElement>(null);
  const cardModal = useRef<HTMLIonModalElement>(null);
  const pageRef = useRef(null);

  const [showAlert] = useIonAlert();
  const [showToast] = useIonToast();

  useIonViewWillEnter(() => {
    getUsers();
  });

  const getUsers = async () => {
    setLoading(true);
    const users = await getUsersAction();
    setUsers(users.results);
    setLoading(false);
  };

  const clearList = () => {
    showAlert({
      header: 'Confirm',
      message: 'Are you sure you want to clear the list?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Clear',
          handler: () => {
            setUsers([]);
            showToast({
              message: 'List cleared',
              duration: 2000,
              color: 'danger',
            });
          },
        },
      ],
    });
  };

  const doRefresh = async (e: RefresherCustomEvent) => {
    const users = await getUsersAction();
    setUsers(users.results);
    e.detail.complete();
  };

  useEffect(() => {
    setPresentingElement(pageRef.current);
  }, []);

  return (
    <IonPage ref={pageRef}>
      <IonHeader>
        <IonToolbar color={'success'}>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>List</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={clearList}>
              <IonIcon
                slot="icon-only"
                icon={trashBinOutline}
              />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar color={'success'}>
          <IonSearchbar />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher
          slot="fixed"
          onIonRefresh={doRefresh}
        >
          <IonRefresherContent pullingText="Pull to refresh" />
        </IonRefresher>

        {loading
          ? [...Array(10)].map((_, index) => (
              <IonCard key={index}>
                <IonCardContent>
                  <IonItem lines="none">
                    <IonAvatar slot="start">
                      <IonSkeletonText />
                    </IonAvatar>
                    <IonLabel>
                      <IonSkeletonText
                        animated
                        style={{ width: '150px' }}
                      />
                      <p>
                        <IonSkeletonText
                          animated
                          style={{ width: '80px' }}
                        />
                      </p>
                    </IonLabel>
                    <IonChip
                      slot="end"
                      color="primary"
                    >
                      <IonSkeletonText
                        animated
                        style={{ width: '20px' }}
                      />
                    </IonChip>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))
          : null}

        {users.map((user) => (
          <IonCard
            key={user.login.uuid}
            onClick={() => setSelectedUser(user)}
          >
            {/* <IonCardHeader>
              <IonCardTitle>Test</IonCardTitle>
            </IonCardHeader> */}
            <IonCardContent className="ion-no-padding">
              <IonItem lines="none">
                <IonAvatar slot="start">
                  <img src={user.picture.thumbnail} />
                </IonAvatar>
                <IonLabel>
                  {user.name.first} {user.name.last}
                  <p>{user.email}</p>
                </IonLabel>
                <IonChip
                  slot="end"
                  color="primary"
                >
                  {user.nat}
                </IonChip>
              </IonItem>
            </IonCardContent>
          </IonCard>
        ))}

        <IonModal
          breakpoints={[0, 0.5, 0.8]}
          initialBreakpoint={0.5}
          draggable
          ref={modal}
          isOpen={!!selectedUser}
          onDidDismiss={() => setSelectedUser(null)}
        >
          <IonHeader>
            <IonToolbar color="light">
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>
                  Close
                </IonButton>
              </IonButtons>
              <IonTitle>
                {selectedUser?.name.first} {selectedUser?.name.last}
              </IonTitle>
            </IonToolbar>
            <IonToolbar color="light">
              <IonSegment
                value={activeSegment}
                onIonChange={(e) => setActiveSegment(e.detail.value!)}
              >
                <IonSegmentButton value="details">Details</IonSegmentButton>
                <IonSegmentButton value="calendar">Calendar</IonSegmentButton>
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {activeSegment === 'details' ? (
              <IonCardContent className="ion-no-padding">
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <img src={selectedUser?.picture.medium} />
                  </IonAvatar>
                  <IonLabel>
                    {selectedUser?.name.first} {selectedUser?.name.last}
                  </IonLabel>
                  <IonChip
                    slot="end"
                    color="primary"
                  >
                    {selectedUser?.location.country}
                  </IonChip>
                </IonItem>
                <IonList>
                  <IonItem lines="none">
                    <IonLabel style={{ paddingRight: '8px' }}>Email:</IonLabel>
                    <IonInput
                      value={selectedUser?.email}
                      readonly
                    ></IonInput>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel style={{ paddingRight: '8px' }}>Phone:</IonLabel>
                    <IonInput
                      value={selectedUser?.phone}
                      readonly
                    ></IonInput>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel style={{ paddingRight: '8px' }}>Cell:</IonLabel>
                    <IonInput
                      value={selectedUser?.cell}
                      readonly
                    ></IonInput>
                  </IonItem>
                </IonList>
              </IonCardContent>
            ) : null}

            {activeSegment === 'calendar' ? <IonDatetime /> : null}
          </IonContent>
        </IonModal>
      </IonContent>

      <IonModal
        ref={cardModal}
        trigger="card-modal"
        presentingElement={presentingElement!} // <-- only applies in iOS mode
      >
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => cardModal.current?.dismiss()}>
                Close
              </IonButton>
            </IonButtons>
            <IonTitle>My Card Modal</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent></IonContent>
      </IonModal>

      <IonFab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
      >
        <IonFabButton
          id="card-modal" // <-- trigger open modal
          color={'success'}
          // onClick={() => cardModal.current?.present()}
        >
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
    </IonPage>
  );
};

export default ListPage;
