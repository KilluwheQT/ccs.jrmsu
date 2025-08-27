<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">CCS Forum</h1>
        <p class="text-gray-600 mt-2">Join the discussion with fellow CCS students and faculty</p>
      </div>
      <div v-if="authStore.isAuthenticated && authStore.isApproved" class="flex gap-2">
        <button 
          @click="showCreatePost = !showCreatePost"
          class="btn-primary"
        >
          {{ showCreatePost ? 'Cancel' : 'Create Post' }}
        </button>
      </div>
    </div>

    <!-- Create Post Form -->
    <div v-if="showCreatePost && authStore.isAuthenticated && authStore.isApproved" class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
      <form @submit.prevent="handleCreatePost" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            id="title"
            v-model="newPost.title"
            type="text"
            required
            class="input-field"
            placeholder="Enter post title"
            maxlength="100"
          />
        </div>
        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <textarea
            id="content"
            v-model="newPost.content"
            required
            rows="4"
            class="input-field"
            placeholder="Share your thoughts, questions, or ideas..."
            maxlength="1000"
          ></textarea>
        </div>
        <div class="flex justify-end gap-2">
          <button 
            type="button" 
            @click="showCreatePost = false"
            class="btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="creatingPost"
            class="btn-primary"
          >
            <span v-if="creatingPost">Creating...</span>
            <span v-else>Create Post</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Authentication Required Message -->
    <div v-if="!authStore.isAuthenticated" class="card text-center">
      <div class="text-gray-600 mb-4">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Authentication Required</h3>
        <p class="text-gray-600 mb-4">
          You need to be logged in to create posts and comment on discussions.
        </p>
        <router-link to="/login" class="btn-primary">
          Sign In
        </router-link>
      </div>
    </div>


    
    <!-- Approval Pending Message -->
    <div v-if="authStore.isAuthenticated && !authStore.isApproved" class="card text-center">
      <div class="text-gray-600 mb-4">
        <svg class="w-16 h-16 mx-auto text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">Account Pending Approval</h3>
        <p class="text-gray-600 mb-4">
          Your account is pending admin approval. You can view posts but cannot create new ones until approved.
        </p>
      </div>
    </div>

    <!-- Posts List -->
    <div v-if="forumStore.loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      <p class="text-gray-600 mt-4">Loading posts...</p>
    </div>

    <div v-else-if="forumStore.posts.length === 0" class="card text-center">
      <div class="text-gray-600">
        <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">No Posts Yet</h3>
        <p class="text-gray-600">
          Be the first to start a discussion! Create a post to get the conversation going.
        </p>
      </div>
    </div>

    <div v-else class="space-y-6">
      <div 
        v-for="post in forumStore.posts" 
        :key="post.id" 
        class="card"
      >
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ post.title }}</h3>
            <div class="flex items-center text-sm text-gray-500 space-x-4">
              <span>By {{ post.authorName }}</span>
              <span v-if="post.authorCourse" class="text-primary-600 font-medium">{{ post.authorCourse }}</span>
              <span>{{ formatDate(post.timestamp) }}</span>
            </div>
          </div>
        </div>
        
        <div class="text-gray-700 mb-6 whitespace-pre-wrap">{{ post.content }}</div>
        
        <!-- Comments Section -->
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-medium text-gray-900">Comments</h4>
            <button 
              @click="toggleComments(post.id)"
              class="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              {{ expandedPosts.includes(post.id) ? 'Hide' : 'Show' }} Comments
            </button>
          </div>
          
          <div v-if="expandedPosts.includes(post.id)">
            <!-- Comment Form -->
            <div v-if="authStore.isAuthenticated && authStore.isApproved" class="mb-6">
              <form @submit.prevent="handleCreateComment(post.id)" class="space-y-3">
                <textarea
                  v-model="newComments[post.id]"
                  rows="2"
                  class="input-field"
                  placeholder="Write a comment..."
                  maxlength="500"
                ></textarea>
                <div class="flex justify-end">
                  <button 
                    type="submit" 
                    :disabled="!newComments[post.id]?.trim()"
                    class="btn-primary text-sm"
                  >
                    Post Comment
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Comments List -->
            <div v-if="postComments[post.id]?.loading" class="text-center py-4">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
            </div>
            
            <div v-else-if="postComments[post.id]?.comments?.length === 0" class="text-center py-4 text-gray-500">
              No comments yet. Be the first to comment!
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="comment in postComments[post.id]?.comments" 
                :key="comment.id"
                class="bg-gray-50 rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <span class="font-medium text-gray-900">{{ comment.authorName }}</span>
                    <span v-if="comment.authorCourse" class="text-primary-600 font-medium text-sm ml-2">{{ comment.authorCourse }}</span>
                  </div>
                  <span class="text-sm text-gray-500">{{ formatDate(comment.timestamp) }}</span>
                </div>
                <p class="text-gray-700">{{ comment.comment }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useForumStore } from '../stores/forum'

const authStore = useAuthStore()
const forumStore = useForumStore()

const showCreatePost = ref(false)
const creatingPost = ref(false)
const expandedPosts = ref([])
const newComments = reactive({})

const newPost = reactive({
  title: '',
  content: ''
})

const postComments = reactive({})

onMounted(async () => {
  await forumStore.fetchPosts()
})

const toggleComments = async (postId) => {
  const index = expandedPosts.value.indexOf(postId)
  if (index > -1) {
    expandedPosts.value.splice(index, 1)
  } else {
    expandedPosts.value.push(postId)
    if (!postComments[postId]) {
      postComments[postId] = { loading: true, comments: [] }
      postComments[postId].comments = await forumStore.fetchComments(postId)
      postComments[postId].loading = false
    }
  }
}

const handleCreatePost = async () => {
  if (!newPost.title.trim() || !newPost.content.trim()) return
  
  creatingPost.value = true
  try {
    const result = await forumStore.createPost(
      newPost.title,
      newPost.content,
      authStore.user.uid,
      authStore.userProfile?.name || authStore.user.email,
      authStore.userProfile?.course
    )
    
    if (result.success) {
      newPost.title = ''
      newPost.content = ''
      showCreatePost.value = false
    }
  } catch (error) {
    console.error('Error creating post:', error)
  } finally {
    creatingPost.value = false
  }
}

const handleCreateComment = async (postId) => {
  const comment = newComments[postId]?.trim()
  if (!comment) return
  
  try {
    const result = await forumStore.createComment(
      postId,
      comment,
      authStore.user.uid,
      authStore.userProfile?.name || authStore.user.email,
      authStore.userProfile?.course
    )
    
    if (result.success) {
      newComments[postId] = ''
      // Refresh comments for this post
      postComments[postId].comments = await forumStore.fetchComments(postId)
    }
  } catch (error) {
    console.error('Error creating comment:', error)
  }
}

const formatDate = (timestamp) => {
  if (!timestamp) return 'Just now'
  
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
  const now = new Date()
  const diffInSeconds = Math.floor((now - date) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`
  
  return date.toLocaleDateString()
}
</script>
