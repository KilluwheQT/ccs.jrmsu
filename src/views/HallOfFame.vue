<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-16 bg-gradient-to-br from-purple-900/50 via-purple-800/30 to-gray-900/50 rounded-2xl backdrop-blur-sm border border-purple-500/20">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-purple-300 mb-6">
          Hall of <span class="text-purple-400">Fame</span>
        </h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
          Celebrating the outstanding achievements and success stories of our students, 
          alumni, and faculty members who have made significant contributions to the field of computing.
        </p>
      </div>
    </section>

    <!-- Outstanding Students -->
    <section class="card">
      <h2 class="text-3xl font-bold text-purple-300 mb-8 text-center">Outstanding Students</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 rounded-lg p-6 text-center border border-yellow-600/30 backdrop-blur-sm">
          <div class="w-24 h-24 bg-yellow-800/50 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-200 mb-2">Maria Clara Santos</h3>
          <p class="text-yellow-300 font-medium mb-2">BS Computer Science, Class of 2023</p>
          <p class="text-sm text-gray-300 mb-3">Summa Cum Laude</p>
          <p class="text-xs text-gray-300">
            Outstanding thesis on "Machine Learning Applications in Healthcare" 
            and recipient of the Dean's Excellence Award.
          </p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 text-center border border-yellow-200">
          <div class="w-24 h-24 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Jose Rizal Dela Cruz</h3>
          <p class="text-yellow-700 font-medium mb-2">BS Information Technology, Class of 2023</p>
          <p class="text-sm text-gray-600 mb-3">Magna Cum Laude</p>
          <p class="text-xs text-gray-600">
            Developed innovative cybersecurity solutions and won first place 
            in the National IT Competition 2023.
          </p>
        </div>

        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6 text-center border border-yellow-200">
          <div class="w-24 h-24 bg-yellow-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg class="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Ana Maria Reyes</h3>
          <p class="text-yellow-700 font-medium mb-2">BS Information Systems, Class of 2023</p>
          <p class="text-sm text-gray-600 mb-3">Cum Laude</p>
          <p class="text-xs text-gray-600">
            Created a business intelligence system for local SMEs and 
            received the Innovation Award for Social Impact.
          </p>
        </div>
      </div>
    </section>

    <!-- Distinguished Alumni -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Distinguished Alumni</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div class="flex items-start space-x-4">
            <div class="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Dr. Carlos Mendoza</h3>
              <p class="text-blue-700 font-medium mb-2">BS Computer Science, Class of 2010</p>
              <p class="text-sm text-gray-600 mb-3">Senior Software Engineer at Google</p>
              <p class="text-sm text-gray-600">
                Dr. Mendoza leads Google's AI research team and has published over 20 papers 
                in top-tier conferences. He received his Ph.D. from Stanford University.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div class="flex items-start space-x-4">
            <div class="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Sofia Garcia</h3>
              <p class="text-blue-700 font-medium mb-2">BS Information Technology, Class of 2012</p>
              <p class="text-sm text-gray-600 mb-3">Chief Technology Officer at TechStart Philippines</p>
              <p class="text-sm text-gray-600">
                Sofia founded TechStart Philippines, a successful startup that provides 
                IT solutions to local businesses. She was named "Young Entrepreneur of the Year" in 2022.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div class="flex items-start space-x-4">
            <div class="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Roberto Silva</h3>
              <p class="text-blue-700 font-medium mb-2">BS Information Systems, Class of 2015</p>
              <p class="text-sm text-gray-600 mb-3">Data Scientist at Microsoft</p>
              <p class="text-sm text-gray-600">
                Roberto specializes in machine learning and big data analytics. 
                He has contributed to several open-source projects and mentors junior developers.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
          <div class="flex items-start space-x-4">
            <div class="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-gray-900 mb-2">Isabel Martinez</h3>
              <p class="text-blue-700 font-medium mb-2">BS Computer Science, Class of 2018</p>
              <p class="text-sm text-gray-600 mb-3">Cybersecurity Expert at National Security Agency</p>
              <p class="text-sm text-gray-600">
                Isabel works on national cybersecurity initiatives and has developed 
                security protocols used by government agencies nationwide.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Faculty Achievements -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Faculty Achievements</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border border-green-200">
          <div class="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Research Excellence Award</h3>
          <p class="text-sm text-gray-600">Dr. Maria Santos received the National Research Excellence Award for her work in AI and machine learning applications.</p>
        </div>

        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border border-green-200">
          <div class="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Teaching Excellence Award</h3>
          <p class="text-sm text-gray-600">Prof. Juan Dela Cruz was recognized for outstanding teaching methods and student mentorship.</p>
        </div>

        <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center border border-green-200">
          <div class="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Industry Collaboration Award</h3>
          <p class="text-sm text-gray-600">Prof. Sofia Garcia received recognition for establishing successful industry partnerships and internship programs.</p>
        </div>
      </div>
    </section>

    <!-- Awards and Recognition -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Awards and Recognition</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">National Awards</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>• Best Computing Program Award - Commission on Higher Education (2023)</li>
            <li>• Outstanding Research Institution - Department of Science and Technology (2022)</li>
            <li>• Excellence in IT Education - Philippine IT Association (2021)</li>
            <li>• Innovation in Teaching Award - National Teachers' Association (2020)</li>
          </ul>
        </div>

        <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">International Recognition</h3>
          <ul class="space-y-2 text-sm text-gray-600">
            <li>• ASEAN Quality Assurance Award for Computing Education (2023)</li>
            <li>• International Conference Best Paper Award - IEEE (2022)</li>
            <li>• Global Innovation Challenge Winner - Microsoft (2021)</li>
            <li>• Outstanding Student Chapter - ACM International (2020)</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="text-center py-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Be Part of Our Success Story
      </h2>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Join our community and create your own path to success. Your achievements 
        could be featured in our next Hall of Fame update.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/forum" class="btn-primary text-lg px-8 py-3">
          Join the Community
        </router-link>
        <router-link to="/about" class="btn-secondary text-lg px-8 py-3">
          Learn More About CCS
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed for this component
</script>
