<script setup>
import { ref, onMounted, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Write something...',
  },
  height: {
    type: String,
    default: '200px',
  },
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref(null)
let quill

// Initialize Quill
onMounted(() => {
  quill = new Quill(editorRef.value, {
    theme: 'snow',
    placeholder: props.placeholder,
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ header: [1, 2, 3, false] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  })

  // Set initial value if provided
  if (props.modelValue) {
    quill.root.innerHTML = props.modelValue
  }

  // Sync content with parent
  quill.on('text-change', () => {
    emit('update:modelValue', quill.root.innerHTML)
  })
})

// If modelValue changes externally, update the editor
watch(
  () => props.modelValue,
  (newVal) => {
    if (quill && newVal !== quill.root.innerHTML) {
      quill.root.innerHTML = newVal || ''
    }
  }
)
</script>

<template>
  <div>
    <div
      ref="editorRef"
      class="border rounded"
      :style="{ height: height, overflowY: 'auto' }"
    ></div>
  </div>
</template>
