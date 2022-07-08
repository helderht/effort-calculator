<script setup>
  defineProps({
    title: {type: String},
    value: {required: true},
    unit: {type: String}
  })
</script>

<template>
  <li class="list-group-item d-flex justify-content-between align-items-center">
    <span>{{title}}</span>
    <div class="text-end">
      <span class="d-block" :class="{'text-success': value>0}">{{value}}</span>
      <small class="text-muted">{{unit}}</small>
    </div>
  </li>
</template>