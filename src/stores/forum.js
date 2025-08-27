import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  increment
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
        likeCount: 0,
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

  const toggleLike = async (postId, userId) => {
    try {
      const likeRef = doc(db, 'likes', `${postId}_${userId}`)
      const likeDoc = await getDoc(likeRef)
      
      if (likeDoc.exists()) {
        // Unlike: remove the like document and decrement count
        await deleteDoc(likeRef)
        await updateDoc(doc(db, 'posts', postId), {
          likeCount: increment(-1)
        })
        return { success: true, action: 'unliked' }
      } else {
        // Like: create the like document and increment count
        await setDoc(likeRef, {
          postId,
          userId,
          timestamp: serverTimestamp()
        })
        await updateDoc(doc(db, 'posts', postId), {
          likeCount: increment(1)
        })
        return { success: true, action: 'liked' }
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      return { success: false, error: error.message }
    }
  }

  const checkIfLiked = async (postId, userId) => {
    try {
      const likeRef = doc(db, 'likes', `${postId}_${userId}`)
      const likeDoc = await getDoc(likeRef)
      return likeDoc.exists()
    } catch (error) {
      console.error('Error checking like status:', error)
      return false
    }
  }

  const updatePost = async (postId, title, content) => {
    try {
      await updateDoc(doc(db, 'posts', postId), {
        title,
        content,
        updatedAt: serverTimestamp()
      })
      await fetchPosts()
      return { success: true }
    } catch (error) {
      console.error('Error updating post:', error)
      return { success: false, error: error.message }
    }
  }

  const deletePost = async (postId) => {
    try {
      // Delete the post
      await deleteDoc(doc(db, 'posts', postId))
      
      // Delete all comments for this post
      const commentsQuery = query(collection(db, 'comments'), where('postId', '==', postId))
      const commentsSnapshot = await getDocs(commentsQuery)
      const deletePromises = commentsSnapshot.docs.map(doc => deleteDoc(doc.ref))
      await Promise.all(deletePromises)
      
      // Delete all likes for this post
      const likesQuery = query(collection(db, 'likes'), where('postId', '==', postId))
      const likesSnapshot = await getDocs(likesQuery)
      const deleteLikesPromises = likesSnapshot.docs.map(doc => deleteDoc(doc.ref))
      await Promise.all(deleteLikesPromises)
      
      await fetchPosts()
      return { success: true }
    } catch (error) {
      console.error('Error deleting post:', error)
      return { success: false, error: error.message }
    }
  }

  const updateComment = async (commentId, comment) => {
    try {
      await updateDoc(doc(db, 'comments', commentId), {
        comment,
        updatedAt: serverTimestamp()
      })
      return { success: true }
    } catch (error) {
      console.error('Error updating comment:', error)
      return { success: false, error: error.message }
    }
  }

  const deleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId))
      return { success: true }
    } catch (error) {
      console.error('Error deleting comment:', error)
      return { success: false, error: error.message }
    }
  }

  return {
    posts,
    comments,
    loading,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
    toggleLike,
    checkIfLiked
  }
})
