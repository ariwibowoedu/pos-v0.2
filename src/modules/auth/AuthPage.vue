<script setup>
import UiButton from '@/ui/UiButton.vue'
import UiInput from '@/ui/UiInput.vue'

import { useAuthStore } from '@/stores/auth'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const auth = useAuthStore()
const mode = ref('login')
const activeTab = 'bg-indigo-100 text-indigo-700'
const inactiveTab = 'bg-gray-100 text-gray-500'

const login = reactive({ email: '', password: '' })
const register = reactive({ email: '', password: '' })

const error = ref([])

function validateLogin() {
  error.value = {}
  if (!login.email) error.value.email = 'Email wajib diisi'
  else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(login.email))
    error.value.email = 'Format email tidak valid'
  if (!login.password) error.value.password = 'Password wajib diisi'
  return Object.keys(error.value).length === 0
}

function validateRegister() {
  error.value = {}
  if (!register.email) error.value.email = 'Email wajib diisi'
  else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(register.email))
    error.value.email = 'Format email tidak valid'
  if (!register.password) error.value.password = 'Password wajib diisi'
  return Object.keys(error.value).length === 0
}

async function submitLogin() {
  if (!validateLogin()) return
  await auth.signIn(login.email, login.password)
  router.push('/dashboard')
}

async function submitRegister() {
  if (!validateRegister()) return
  await auth.signUp(register.email, register.password)
  router.push('/login')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-light-overlay rounded-2xl shadow-xl overflow-hidden">
      <div class="p-8">
        <div class="flex justify-center mb-6 gap-2">
          <button
            @click="mode = 'login'"
            :class="mode === 'login' ? activeTab : inactiveTab"
            class="px-4 py-2 rounded-lg font-medium"
          >
            Login
          </button>
          <button
            @click="mode = 'register'"
            :class="mode === 'register' ? activeTab : inactiveTab"
            class="px-4 py-2 rounded-lg font-medium"
          >
            Register
          </button>
        </div>
        <transition name="fade" mode="out-in">
          <form
            v-if="mode === 'login'"
            key="login"
            @submit.prevent="submitLogin"
            class="space-y-4 min-h-[320px] flex flex-col justify-center"
          >
            <div>
              <ui-input
                type="email"
                v-model="login.email"
                label="Email"
                aria-label="email"
                id="email"
                :error="error.email"
              />
            </div>
            <div>
              <ui-input
                type="password"
                v-model="login.password"
                label="password"
                aria-label="password"
                id="password"
                :error="error.password"
              />
            </div>

            <ui-button
              type="submit"
              variant="primary"
              class="w-full"
              size="lg"
              :loading="auth.loading"
            >
              Login
            </ui-button>
          </form>

          <form
            v-else
            key="register"
            @submit.prevent="submitRegister"
            class="space-y-4 min-h-[320px] flex flex-col justify-center"
          >
            <div>
              <ui-input
                type="email"
                v-model="register.email"
                label="Email"
                aria-label="email"
                id="email"
                :error="error.email"
              />
            </div>
            <div>
              <ui-input
                type="password"
                v-model="register.password"
                label="password"
                aria-label="password"
                id="password"
                :error="error.password"
              />
            </div>

            <ui-button
              type="submit"
              size="lg"
              variant="primary"
              class="w-full"
              :loading="auth.loading"
            >
              Register
            </ui-button>
          </form>
        </transition>
      </div>
    </div>
  </div>
</template>