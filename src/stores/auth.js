import { defineStore } from "pinia";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/stores/toast"
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const user = ref(null)
    const loading = ref(false)
    const { showToast } = useToast()

    async function initAuth() {
        loading.value = true
        const { data, error } = await supabase.auth.getSession()
        if (error) console.error(`Error getting session`, error.message)
        user.value = data?.session?.user || null
        loading.value = false

        supabase.auth.onAuthStateChange((event, session) => {
            user.value = session?.user || null
        })
    }

    async function signUp(email, password) {
        loading.value = true
        const { error } = await supabase.auth.signUp({ email, password })
        showToast('Silahkan lakukan konfirmasi email anda sebelum login.')
        loading.value = false
        if (error) showToast(`Error. ${error.message}`, 'Error')
    }

    async function signIn(email, password) {
        loading.value = true
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        loading.value = false
        if (error) showToast(`Error. ${error.message}`, "error")
        else user.value = data.user
    }

    async function signOut() {
        loading.value = true
        await supabase.auth.signOut()
        loading.value = false
        user.value = null
    }

    async function fetchUser() {
        loading.value = true
        const { data, error } = await supabase.auth.getUser()
        loading.value = false
        if (error) {
            console.error(`Error fetching user: ${error.message}`)
            user.value = null
            return null
        }

        user.value = data?.user || null
        return user.value
    }

    return {
        user,
        loading,
        initAuth,
        fetchUser,
        signIn,
        signUp,
        signOut
    }
})