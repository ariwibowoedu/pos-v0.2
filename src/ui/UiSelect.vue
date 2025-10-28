<!-- 
 
Cara Penggunaan
    <UiSelect
      label="Kelas"
      v-model="kelas"
      :options="kelasOptions"
      searchable
      placeholder="Pilih kelas siswa..."
    />
-->


<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  label: String,
  options: {
    type: Array,
    required: true,
  },
  modelValue: [String, Number, Object],
  placeholder: {
    type: String,
    default: 'Choose option...',
  },
  searchable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const search = ref('')
const dropdownRef = ref(null)

const normalizedOptions = computed(() => {
  if (!Array.isArray(props.options)) return []

  return props.options.map((opt) => {
    if (typeof opt === 'string' || typeof opt === 'number') {
      return { label: String(opt), value: opt }
    }
    return opt
  })
})

const selectedLabel = computed(() => {
  const selected = normalizedOptions.value.find((opt) => opt.value === props.modelValue)
  return selected ? selected.label : null
})

const filteredOptions = computed(() => {
  if (!props.searchable || !search.value) return normalizedOptions.value
  return normalizedOptions.value.filter((opt) =>
    opt.label.toLowerCase().includes(search.value.toLowerCase())
  )
})

function toggleDropdown() {
  open.value = !open.value
}

function selectOption(option) {
  emit('update:modelValue', option.value)
  open.value = false
  search.value = ''
}

function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    open.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative w-full" ref="dropdownRef">
    <label v-if="label" class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
      {{ label }}
    </label>
    <div
      @click="toggleDropdown"
      class="flex items-center justify-between px-3 pt-4 pb-3 rounded-2xl bg-light-surface dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-primary/70 focus:border-primary shadow-sm transition-all duration-200"
    >
      <span class="truncate text-gray-800 dark:text-gray-100">
        {{ selectedLabel || placeholder }}
      </span>
      <svg
        class="w-4 h-4 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>

    <transition name="fade">
      <div
        v-if="open"
        class="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-56 overflow-y-auto"
      >
        <div v-if="searchable" class="p-2">
          <input
            v-model="search"
            type="text"
            placeholder="Search"
            class="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <ul>
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            @click="selectOption(option)"
            class="px-3 py-2 cursor-pointer hover:bg-blue-500 hover:text-white text-sm text-gray-700 dark:text-gray-200"
          >
            {{ option.label }}
          </li>
          <li
            v-if="filteredOptions.length === 0"
            class="px-3 py-2 text-sm text-gray-500 dark:text-gray-400"
          >
            No result
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>