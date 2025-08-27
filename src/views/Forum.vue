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
               class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 border border-gray-300 hover:border-gray-400"
             >
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
               <span>Cancel</span>
             </button>
             <button 
               type="submit" 
               :disabled="creatingPost"
               class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
             >
               <svg v-if="creatingPost" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
               <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
               </svg>
               <span>{{ creatingPost ? 'Creating...' : 'Create Post' }}</span>
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
          <div class="flex-1">
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-xl font-semibold text-gray-900">{{ post.title }}</h3>
              <!-- Post Actions (for author and admins) -->
              <div v-if="authStore.isAuthenticated && authStore.isApproved && (post.authorId === authStore.user?.uid || authStore.isAdmin)" class="flex items-center gap-2">
                <!-- Edit button (only for author) -->
                <button 
                  v-if="post.authorId === authStore.user?.uid"
                  @click="editPost(post)"
                  class="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors duration-200 border border-blue-200 hover:border-blue-300"
                  title="Edit post"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span class="hidden sm:inline">Edit</span>
                </button>
                <!-- Delete button (for author and admins) -->
                <button 
                  @click="deletePost(post.id, post.authorName)"
                  class="inline-flex items-center gap-1 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors duration-200 border border-red-200 hover:border-red-300"
                  :title="post.authorId === authStore.user?.uid ? 'Delete your post' : 'Admin: Delete this post'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span class="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
            <div class="flex items-center text-sm text-gray-500 space-x-4">
              <span>By {{ post.authorName }}</span>
              <span v-if="post.authorCourse" class="text-primary-600 font-medium">{{ post.authorCourse }}</span>
              <span>{{ formatDate(post.timestamp) }}</span>
              <span v-if="post.updatedAt" class="text-xs text-gray-400">(edited)</span>
            </div>
          </div>
          <!-- Like Button -->
          <div class="flex items-center gap-2">
            <button 
              @click="handleLike(post.id)"
              :disabled="!authStore.isAuthenticated || !authStore.isApproved"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border shadow-sm"
              :class="postLikes[post.id] 
                ? 'bg-red-50 text-red-600 hover:bg-red-100 border-red-200 hover:border-red-300 shadow-red-100' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border-gray-200 hover:border-gray-300 shadow-gray-100'"
              :title="!authStore.isAuthenticated ? 'Login to like posts' : !authStore.isApproved ? 'Account needs approval to like posts' : ''"
            >
              <svg 
                class="w-5 h-5 transition-transform duration-200" 
                :class="postLikes[post.id] ? 'fill-current scale-110' : 'fill-none hover:scale-110'"
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span class="font-semibold">{{ post.likeCount || 0 }}</span>
            </button>
          </div>
        </div>
        
        <!-- Edit Post Form -->
        <div v-if="editingPost === post.id" class="mb-6">
          <form @submit.prevent="handleUpdatePost(post.id)" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                v-model="editForm.title"
                type="text"
                required
                class="input-field"
                placeholder="Enter post title"
                maxlength="100"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                v-model="editForm.content"
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
               @click="cancelEdit"
               class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors duration-200 border border-gray-300 hover:border-gray-400"
             >
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
               </svg>
               <span>Cancel</span>
             </button>
             <button 
               type="submit" 
               :disabled="updatingPost"
               class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
             >
               <svg v-if="updatingPost" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
               </svg>
               <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
               </svg>
               <span>{{ updatingPost ? 'Updating...' : 'Update Post' }}</span>
             </button>
            </div>
          </form>
        </div>
        
        <!-- Post Content (show when not editing) -->
        <div v-else class="text-gray-700 mb-6 whitespace-pre-wrap">{{ post.content }}</div>
        
        <!-- Comments Section -->
        <div class="border-t border-gray-200 pt-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-medium text-gray-900">Comments</h4>
                         <button 
               @click="toggleComments(post.id)"
               class="inline-flex items-center gap-1 px-3 py-1.5 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg text-sm font-medium transition-colors duration-200 border border-primary-200 hover:border-primary-300"
             >
               <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
               </svg>
               <span>{{ expandedPosts.includes(post.id) ? 'Hide' : 'Show' }} Comments</span>
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
                     class="inline-flex items-center gap-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                   >
                     <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                     </svg>
                     <span>Post Comment</span>
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
                   <div class="flex items-center gap-2">
                     <span class="text-sm text-gray-500">{{ formatDate(comment.timestamp) }}</span>
                     <span v-if="comment.updatedAt" class="text-xs text-gray-400">(edited)</span>
                     <!-- Comment Actions (for author and admins) -->
                     <div v-if="authStore.isAuthenticated && authStore.isApproved && (comment.authorId === authStore.user?.uid || authStore.isAdmin)" class="flex items-center gap-1">
                       <!-- Edit button (only for author) -->
                       <button 
                         v-if="comment.authorId === authStore.user?.uid"
                         @click="editComment(comment)"
                         class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-xs font-medium transition-colors duration-200 border border-blue-200 hover:border-blue-300"
                         title="Edit comment"
                       >
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                         </svg>
                         <span class="hidden sm:inline">Edit</span>
                       </button>
                       <!-- Delete button (for author and admins) -->
                       <button 
                         @click="deleteComment(comment.id, post.id, comment.authorName)"
                         class="inline-flex items-center gap-1 px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-xs font-medium transition-colors duration-200 border border-red-200 hover:border-red-300"
                         :title="comment.authorId === authStore.user?.uid ? 'Delete your comment' : 'Admin: Delete this comment'"
                       >
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                         </svg>
                         <span class="hidden sm:inline">Delete</span>
                       </button>
                     </div>
                   </div>
                 </div>
                 <!-- Edit Comment Form -->
                 <div v-if="editingComment === comment.id" class="mb-3">
                   <form @submit.prevent="handleUpdateComment(comment.id, post.id)" class="space-y-3">
                     <textarea
                       v-model="editCommentForm.comment"
                       rows="2"
                       class="input-field"
                       placeholder="Edit your comment..."
                       maxlength="500"
                     ></textarea>
                     <div class="flex justify-end gap-2">
                       <button 
                         type="button" 
                         @click="cancelEditComment"
                         class="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-xs font-medium transition-colors duration-200 border border-gray-300 hover:border-gray-400"
                       >
                         <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                         </svg>
                         <span>Cancel</span>
                       </button>
                       <button 
                         type="submit" 
                         :disabled="updatingComment"
                         class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded text-xs font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                       >
                         <svg v-if="updatingComment" class="w-3 h-3 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                         </svg>
                         <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                         </svg>
                         <span>{{ updatingComment ? 'Updating...' : 'Update' }}</span>
                       </button>
                     </div>
                   </form>
                 </div>
                 <!-- Comment Content (show when not editing) -->
                 <p v-else class="text-gray-700">{{ comment.comment }}</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useForumStore } from '../stores/forum'

const authStore = useAuthStore()
const forumStore = useForumStore()

const showCreatePost = ref(false)
const creatingPost = ref(false)
const updatingPost = ref(false)
const updatingComment = ref(false)
const expandedPosts = ref([])
const newComments = reactive({})
const postLikes = reactive({})
const editingPost = ref(null)
const editingComment = ref(null)

const newPost = reactive({
  title: '',
  content: ''
})

const editForm = reactive({
  title: '',
  content: ''
})

const editCommentForm = reactive({
  comment: ''
})

const postComments = reactive({})

onMounted(async () => {
  await forumStore.fetchPosts()
  // Check like status for all posts if user is authenticated
  if (authStore.isAuthenticated) {
    await checkAllLikeStatus()
  }
})

// Watch for changes in posts and check like status
watch(() => forumStore.posts, async (newPosts) => {
  if (newPosts.length > 0 && authStore.isAuthenticated) {
    await checkAllLikeStatus()
  }
}, { deep: true })

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

const handleLike = async (postId) => {
  if (!authStore.isAuthenticated || !authStore.isApproved) return
  
  try {
    const result = await forumStore.toggleLike(postId, authStore.user.uid)
    if (result.success) {
      // Update local like status
      postLikes[postId] = !postLikes[postId]
      
      // Update local like count without refreshing
      const post = forumStore.posts.find(p => p.id === postId)
      if (post) {
        if (result.action === 'liked') {
          post.likeCount = (post.likeCount || 0) + 1
        } else {
          post.likeCount = Math.max(0, (post.likeCount || 0) - 1)
        }
      }
    }
  } catch (error) {
    console.error('Error toggling like:', error)
  }
}

const checkAllLikeStatus = async () => {
  if (!authStore.isAuthenticated) return
  
  for (const post of forumStore.posts) {
    const isLiked = await forumStore.checkIfLiked(post.id, authStore.user.uid)
    postLikes[post.id] = isLiked
  }
}

const editPost = (post) => {
  editingPost.value = post.id
  editForm.title = post.title
  editForm.content = post.content
}

const cancelEdit = () => {
  editingPost.value = null
  editForm.title = ''
  editForm.content = ''
}

const handleUpdatePost = async (postId) => {
  if (!editForm.title.trim() || !editForm.content.trim()) return
  
  updatingPost.value = true
  try {
    const result = await forumStore.updatePost(postId, editForm.title, editForm.content)
    if (result.success) {
      cancelEdit()
    }
  } catch (error) {
    console.error('Error updating post:', error)
  } finally {
    updatingPost.value = false
  }
}

const deletePost = async (postId, authorName) => {
  const isOwnPost = forumStore.posts.find(p => p.id === postId)?.authorId === authStore.user?.uid
  const message = isOwnPost 
    ? 'Are you sure you want to delete your post? This action cannot be undone.'
    : `Are you sure you want to delete this post by ${authorName}? This action cannot be undone.`
  
  if (confirm(message)) {
    try {
      const result = await forumStore.deletePost(postId)
      if (result.success) {
        // Post will be removed from the list automatically
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }
}

const editComment = (comment) => {
  editingComment.value = comment.id
  editCommentForm.comment = comment.comment
}

const cancelEditComment = () => {
  editingComment.value = null
  editCommentForm.comment = ''
}

const handleUpdateComment = async (commentId, postId) => {
  if (!editCommentForm.comment.trim()) return
  
  updatingComment.value = true
  try {
    const result = await forumStore.updateComment(commentId, editCommentForm.comment)
    if (result.success) {
      cancelEditComment()
      // Refresh comments for this post
      postComments[postId].comments = await forumStore.fetchComments(postId)
    }
  } catch (error) {
    console.error('Error updating comment:', error)
  } finally {
    updatingComment.value = false
  }
}

const deleteComment = async (commentId, postId, authorName) => {
  const isOwnComment = postComments[postId]?.comments?.find(c => c.id === commentId)?.authorId === authStore.user?.uid
  const message = isOwnComment 
    ? 'Are you sure you want to delete your comment?'
    : `Are you sure you want to delete this comment by ${authorName}?`
  
  if (confirm(message)) {
    try {
      const result = await forumStore.deleteComment(commentId)
      if (result.success) {
        // Refresh comments for this post
        postComments[postId].comments = await forumStore.fetchComments(postId)
      }
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
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
