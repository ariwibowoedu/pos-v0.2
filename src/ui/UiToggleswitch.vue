<script setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  size: { type: String, default: 'md' }, // sm | md | lg
  color: { type: String, default: 'blue' },
})

const emit = defineEmits(['update:modelValue'])

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}

const trackSize = {
  sm: 'w-10 h-5',
  md: 'w-12 h-6',
  lg: 'w-16 h-8',
}
// ukuran knob (bulatan)
const knobSize = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-7 h-7',
}
</script>

<template>
  <button
    @Click="toggle"
    class="flex items-center rounded-full p-0.5 transition-colors duration-300 focus:outline-none"
    :class="[
      trackSize[size],
      modelValue ? `bg-${color}-500` : 'bg-gray-300 dark:bg-gray-600',
      modelValue ? 'justify-end' : 'justify-start',
    ]"
  >
    <span
      class="rounded-full bg-white shadow-md transform transition-transform duration-300"
      :class="knobSize[size]"
    />
  </button>
</template>
