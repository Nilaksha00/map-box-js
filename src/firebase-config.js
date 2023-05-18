import { initializeApp } from 'firebase/app'
import { getFirestore } from '@firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDr1etjU_0tdxJp2gh2PW7iBV9YSf9IEbE",
  authDomain: "mapbox-voxitec.firebaseapp.com",
  projectId: "mapbox-voxitec",
  storageBucket: "mapbox-voxitec.appspot.com",
  messagingSenderId: "490938098535",
  appId: "1:490938098535:web:2405558218fee59b2785c2"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
