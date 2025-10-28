<template>
  <div class="relative w-full">
    <!-- Select -->
    <select
      v-model="internalValue"
      :id="id"
      class="w-full px-3 pt-4 pb-3 border rounded-2xl bg-light-overlay dark:bg-dark-overlay focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary shadow-sm transition-all duration-200"
      :multiple="multiple"
      :size="multiple ? size : null"
    >
      <!-- Placeholder (hanya untuk single) -->
      <option v-if="!multiple && placeholder" value="" disabled hidden>
        {{ placeholder }}
      </option>

      <!-- Option rendering -->
      <template v-for="(opt, index) in normalizedOptions" :key="index">
        <!-- Grouped options -->
        <optgroup v-if="opt.options" :label="opt.label">
          <option v-for="(child, i) in opt.options" :key="i" :value="child.value">
            {{ child.label }}
          </option>
        </optgroup>

        <!-- Normal option -->
        <option v-else :value="opt.value">
          {{ opt.label }}
        </option>
      </template>
    </select>

    <!-- Helper text -->
    <p v-if="helper" class="mt-1 text-sm text-gray-500">{{ helper }}</p>

    <!-- Error text -->
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    default: () => [],
  },
  id: {
    type: String,
    default: 'base-select',
  },
  placeholder: {
    type: String,
    default: 'Select an option...',
  },
  options: {
    type: Array,
    default: () => [],
  },
  helper: String,
  error: String,
  multiple: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
    default: 6, // tinggi list kalau multiple aktif
  },
})

const emit = defineEmits(['update:modelValue'])

const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

/**
 * Normalize options:
 * - String → { value: string, label: string }
 * - Object → { value, label }
 * - Group → { label, options: [...] }
 */
const normalizedOptions = computed(() =>
  props.options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt }
    }
    if (opt.options) {
      // handle group
      return {
        label: opt.label,
        options: opt.options.map((child) =>
          typeof child === 'string' ? { value: child, label: child } : child
        ),
      }
    }
    return opt
  })
)
</script>
