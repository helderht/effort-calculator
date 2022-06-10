<script setup>
  import Item from '../components/Item.vue'
</script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <img src="../assets/logo.svg" alt="logo" height="64">
    </header>
    <div class="text-center my-3">
      <h1>An estimate for you software projects</h1>
      <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dolorum accusantium inventore quis, voluptatum sint eligendi voluptas. Sequi explicabo, perferendis animi neque repellat voluptates aliquam aperiam voluptatibus laboriosam, iure numquam?</p>
    </div>
    <div class="row justify-content-evenly">
      <Item title="Function P." description="Lorem ipsum dolor sit, amet consectetur adipisicing." target="/functionp"/>
      <Item title="Use Cases P." description="Lorem ipsum dolor sit, amet consectetur adipisicing." target="/usecasesp"/>
    </div>
    <footer class="fixed-bottom py-3 text-center">
      <small>&copy helder.devjs</small>
    </footer>
    </div>
</template>
