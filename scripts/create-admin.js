import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIHLJ3Y-YJiAbRrbB3_KRhJ-_OJvIQIdM",
  authDomain: "jrmsu-ccs.firebaseapp.com",
  databaseURL: "https://jrmsu-ccs-default-rtdb.firebaseio.com",
  projectId: "jrmsu-ccs",
  storageBucket: "jrmsu-ccs.firebasestorage.app",
  messagingSenderId: "911734310883",
  appId: "1:911734310883:web:1a55de2a22db9b278dc2d6",
  measurementId: "G-G7KQKTYBSK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function createAdminAccount() {
  const adminEmail = "admin@ccs.edu.ph";
  const adminPassword = "admin123456";
  const adminName = "CCS Administrator";

  try {
    console.log("Creating admin account...");
    
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    const user = userCredential.user;
    
    console.log("User account created successfully:", user.uid);
    
    // Create the admin profile in Firestore
    const adminProfile = {
      uid: user.uid,
      email: adminEmail,
      name: adminName,
      course: "Admin",
      role: "admin",
      approved: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(doc(db, "users", user.uid), adminProfile);
    
    console.log("Admin profile created successfully in Firestore");
    console.log("Admin account setup complete!");
    console.log("Email:", adminEmail);
    console.log("Password:", adminPassword);
    console.log("You can now log in to the admin dashboard.");
    
  } catch (error) {
    console.error("Error creating admin account:", error);
    if (error.code === "auth/email-already-in-use") {
      console.log("Admin account already exists. You can use the existing credentials to log in.");
    }
  }
}

// Run the function
createAdminAccount();
