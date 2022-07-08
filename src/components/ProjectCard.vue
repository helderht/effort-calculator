<script setup>
  import {ref} from 'vue'

  const name=ref('')
  const owner=ref('')
</script>

<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h5>Project</h5>
        <button class="btn text-muted" data-bs-toggle="collapse" data-bs-target="#collapse-pro"><i class="fas fa-sort"></i></button>
      </div>
      <div id="collapse-pro" class="collapse">
        <div class="row mt-3">
          <div class="col-md-6">
            <div class="input-group mb-3 mb-md-0">
              <span class="input-group-text">Name</span>
              <input class="form-control" type="text" v-model="name">
            </div>
          </div>
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text">Owner</span>
              <input class="form-control" type="text" v-model="owner">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>