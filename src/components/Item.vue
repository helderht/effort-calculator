<script setup>
import {RouterLink} from 'vue-router'
defineProps({
  title: {type: String},
  description: {type: String},
  target: {type: String}
})
</script>

<template>
  <div class="col-sm-6 col-lg-4 mb-3">
    <RouterLink class="item" :to="target" >
      <div class="card">
        <div class="card-body text-center">
        <h5>{{title}}</h5>
        <p class="text-dark">{{description}}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style>
.item{
  text-decoration: none;
}
</style>