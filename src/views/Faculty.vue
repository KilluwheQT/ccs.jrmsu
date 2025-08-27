<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Our <span class="text-primary-600">Faculty</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet our distinguished faculty members who are experts in their respective fields 
          and dedicated to your academic success and professional development.
        </p>
      </div>
    </section>

    <!-- Faculty Members -->
    <section class="space-y-8">
      <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">Faculty Directory</h2>
      
      <!-- Department Head -->
      <div class="card">
        <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">Department Head</h3>
        <div class="grid md:grid-cols-2 gap-8 items-center">
          <div class="text-center">
            <div class="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div>
            <h4 class="text-xl font-semibold text-gray-900 mb-2">Dr. Maria Santos</h4>
            <p class="text-primary-600 font-medium mb-3">Dean, College of Computing Studies</p>
            <p class="text-gray-600 mb-4">
              Dr. Santos holds a Ph.D. in Computer Science from the University of the Philippines. 
              With over 15 years of experience in academia and industry, she specializes in 
              software engineering and artificial intelligence.
            </p>
            <div class="space-y-2 text-sm text-gray-600">
              <p><strong>Education:</strong> Ph.D. Computer Science, University of the Philippines</p>
              <p><strong>Research Areas:</strong> Software Engineering, AI, Machine Learning</p>
              <p><strong>Email:</strong> maria.santos@jrmsu.edu.ph</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Computer Science Faculty -->
      <div class="card">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Computer Science Department</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Juan Dela Cruz</h4>
            <p class="text-primary-600 text-sm mb-2">Assistant Professor</p>
            <p class="text-sm text-gray-600 mb-3">Software Engineering, Web Development</p>
            <p class="text-xs text-gray-500">juan.delacruz@jrmsu.edu.ph</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Ana Reyes</h4>
            <p class="text-primary-600 text-sm mb-2">Associate Professor</p>
            <p class="text-sm text-gray-600 mb-3">Database Systems, Data Mining</p>
            <p class="text-xs text-gray-500">ana.reyes@jrmsu.edu.ph</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Carlos Mendoza</h4>
            <p class="text-primary-600 text-sm mb-2">Assistant Professor</p>
            <p class="text-sm text-gray-600 mb-3">Algorithms, Data Structures</p>
            <p class="text-xs text-gray-500">carlos.mendoza@jrmsu.edu.ph</p>
          </div>
        </div>
      </div>

      <!-- Information Technology Faculty -->
      <div class="card">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Information Technology Department</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Sofia Garcia</h4>
            <p class="text-primary-600 text-sm mb-2">Associate Professor</p>
            <p class="text-sm text-gray-600 mb-3">Network Administration, Cybersecurity</p>
            <p class="text-xs text-gray-500">sofia.garcia@jrmsu.edu.ph</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Miguel Torres</h4>
            <p class="text-primary-600 text-sm mb-2">Assistant Professor</p>
            <p class="text-sm text-gray-600 mb-3">System Administration, Cloud Computing</p>
            <p class="text-xs text-gray-500">miguel.torres@jrmsu.edu.ph</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Elena Rodriguez</h4>
            <p class="text-primary-600 text-sm mb-2">Assistant Professor</p>
            <p class="text-sm text-gray-600 mb-3">IT Project Management, Business Analysis</p>
            <p class="text-xs text-gray-500">elena.rodriguez@jrmsu.edu.ph</p>
          </div>
        </div>
      </div>

      <!-- Information Systems Faculty -->
      <div class="card">
        <h3 class="text-2xl font-bold text-gray-900 mb-6">Information Systems Department</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Roberto Silva</h4>
            <p class="text-primary-600 text-sm mb-2">Associate Professor</p>
            <p class="text-sm text-gray-600 mb-3">Enterprise Systems, Business Intelligence</p>
            <p class="text-xs text-gray-500">roberto.silva@jrmsu.edu.ph</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Isabel Martinez</h4>
            <p class="text-primary-600 text-sm mb-2">Assistant Professor</p>
            <p class="text-sm text-gray-600 mb-3">Data Analytics, Business Process Management</p>
            <p class="text-xs text-gray-500">isabel.martinez@jrmsu.edu.ph</p>
          </div>

          <div class="bg-gray-50 rounded-lg p-6 text-center">
            <div class="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 mb-1">Prof. Antonio Lopez</h4>
            <p class="text-primary-600 text-sm mb-2">Assistant Professor</p>
            <p class="text-sm text-gray-600 mb-3">IT Governance, Risk Management</p>
            <p class="text-xs text-gray-500">antonio.lopez@jrmsu.edu.ph</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Faculty Achievements -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Faculty Achievements</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Research Publications</h3>
          <p class="text-gray-600">Over 50 research papers published in international journals and conferences</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Industry Certifications</h3>
          <p class="text-gray-600">Faculty members hold various industry certifications from Microsoft, Cisco, and AWS</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Industry Partnerships</h3>
          <p class="text-gray-600">Collaborations with leading tech companies for research and student internships</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed for this component
</script>
