<template>
  <div class="fixed top-4 right-4 z-50 space-y-4">
    <TransitionGroup name="alert" tag="div">
      <AlertBox
        v-for="alert in alerts"
        :key="alert.id"
        :type="alert.type"
        :title="alert.title"
        :message="alert.message"
        :confirm-text="alert.confirmText"
        :cancel-text="alert.cancelText"
        :show-cancel="alert.showCancel"
        :auto-close="alert.autoClose"
        :auto-close-delay="alert.autoCloseDelay"
        @confirm="alert.onConfirm"
        @cancel="alert.onCancel"
        @close="alert.onClose"
      />
    </TransitionGroup>
  </div>
</template>

<script setup>
import AlertBox from './AlertBox.vue'
import { useAlert } from '../composables/useAlert'

const { alerts } = useAlert()
</script>

<style scoped>
.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease;
}

.alert-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.alert-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.alert-move {
  transition: transform 0.3s ease;
}
</style>
