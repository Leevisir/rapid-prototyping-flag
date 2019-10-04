import 'rbx/index.css';
import { Button, Container, Title, Message } from 'rbx';
import React, { useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CourseList from './components/CourseList';
import timeParts from './components/CourseList';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
// import db, { uiConfig, firebase } from './components/Database/Database';


const firebaseConfig = {
  apiKey: "AIzaSyAwO1XnxTNmGljBboncz9RnhfH1Z2_Uj9k",
  authDomain: "rapid-prototyping-26fa1.firebaseapp.com",
  databaseURL: "https://rapid-prototyping-26fa1.firebaseio.com",
  projectId: "rapid-prototyping-26fa1",
  storageBucket: "rapid-prototyping-26fa1.appspot.com",
  messagingSenderId: "10853352656",
  appID: "1:10853352656:web:124fd662db23a4ca9a8ad5",
};

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database().ref();



const Banner = ({ user, title }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
    <Title>{ title || '[loading...]' }</Title>
  </React.Fragment>
);

const SignIn = () => (
  <StyledFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);



const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: Object.values(schedule.courses).map(addCourseTimes)
});



const App = () => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
    }
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
  return (
    <Container>
      <Banner title={ schedule.title } user = { user }></Banner>
      <CourseList courses={ schedule.courses } user = { user }></CourseList>
    </Container>
    );
  };

export default App;
