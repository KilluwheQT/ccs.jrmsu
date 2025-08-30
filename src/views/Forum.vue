<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-purple-300">CCS Forum</h1>
        <p class="text-gray-300 mt-2">Join the discussion with fellow CCS students and faculty</p>
      </div>
      <div v-if="authStore.isAuthenticated && authStore.isApproved" class="flex gap-2">
        <button 
          @click="showCreatePost = !showCreatePost"
          class="btn-primary flex items-center"
        >
          <svg v-if="!showCreatePost" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          {{ showCreatePost ? 'Cancel' : 'Create Post' }}
        </button>
      </div>
    </div>

    <!-- Create Post Form -->
    <div v-if="showCreatePost && authStore.isAuthenticated && authStore.isApproved" class="card">
      <h3 class="text-lg font-semibold text-purple-300 mb-4">Create New Post</h3>
      <form @submit.prevent="handleCreatePost" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-300 mb-1">
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
          <label for="content" class="block text-sm font-medium text-gray-300 mb-1">
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
            class="btn-secondary flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="creatingPost"
            class="btn-primary flex items-center"
          >
            <svg v-if="creatingPost" class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            {{ creatingPost ? 'Creating...' : 'Create Post' }}
          </button>
        </div>
      </form>
    </div>

    <!-- Authentication Required Message -->
    <div v-if="!authStore.isAuthenticated" class="card text-center">
      <div class="text-gray-300 mb-4">
        <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h3 class="text-lg font-semibold text-purple-300 mb-2">Authentication Required</h3>
        <p class="text-gray-300 mb-4">
          You need to be logged in to create posts and comment on discussions.
        </p>
        <router-link to="/login" class="btn-primary">
          Sign In
        </router-link>
      </div>
    </div>

    <!-- Approval Pending Message -->
    <div v-if="authStore.isAuthenticated && !authStore.isApproved" class="card text-center">
      <div class="text-gray-300 mb-4">
        <svg class="w-16 h-16 mx-auto text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 class="text-lg font-semibold text-yellow-300 mb-2">Account Pending Approval</h3>
        <p class="text-gray-300 mb-4">
          Your account is pending admin approval. You can view posts but cannot create new ones until approved.
        </p>
      </div>
    </div>

    <!-- Posts List -->
    <div v-if="forumStore.loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
      <p class="text-gray-400 mt-4">Loading posts...</p>
    </div>

    <div v-else-if="forumStore.posts.length === 0" class="card text-center">
      <div class="text-gray-400">
        <svg class="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
        <h3 class="text-lg font-semibold text-purple-300 mb-2">No Posts Yet</h3>
        <p class="text-gray-300">
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
              <h3 class="text-xl font-semibold text-purple-300">{{ post.title }}</h3>
              <!-- Post Actions (for author and admins) -->
              <div v-if="authStore.isAuthenticated && authStore.isApproved && (post.authorId === authStore.user?.uid || authStore.isAdmin)" class="flex items-center gap-3">
                <!-- Edit button (only for author) -->
                <button 
                  v-if="post.authorId === authStore.user?.uid"
                  @click="editPost(post)"
                  class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-900/50 hover:bg-purple-800/50 text-purple-300 rounded-lg text-sm font-medium transition-colors duration-200 border border-purple-500/30 hover:border-purple-400/50"
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
                  class="inline-flex items-center gap-1 px-3 py-1.5 bg-red-900/50 hover:bg-red-800/50 text-red-300 rounded-lg text-sm font-medium transition-colors duration-200 border border-red-500/30 hover:border-red-400/50"
                  :title="post.authorId === authStore.user?.uid ? 'Delete your post' : 'Admin: Delete this post'"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span class="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
            <div class="flex items-center text-sm text-gray-400 space-x-4">
              <span>By {{ post.authorName }}</span>
              <span v-if="post.authorCourse" class="text-purple-400 font-medium">{{ post.authorCourse }}</span>
              <span>{{ formatDate(post.timestamp) }}</span>
              <span v-if="post.updatedAt" class="text-xs text-gray-500">(edited)</span>
            </div>
          </div>
          <!-- Like Button -->
          <div class="flex items-center ml-6">
            <button 
              @click="handleLike(post.id)"
              :disabled="!authStore.isAuthenticated || !authStore.isApproved || likingPosts[post.id]"
              class="group relative inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ease-in-out transform active:scale-95"
              :class="postLikes[post.id] 
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105' 
                : 'bg-gray-800/50 text-gray-400 hover:text-gray-300 hover:bg-gray-700/50 border border-gray-600/30 hover:border-gray-500/50 hover:scale-105'"
              :title="!authStore.isAuthenticated ? 'Login to like posts' : !authStore.isApproved ? 'Account needs approval to like posts' : ''"
            >
              <svg 
                v-if="!likingPosts[post.id]"
                class="w-5 h-5 transition-all duration-200" 
                :class="postLikes[post.id] ? 'fill-current' : 'fill-none group-hover:scale-110'"
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <svg 
                v-else
                class="w-5 h-5 animate-spin" 
                fill="none"
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span class="font-semibold transition-all duration-200" :class="postLikes[post.id] ? 'text-white' : 'text-gray-400 group-hover:text-gray-300'">
                {{ post.likeCount || 0 }}
              </span>
              <!-- Like animation overlay -->
              <div 
                v-if="postLikes[post.id]"
                class="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-0 animate-ping"
              ></div>
            </button>
          </div>
        </div>
        
        <!-- Edit Post Form -->
        <div v-if="editingPost === post.id" class="mb-6">
          <form @submit.prevent="handleUpdatePost(post.id)" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-1">
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
              <label class="block text-sm font-medium text-gray-300 mb-1">
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
                class="btn-secondary flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </button>
              <button 
                type="submit" 
                :disabled="updatingPost"
                class="btn-primary flex items-center"
              >
                <svg v-if="updatingPost" class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ updatingPost ? 'Updating...' : 'Update Post' }}
              </button>
            </div>
          </form>
        </div>
        
        <!-- Post Content (show when not editing) -->
        <div v-else class="text-gray-300 mb-6 whitespace-pre-wrap">{{ post.content }}</div>
        
        <!-- Comments Section -->
        <div class="border-t border-purple-500/20 pt-4">
          <div class="flex items-center justify-between mb-4">
            <h4 class="text-lg font-medium text-purple-300">Comments</h4>
            <button 
              @click="toggleComments(post.id)"
              class="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-900/50 hover:bg-purple-800/50 text-purple-300 rounded-lg text-sm font-medium transition-colors duration-200 border border-purple-500/30 hover:border-purple-400/50"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{{ forumStore.expandedPosts.includes(post.id) ? 'Hide' : 'Show' }} Comments</span>
            </button>
          </div>
          
          <div v-if="forumStore.expandedPosts.includes(post.id)">
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
                    :disabled="!newComments[post.id] || !newComments[post.id].trim() || creatingComment"
                    class="btn-primary flex items-center"
                  >
                    <svg v-if="creatingComment" class="w-4 h-4 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {{ creatingComment ? 'Posting...' : 'Post Comment' }}
                  </button>
                </div>
              </form>
            </div>
            
            <!-- Comments List -->
            <div v-if="forumStore.postComments[post.id]?.loading" class="text-center py-4">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto"></div>
              <p class="text-gray-400 mt-2">Loading comments...</p>
            </div>
            
            <div v-else-if="forumStore.postComments[post.id]?.error" class="text-center py-4 text-red-400">
              <p>Error loading comments: {{ forumStore.postComments[post.id].error }}</p>
            </div>
            
            <div v-else-if="!forumStore.postComments[post.id]?.comments || forumStore.postComments[post.id]?.comments?.length === 0" class="text-center py-4 text-gray-400">
              <p>No comments yet. Be the first to comment!</p>
            </div>
            
            <div v-else class="space-y-4">
              <div 
                v-for="comment in forumStore.postComments[post.id]?.comments" 
                :key="comment.id"
                class="bg-gray-800/50 rounded-lg p-4 border border-purple-500/20"
              >
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <span class="font-medium text-purple-300">{{ comment.authorName }}</span>
                    <span v-if="comment.authorCourse" class="text-purple-400 font-medium text-sm ml-2">{{ comment.authorCourse }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-400">{{ formatDate(comment.timestamp) }}</span>
                    <span v-if="comment.updatedAt" class="text-xs text-gray-500">(edited)</span>
                    <!-- Comment Actions (for author and admins) -->
                    <div v-if="authStore.isAuthenticated && authStore.isApproved && (comment.authorId === authStore.user?.uid || authStore.isAdmin)" class="flex items-center gap-1">
                      <!-- Edit button (only for author) -->
                      <button 
                        v-if="comment.authorId === authStore.user?.uid"
                        @click="editComment(comment)"
                        class="inline-flex items-center gap-1 px-2 py-1 bg-purple-900/50 hover:bg-purple-800/50 text-purple-300 rounded-md text-xs font-medium transition-colors duration-200 border border-purple-500/30 hover:border-purple-400/50"
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
                        class="inline-flex items-center gap-1 px-2 py-1 bg-red-900/50 hover:bg-red-800/50 text-red-300 rounded-md text-xs font-medium transition-colors duration-200 border border-red-500/30 hover:border-red-400/50"
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
                        class="btn-secondary flex items-center text-xs"
                      >
                        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        :disabled="updatingComment"
                        class="btn-primary flex items-center text-xs"
                      >
                        <svg v-if="updatingComment" class="w-3 h-3 mr-1 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {{ updatingComment ? 'Updating...' : 'Update' }}
                      </button>
                    </div>
                  </form>
                </div>
                <!-- Comment Content (show when not editing) -->
                <p v-else class="text-gray-300">{{ comment.comment }}</p>
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
import { useAlert } from '../composables/useAlert'

const authStore = useAuthStore()
const forumStore = useForumStore()
const { success, error, confirm } = useAlert()

const showCreatePost = ref(false)
const creatingPost = ref(false)
const updatingPost = ref(false)
const updatingComment = ref(false)
const creatingComment = ref(false)
const newComments = reactive({})
const postLikes = reactive({})
const likingPosts = reactive({})
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
  const index = forumStore.expandedPosts.indexOf(postId)
  if (index > -1) {
    forumStore.expandedPosts.splice(index, 1)
  } else {
    forumStore.expandedPosts.push(postId)
    
    if (!forumStore.postComments[postId]) {
      forumStore.postComments[postId] = { loading: true, comments: [] }
      
      try {
        await forumStore.fetchComments(postId)
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }
    
    // Ensure the comment form is initialized
    if (!newComments[postId]) {
      newComments[postId] = ''
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
  
  creatingComment.value = true
  
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
    } else {
      await error('Failed to create comment: ' + result.error)
    }
  } catch (err) {
    console.error('Error creating comment:', err)
    await error('Error creating comment: ' + err.message)
  } finally {
    creatingComment.value = false
  }
}

const handleLike = async (postId) => {
  if (!authStore.isAuthenticated || !authStore.isApproved) return
  if (likingPosts[postId]) return // Prevent multiple rapid clicks
  
  // Find the post
  const post = forumStore.posts.find(p => p.id === postId)
  if (!post) return
  
  const wasLiked = postLikes[postId] || false
  const previousLikeCount = post.likeCount || 0
  
  // Set loading state
  likingPosts[postId] = true
  
  // Optimistic update - update UI immediately
  postLikes[postId] = !wasLiked
  if (!wasLiked) {
    post.likeCount = previousLikeCount + 1
  } else {
    post.likeCount = Math.max(0, previousLikeCount - 1)
  }
  
  try {
    const result = await forumStore.toggleLike(postId, authStore.user.uid)
    if (!result.success) {
      // Revert optimistic update if failed
      postLikes[postId] = wasLiked
      post.likeCount = previousLikeCount
      console.error('Like operation failed:', result.error)
    }
  } catch (error) {
    // Revert optimistic update if error
    postLikes[postId] = wasLiked
    post.likeCount = previousLikeCount
    console.error('Error toggling like:', error)
  } finally {
    // Clear loading state
    likingPosts[postId] = false
  }
}

const checkAllLikeStatus = async () => {
  if (!authStore.isAuthenticated) return
  
  for (const post of forumStore.posts) {
    try {
      const isLiked = await forumStore.checkIfLiked(post.id, authStore.user.uid)
      postLikes[post.id] = isLiked
    } catch (error) {
      console.error(`Error checking like status for post ${post.id}:`, error)
      postLikes[post.id] = false
    }
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
  
  const confirmed = await confirm(message)
  if (confirmed) {
    try {
      const result = await forumStore.deletePost(postId)
      if (result.success) {
        // Post will be removed from the list automatically
      }
    } catch (err) {
      console.error('Error deleting post:', err)
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
    }
  } catch (error) {
    console.error('Error updating comment:', error)
  } finally {
    updatingComment.value = false
  }
}

const deleteComment = async (commentId, postId, authorName) => {
  const isOwnComment = forumStore.postComments[postId]?.comments?.find(c => c.id === commentId)?.authorId === authStore.user?.uid
  const message = isOwnComment 
    ? 'Are you sure you want to delete your comment?'
    : `Are you sure you want to delete this comment by ${authorName}?`
  
  const confirmed = await confirm(message)
  if (confirmed) {
    try {
      const result = await forumStore.deleteComment(commentId)
      if (result.success) {
        // Comment is automatically removed from store state
      }
    } catch (err) {
      console.error('Error deleting comment:', err)
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
