<script setup lang="ts">
import Footer from './pages/footer.vue';
import Navbar from './pages/navbar.vue';
import authHandler from '@/composables/oauth'

const router = useRouter()
router.beforeEach(async (to, from) => {
  await authHandler(to, from)
})
</script>

<template>
  <div class="flex-col h-screen">
    <Navbar />
    <NuxtPage class="h-full flex-1"/>
    <Footer />
  </div>
</template>