<script setup>
  import Item from '../components/Item.vue'
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <img src="../assets/logo.svg" alt="logo" height="64">
    </header>
    <div class="text-center my-3">
      <h1>An estimation for you software projects</h1>
      <p class="lead">“When you can measure what you are talking about and express it in numbers, you know something about it; but when you cannot measure, when you cannot express it in numbers, your knowledge it is meager and unsatisfactory” (Kelvin).</p>
    </div>
    <div class="row justify-content-evenly">
      <Item title="Function P." description="Its objective is to measure the functionality delivered to the user regardless of the technology used" target="/functionp"/>
      <Item title="Use Cases P." description="Its main advantage is its fast adaptation when using UML in project development" target="/usecasesp"/>
    </div>
    <footer class="py-3 text-center">
      <a href="https://github.com/helderht/effort-calculator" target="_blank"><i class="fa-brands fa-github fa-xl"></i></a>
    </footer>
    </div>
</template>
