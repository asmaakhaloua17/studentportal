import { initializeApp } from 'firebase/app';



  const firebaseConfig = {
    apiKey: "AIzaSyCPWoru2Z_zrKGR9atqdDO3Sy6CyuvfXXY",
    authDomain: "student-portal-dev-665ea.firebaseapp.com",
    databaseURL: "https://student-portal-dev-665ea-default-rtdb.firebaseio.com",
    projectId: "student-portal-dev-665ea",
    storageBucket: "student-portal-dev-665ea.appspot.com",
    messagingSenderId: "1061612216543",
    appId: "1:1061612216543:web:f4315fbe9a1fc2ecfc896a"
  };
  


  const app = initializeApp(firebaseConfig);


export default app;