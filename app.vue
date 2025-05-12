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
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <Footer></Footer>
  </div>
</template>