import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where
} from 'firebase/firestore'
import { db } from '../firebase/config'

export const useForumStore = defineStore('forum', () => {
  const posts = ref([])
  const comments = ref([])
  const loading = ref(false)

  const fetchPosts = async () => {
    loading.value = true
    try {
      const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
      const querySnapshot = await getDocs(q)
      posts.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      loading.value = false
    }
  }

  const createPost = async (title, content, authorId, authorName, authorCourse) => {
    try {
      const postData = {
        title,
        content,
        authorId,
        authorName,
        authorCourse,
        timestamp: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, 'posts'), postData)
      await fetchPosts() // Refresh posts

      return { success: true, postId: docRef.id }
    } catch (error) {
      console.error('Error creating post:', error)
      return { success: false, error: error.message }
    }
  }

  const fetchComments = async (postId) => {
    try {
      const q = query(
        collection(db, 'comments'),
        where('postId', '==', postId),
        orderBy('timestamp', 'asc')
      )
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    } catch (error) {
      console.error('Error fetching comments:', error)
      return []
    }
  }

  const createComment = async (postId, comment, authorId, authorName, authorCourse) => {
    try {
      const commentData = {
        postId,
        comment,
        authorId,
        authorName,
        authorCourse,
        timestamp: serverTimestamp()
      }

      const docRef = await addDoc(collection(db, 'comments'), commentData)

      return { success: true, commentId: docRef.id }
    } catch (error) {
      console.error('Error creating comment:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    posts,
    comments,
    loading,
    fetchPosts,
    createPost,
    fetchComments,
    createComment
  }
})
