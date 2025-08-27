<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="text-center py-16 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          CCS <span class="text-primary-600">Events</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Stay updated with the latest events, workshops, seminars, and activities 
          organized by the College of Computing Studies community.
        </p>
      </div>
    </section>

    <!-- Event Categories -->
    <section class="flex flex-wrap gap-4 justify-center">
      <button 
        v-for="category in categories" 
        :key="category"
        @click="selectedCategory = category"
        :class="[
          'px-6 py-2 rounded-full text-sm font-medium transition-colors',
          selectedCategory === category 
            ? 'bg-primary-600 text-white' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        ]"
      >
        {{ category }}
      </button>
    </section>

    <!-- Upcoming Events -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Upcoming Events</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="event in filteredUpcomingEvents" 
          :key="event.id"
          class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span :class="getEventBadgeClass(event.category)" class="px-3 py-1 rounded-full text-xs font-medium">
                {{ event.category }}
              </span>
              <span class="text-sm text-gray-500">{{ formatDate(event.date) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ event.description }}</p>
            <div class="space-y-2 text-sm text-gray-500">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ event.time }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ event.location }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ event.speaker }}
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
              <button class="w-full btn-primary text-sm">
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Past Events -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Past Events</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="event in filteredPastEvents" 
          :key="event.id"
          class="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span :class="getEventBadgeClass(event.category)" class="px-3 py-1 rounded-full text-xs font-medium">
                {{ event.category }}
              </span>
              <span class="text-sm text-gray-500">{{ formatDate(event.date) }}</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
            <p class="text-gray-600 text-sm mb-4">{{ event.description }}</p>
            <div class="space-y-2 text-sm text-gray-500">
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ event.time }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ event.location }}
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                {{ event.speaker }}
              </div>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-200">
              <button class="w-full btn-secondary text-sm">
                View Photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Event Calendar -->
    <section class="card">
      <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">Event Calendar</h2>
      <div class="bg-gray-50 rounded-lg p-8 text-center">
        <div class="max-w-md mx-auto">
          <svg class="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Interactive Calendar</h3>
          <p class="text-gray-600 mb-4">
            View all events in a calendar format for better planning and organization.
          </p>
          <button class="btn-primary">
            Open Calendar
          </button>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="text-center py-12 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">
        Stay Connected
      </h2>
      <p class="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
        Don't miss out on our upcoming events! Subscribe to our newsletter to receive 
        updates about new events, workshops, and activities.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="Enter your email"
          class="input-field"
        />
        <button class="btn-primary whitespace-nowrap">
          Subscribe
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedCategory = ref('All')

const categories = ['All', 'Workshop', 'Seminar', 'Conference', 'Competition', 'Social']

const upcomingEvents = [
  {
    id: 1,
    title: 'Web Development Workshop',
    description: 'Learn modern web development techniques using React and Node.js',
    category: 'Workshop',
    date: '2024-02-15',
    time: '9:00 AM - 5:00 PM',
    location: 'Computer Lab 1',
    speaker: 'Prof. Juan Dela Cruz'
  },
  {
    id: 2,
    title: 'Cybersecurity Seminar',
    description: 'Understanding the latest cybersecurity threats and prevention methods',
    category: 'Seminar',
    date: '2024-02-20',
    time: '2:00 PM - 4:00 PM',
    location: 'Auditorium',
    speaker: 'Prof. Sofia Garcia'
  },
  {
    id: 3,
    title: 'Programming Competition',
    description: 'Annual coding competition for CCS students',
    category: 'Competition',
    date: '2024-02-25',
    time: '8:00 AM - 6:00 PM',
    location: 'Computer Lab 2',
    speaker: 'CCS Faculty'
  },
  {
    id: 4,
    title: 'AI and Machine Learning Conference',
    description: 'Exploring the future of artificial intelligence in computing',
    category: 'Conference',
    date: '2024-03-05',
    time: '9:00 AM - 5:00 PM',
    location: 'Main Hall',
    speaker: 'Dr. Maria Santos'
  },
  {
    id: 5,
    title: 'Student-Faculty Social Night',
    description: 'Networking event for students and faculty members',
    category: 'Social',
    date: '2024-03-10',
    time: '6:00 PM - 9:00 PM',
    location: 'CCS Garden',
    speaker: 'CCS Student Council'
  },
  {
    id: 6,
    title: 'Database Management Workshop',
    description: 'Hands-on workshop on database design and management',
    category: 'Workshop',
    date: '2024-03-15',
    time: '1:00 PM - 5:00 PM',
    location: 'Computer Lab 3',
    speaker: 'Prof. Ana Reyes'
  }
]

const pastEvents = [
  {
    id: 7,
    title: 'Mobile App Development Workshop',
    description: 'Introduction to mobile app development using Flutter',
    category: 'Workshop',
    date: '2024-01-20',
    time: '9:00 AM - 5:00 PM',
    location: 'Computer Lab 1',
    speaker: 'Prof. Carlos Mendoza'
  },
  {
    id: 8,
    title: 'IT Career Fair',
    description: 'Annual career fair connecting students with industry professionals',
    category: 'Conference',
    date: '2024-01-15',
    time: '9:00 AM - 4:00 PM',
    location: 'Main Hall',
    speaker: 'Various Industry Partners'
  },
  {
    id: 9,
    title: 'Hackathon 2024',
    description: '24-hour coding challenge for innovative solutions',
    category: 'Competition',
    date: '2024-01-10',
    time: '24 Hours',
    location: 'Computer Labs',
    speaker: 'CCS Faculty'
  }
]

const filteredUpcomingEvents = computed(() => {
  if (selectedCategory.value === 'All') {
    return upcomingEvents
  }
  return upcomingEvents.filter(event => event.category === selectedCategory.value)
})

const filteredPastEvents = computed(() => {
  if (selectedCategory.value === 'All') {
    return pastEvents
  }
  return pastEvents.filter(event => event.category === selectedCategory.value)
})

const getEventBadgeClass = (category) => {
  const classes = {
    'Workshop': 'bg-blue-100 text-blue-800',
    'Seminar': 'bg-green-100 text-green-800',
    'Conference': 'bg-purple-100 text-purple-800',
    'Competition': 'bg-red-100 text-red-800',
    'Social': 'bg-yellow-100 text-yellow-800'
  }
  return classes[category] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}
</script>
