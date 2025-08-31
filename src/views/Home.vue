<template>
  <div class="space-y-12">
         <!-- Hero Section -->
     <section class="text-center py-16 bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-purple-500/20">
      <div class="max-w-4xl mx-auto px-4">
                 <h1 class="text-4xl md:text-6xl font-bold text-purple-300 mb-6">
                  Welcome to <span class="text-purple-400">CCS Forum</span>
         </h1>
         <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Connect, collaborate, and stay updated with the College of Computing Studies community. 
          Join discussions, share knowledge, and be part of our growing tech community.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/forum" 
            class="btn-primary text-lg px-8 py-3"
          >
            Join the Discussion
          </router-link>
          <router-link 
            to="/about" 
            class="btn-secondary text-lg px-8 py-3"
          >
            Learn More
          </router-link>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div class="card text-center">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </div>
                 <h3 class="text-xl font-semibold text-gray-200 mb-2">Community Forum</h3>
         <p class="text-gray-300">
          Engage in meaningful discussions with fellow students, faculty, and alumni about technology, projects, and opportunities.
        </p>
      </div>

      <div class="card text-center">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
                 <h3 class="text-xl font-semibold text-gray-200 mb-2">Faculty Directory</h3>
         <p class="text-gray-300">
          Meet our distinguished faculty members who are experts in their respective fields and dedicated to your success.
        </p>
      </div>

      <div class="card text-center">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
                 <h3 class="text-xl font-semibold text-gray-200 mb-2">Hall of Fame</h3>
         <p class="text-gray-300">
          Celebrate the achievements and success stories of our outstanding students and faculty members.
        </p>
      </div>

      <div class="card text-center">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
                 <h3 class="text-xl font-semibold text-gray-200 mb-2">Events & Activities</h3>
         <p class="text-gray-300">
          Stay updated with upcoming events, workshops, seminars, and activities organized by the CCS community.
        </p>
      </div>

      <div class="card text-center">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
                 <h3 class="text-xl font-semibold text-gray-200 mb-2">Latest Updates</h3>
         <p class="text-gray-300">
          Get real-time updates about academic programs, research opportunities, and industry partnerships.
        </p>
      </div>

      <div class="card text-center">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
                 <h3 class="text-xl font-semibold text-gray-200 mb-2">Network & Connect</h3>
         <p class="text-gray-300">
          Build professional relationships with peers, alumni, and industry professionals in the computing field.
        </p>
      </div>
    </section>

         <!-- Call to Action -->
     <section class="text-center py-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20">
       <h2 class="text-3xl font-bold text-purple-300 mb-4">
         Ready to Get Started?
       </h2>
       <p class="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        Join our community today and start connecting with fellow CCS students and faculty members.
      </p>
      <router-link 
        to="/login" 
        class="btn-primary text-lg px-8 py-3"
      >
        Sign Up Now
      </router-link>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed for this component
</script>
