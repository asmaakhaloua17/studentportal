import { initializeApp } from 'firebase/app';



  const firebaseConfig = {
    apiKey: "AIzaSyBKrmU5GrPvh5OgcwUkU3dY-tz6na-SFFQ",
    authDomain: "studentportal-d9b8c.firebaseapp.com",
    databaseURL: "https://studentportal-d9b8c-default-rtdb.firebaseio.com",
    projectId: "studentportal-d9b8c",
    storageBucket: "studentportal-d9b8c.appspot.com",
    messagingSenderId: "544699300970",
    appId: "1:544699300970:web:ad86be64ecde5faf915e13"
  };
  


  const app = initializeApp(firebaseConfig);


export default app;