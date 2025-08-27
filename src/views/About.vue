<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          About <span class="text-primary-600">CCS</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          The College of Computing Studies is dedicated to excellence in computing education, 
          research, and innovation, preparing students for successful careers in the digital age.
        </p>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="grid md:grid-cols-2 gap-8">
      <div class="card">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p class="text-gray-700 leading-relaxed">
          To provide quality education in computing and information technology, 
          fostering innovation, creativity, and ethical practices while preparing 
          students to become competent professionals in the global digital economy.
        </p>
      </div>

      <div class="card">
        <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
          <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p class="text-gray-700 leading-relaxed">
          To be a leading institution in computing education, recognized for academic excellence, 
          research innovation, and producing highly skilled professionals who contribute 
          significantly to the advancement of technology and society.
        </p>
      </div>
    </section>

    <!-- Programs Offered -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Academic Programs</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Bachelor of Science in Computer Science</h3>
          <p class="text-gray-600 mb-4">
            A comprehensive program covering software development, algorithms, data structures, 
            and computer systems fundamentals.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Software Engineering</li>
            <li>• Database Management</li>
            <li>• Web Development</li>
            <li>• Mobile App Development</li>
          </ul>
        </div>

        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Bachelor of Science in Information Technology</h3>
          <p class="text-gray-600 mb-4">
            Focuses on information systems, network administration, and IT infrastructure management.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Network Administration</li>
            <li>• System Administration</li>
            <li>• Cybersecurity</li>
            <li>• IT Project Management</li>
          </ul>
        </div>

        <div class="bg-gray-50 rounded-lg p-6">
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Bachelor of Science in Information Systems</h3>
          <p class="text-gray-600 mb-4">
            Combines business knowledge with technical skills for organizational information management.
          </p>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>• Business Analysis</li>
            <li>• Enterprise Systems</li>
            <li>• Data Analytics</li>
            <li>• IT Governance</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Facilities -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Our Facilities</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Computer Laboratories</h3>
          <p class="text-sm text-gray-600">State-of-the-art computer labs with latest software and hardware</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Library Resources</h3>
          <p class="text-sm text-gray-600">Extensive collection of computing books, journals, and digital resources</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Research Centers</h3>
          <p class="text-sm text-gray-600">Dedicated research facilities for innovative computing projects</p>
        </div>

        <div class="text-center">
          <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 class="font-semibold text-gray-900 mb-2">Innovation Hub</h3>
          <p class="text-sm text-gray-600">Collaborative space for startups and technology innovation</p>
        </div>
      </div>
    </section>

    <!-- Contact Information -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Contact Information</h2>
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Get in Touch</h3>
          <div class="space-y-4">
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-medium text-gray-900">Address</p>
                <p class="text-gray-600">College of Computing Studies<br>Jose Rizal Memorial State University<br>Main Campus, Dapitan City</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <div>
                <p class="font-medium text-gray-900">Phone</p>
                <p class="text-gray-600">+63 (065) 123-4567</p>
              </div>
            </div>
            <div class="flex items-start space-x-3">
              <svg class="w-6 h-6 text-primary-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p class="font-medium text-gray-900">Email</p>
                <p class="text-gray-600">ccs@jrmsu.edu.ph</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="text-xl font-semibold text-gray-900 mb-4">Office Hours</h3>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span class="text-gray-600">Monday - Friday</span>
              <span class="font-medium">8:00 AM - 5:00 PM</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Saturday</span>
              <span class="font-medium">8:00 AM - 12:00 PM</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Sunday</span>
              <span class="font-medium">Closed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// No additional logic needed for this component
</script>
