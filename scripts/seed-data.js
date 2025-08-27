// Demo data seeding script for CCS Forum
// Run this script to populate Firestore with sample posts and comments

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Demo posts data
const demoPosts = [
  {
    title: "Welcome to CCS Forum!",
    content: "Hello everyone! Welcome to the College of Computing Studies forum. This is a place where we can share ideas, ask questions, and connect with fellow students and faculty members. Feel free to introduce yourself and start discussions about computing, technology, and academic life.",
    authorId: "demo-user-1",
    authorName: "admin@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    title: "Best Programming Languages for Beginners",
    content: "I'm a first-year student and I'm wondering which programming languages would be best to start with. I've heard Python is great for beginners, but I'm also interested in web development. What are your thoughts and recommendations?",
    authorId: "demo-user-2",
    authorName: "student@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    title: "Upcoming Web Development Workshop",
    content: "Don't forget about our upcoming web development workshop this Friday! We'll be covering modern frameworks like React and Vue.js. This is a great opportunity to enhance your skills and network with other students. Registration is still open!",
    authorId: "demo-user-3",
    authorName: "faculty@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    title: "Study Tips for Computer Science Students",
    content: "As a senior student, I wanted to share some study tips that have helped me throughout my journey: 1) Practice coding daily, 2) Join study groups, 3) Work on personal projects, 4) Don't be afraid to ask for help. What tips would you add to this list?",
    authorId: "demo-user-4",
    authorName: "senior@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    title: "Career Opportunities in IT",
    content: "I'm graduating soon and I'm exploring different career paths in IT. I'm interested in software development, cybersecurity, and data science. Can anyone share their experiences or advice about these fields? What skills are most in demand right now?",
    authorId: "demo-user-5",
    authorName: "graduate@ccs.edu.ph",
    timestamp: serverTimestamp()
  }
];

// Demo comments data
const demoComments = [
  {
    postId: "post-1",
    comment: "Thanks for the warm welcome! I'm excited to be part of this community.",
    authorId: "demo-user-6",
    authorName: "newstudent@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    postId: "post-1",
    comment: "Great to see this forum up and running! Looking forward to engaging discussions.",
    authorId: "demo-user-7",
    authorName: "professor@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    postId: "post-2",
    comment: "Python is definitely a great choice for beginners! It's readable and has a large community. For web development, I'd recommend starting with HTML/CSS/JavaScript, then moving to frameworks.",
    authorId: "demo-user-8",
    authorName: "mentor@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    postId: "post-2",
    comment: "I started with Java and found it helpful for understanding object-oriented programming concepts. But Python is more beginner-friendly for sure.",
    authorId: "demo-user-9",
    authorName: "alumni@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    postId: "post-3",
    comment: "I'm definitely attending! React has been on my learning list for a while now.",
    authorId: "demo-user-10",
    authorName: "webdev@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    postId: "post-4",
    comment: "Great tips! I'd also add: 5) Use version control (Git) from the start, 6) Read other people's code, 7) Participate in coding competitions.",
    authorId: "demo-user-11",
    authorName: "coder@ccs.edu.ph",
    timestamp: serverTimestamp()
  },
  {
    postId: "post-5",
    comment: "Software development is booming right now! Focus on learning modern frameworks and cloud technologies. AWS and Azure skills are highly valued.",
    authorId: "demo-user-12",
    authorName: "industry@ccs.edu.ph",
    timestamp: serverTimestamp()
  }
];

// Function to seed data
async function seedData() {
  try {
    console.log("Starting to seed demo data...");
    
    // Add posts
    const postIds = [];
    for (const post of demoPosts) {
      const docRef = await addDoc(collection(db, "posts"), post);
      postIds.push(docRef.id);
      console.log(`Added post: ${post.title}`);
    }
    
    // Add comments (using the first post ID for demo purposes)
    for (const comment of demoComments) {
      // Use the first post ID for all comments in this demo
      const commentWithPostId = { ...comment, postId: postIds[0] };
      await addDoc(collection(db, "comments"), commentWithPostId);
      console.log(`Added comment: ${comment.comment.substring(0, 50)}...`);
    }
    
    console.log("Demo data seeding completed successfully!");
    console.log(`Added ${demoPosts.length} posts and ${demoComments.length} comments`);
    
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

// Run the seeding function
seedData();
