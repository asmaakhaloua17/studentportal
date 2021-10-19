import { initializeApp } from 'firebase/app';



  const firebaseConfig = {
    apiKey: "AIzaSyDXkzLfPAgUllqviplE_qiQOO06EhCf1tU",
    authDomain: "student-portal-prod-7827d.firebaseapp.com",
    databaseURL: "https://student-portal-prod-7827d-default-rtdb.firebaseio.com",
    projectId: "student-portal-prod-7827d",
    storageBucket: "student-portal-prod-7827d.appspot.com",
    messagingSenderId: "672147118793",
    appId: "1:672147118793:web:e2317e9719656541c84b18"
  };
  


  const app = initializeApp(firebaseConfig);


export default app;