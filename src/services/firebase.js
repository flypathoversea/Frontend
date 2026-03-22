import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBFuAhxVPZ_SoioZqR3cHSz-pugn7piTfM",
  authDomain: "flypath-overseas.firebaseapp.com",
  projectId: "flypath-overseas",
  storageBucket: "flypath-overseas.firebasestorage.app",
  messagingSenderId: "928799652744",
  appId: "1:928799652744:web:9a6522b01b42cc40fa983d",
  measurementId: "G-5NR823VQMR"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

/* ── Collections ── */
const APPLICATIONS_COL = 'applications';
const CALLBACKS_COL    = 'callbacks';

/* ── Applications ── */
export const submitApplication = async (data) => {
  const docRef = await addDoc(collection(db, APPLICATIONS_COL), {
    ...data,
    status:     'pending',
    adminNotes: '',
    createdAt:  serverTimestamp(),
  });
  return { id: docRef.id };
};

export const fetchApplications = async () => {
  const q    = query(collection(db, APPLICATIONS_COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateApplicationStatus = async (id, status, adminNotes) => {
  await updateDoc(doc(db, APPLICATIONS_COL, id), { status, adminNotes });
};

export const deleteApplication = async (id) => {
  await deleteDoc(doc(db, APPLICATIONS_COL, id));
};

/* ── Callback Requests ── */
export const submitRequestCall = async (data) => {
  const docRef = await addDoc(collection(db, CALLBACKS_COL), {
    ...data,
    status:    'new',
    createdAt: serverTimestamp(),
  });
  return { id: docRef.id };
};

export const fetchRequestCalls = async () => {
  const q    = query(collection(db, CALLBACKS_COL), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
};

export const updateCallStatus = async (id, status) => {
  await updateDoc(doc(db, CALLBACKS_COL, id), { status });
};