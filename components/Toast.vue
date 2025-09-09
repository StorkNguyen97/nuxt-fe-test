<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <!-- Success Icon -->
              <svg
                class="h-6 w-6 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div class="ml-3 w-0 flex-1">
              <p class="text-sm font-medium text-gray-900">
                {{ title }}
              </p>
              <p class="mt-1 text-sm text-gray-500" v-if="message">
                {{ message }}
              </p>
            </div>
            <div class="ml-4 flex-shrink-0 flex">
              <button
                @click="close"
                class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <span class="sr-only">Close</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- Progress bar -->
        <div class="w-full bg-gray-200 h-1">
          <div
            class="bg-green-400 h-1 transition-all duration-75 ease-linear"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  title: string
  message?: string
  duration?: number
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  message: '',
  duration: 4000,
  visible: false
})

const emit = defineEmits<{
  close: []
}>()

const progress = ref(100)
let progressInterval: ReturnType<typeof setInterval> | null = null
let autoCloseTimeout: ReturnType<typeof setTimeout> | null = null

const close = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  if (autoCloseTimeout) {
    clearTimeout(autoCloseTimeout)
    autoCloseTimeout = null
  }
  emit('close')
}

watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    // Reset progress
    progress.value = 100
    
    // Start progress countdown
    const updateInterval = 75 // Update every 75ms for smooth animation
    const totalSteps = props.duration / updateInterval
    let currentStep = 0
    
    progressInterval = setInterval(() => {
      currentStep++
      progress.value = Math.max(0, 100 - (currentStep / totalSteps) * 100)
      
      if (currentStep >= totalSteps) {
        close()
      }
    }, updateInterval)
    
    // Auto close after duration
    autoCloseTimeout = setTimeout(() => {
      close()
    }, props.duration)
  } else {
    // Clean up intervals when hidden
    if (progressInterval) {
      clearInterval(progressInterval)
      progressInterval = null
    }
    if (autoCloseTimeout) {
      clearTimeout(autoCloseTimeout)
      autoCloseTimeout = null
    }
  }
})

onUnmounted(() => {
  close()
})
</script>
