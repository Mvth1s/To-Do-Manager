<script setup lang="ts">
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <Header />
  <main class="container"></main>
  <Footer />
</template>

<style>
#app{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main{
  flex:1;
  max-width: 1000px;
  margin: 2rem auto;
  width: 100%;
  padding: 0 1rem;
}
</style>
