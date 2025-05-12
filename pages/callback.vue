<script setup>
const session = useSupabaseSession();
onMounted(async() => {
    console.log(session.value)

    if (session?.value?.user){
        navigateTo('/')
    }

    else {
        navigateTo('/login  ')
    }
})
</script>

    <template>
    <div class="flex items-center justify-center">
        <h1 class="text-5xl text-black font-extrabold text-center">CALLBACK</h1>
    </div>
    </template>


<style scoped>
    
</style>
