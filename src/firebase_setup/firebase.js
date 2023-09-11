import firebase from 'firebase'
 import {initializeApp} from 'firebase/app'
  import {getAnalytics} from 'firebase/analytics'

import React from 'react'


  
 const firebaseConfig={
    apiKey: "AIzaSyDApWHtmWYbo079mAZJuMgi1JDFpNWiHJI",
    authDomain: "burger-app-d580d.firebaseapp.com",
    projectId: "burger-app-d580d",
    storageBucket: "burger-app-d580d.appspot.com",
    messagingSenderId: "572630176473",
    appId: "1:572630176473:web:51f399eb8ad79e8c35e4c8",
    measurementId: "G-D13M68EXKM"
  };
  


const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
