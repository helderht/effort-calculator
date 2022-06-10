<script setup>
defineProps({
  msg:{type: String, required: true}
})
</script>
<template>
  <small class="text-danger">{{msg}}</small>
</template>