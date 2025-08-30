<template>
  <footer class="bg-gray-900 text-white py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Developer Credits -->
      <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div class="text-sm text-gray-400">
          © 2025 CCS Forum. All rights reserved.
        </div>
        
        <!-- DevLabs Credits -->
        <div class="flex items-center space-x-6">
          <div class="text-sm text-gray-400">
            Developed by 
            <span class="font-semibold text-purple-400">DevLabs</span>
          </div>
          
          <!-- Social Links -->
          <div class="flex space-x-3">
            <a 
              href="https://www.facebook.com/devlab32025" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors duration-200"
              title="Visit DevLabs Facebook"
            >
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            <a 
              href="https://devlabs-portfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors duration-200"
              title="Visit DevLabs Portfolio"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// No additional logic needed for this footer component
</script>

<style scoped>
/* Custom styles for the footer */
footer {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
}
</style>
