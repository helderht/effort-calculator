<script setup>
import {ref, computed, watch} from 'vue'
import {RouterLink} from 'vue-router'
import draggable from 'vuedraggable'
import validateMonth, {validateDay, validateTeam} from '@/services/validations'
import Alert from '@/components/Alert.vue'

const name=ref('')
const owner=ref('')
const requirements=ref([])
const factors=ref([
  {factor: 'Data comunication', pts: 0},
  {factor: 'Distributed data processing', pts: 0},
  {factor: 'Performance', pts: 0},
  {factor: 'Heavily used settings', pts: 0},
  {factor: 'Transaction frecuency', pts: 0},
  {factor: 'Online data entry', pts: 0},
  {factor: 'End user Efficiency', pts: 0},
  {factor: 'Online updates', pts: 0},
  {factor: 'Complex processing', pts: 0},
  {factor: 'Reusability', pts: 0},
  {factor: 'Ease of installation', pts: 0},
  {factor: 'Ease of operation', pts: 0},
  {factor: 'Installation in different places', pts: 0},
  {factor: 'Ease of change', pts: 0},
])
const productivity=ref(8)
const days=ref(20)
const hours=ref(6)
const team=ref(1)
const effort=ref(0)

let uiFactors=ref(false)
let uiProductivity=ref(false)
let uiDays=ref(false)
let uiHours=ref(false)
let uiTeam=ref(false)

const addReq=()=>{
  requirements.value.push({req: '', type: 'EO', pts: 4})
}
const removeReq=(index)=>{
  if (index > -1) requirements.value.splice(index, 1)
}

const verifyFactors=watch(factors, ()=>{
  factors.value.some(elm=>elm.pts<0 || elm.pts>5? uiFactors.value=true: uiFactors.value=false)
}, {deep: true})
const verifyProductivity=watch(productivity, ()=>{
  productivity.value < 1? uiProductivity.value=true: uiProductivity.value=false
})
const verifyDays=watch(days, ()=>{
  validateMonth(days.value)? uiDays.value=true: uiDays.value=false
})
const verifyHours=watch(hours, ()=>{
  validateDay(hours.value)? uiHours.value=true: uiHours.value=false
})
const verifyTeam=watch(team, ()=>{
  validateTeam(team.value)? uiTeam.value=true: uiTeam.value=false
})

const calcEffort=computed(()=>{
  if(uiFactors.value || uiProductivity.value || uiDays.value || uiHours.value){
    return effort.value=0
  }else{
    let resReq=0, resFac=0
    requirements.value.forEach(elm=>resReq=resReq+elm.pts)
    factors.value.forEach(elm=>resFac=resFac+elm.pts)
    return effort.value=resReq*(0.65+0.01*resFac)*productivity.value
  }
})
const calcTime=computed(()=>{
  if(uiTeam.value){
    return 0
  }else{
    return effort.value/(days.value*hours.value*team.value)
  }
})
</script>

<template>
  <div class="container-fluid">
    <header class="d-flex justify-content-between align-items-center border-bottom py-2 mb-3">
      <div class="d-flex justify-content-between align-items-center">
        <RouterLink class="me-3" to="/"><img src="../assets/favicon.svg" alt="Logo" width="32"></RouterLink>
        <h5 class="fw-bold">Function Points</h5>
      </div>
      <div class="btn-toolbar">
        <div class="btn-group">
          <button class="btn btn-outline-secondary"><i class="fas fa-share-alt"></i> Share</button>
          <button class="btn btn-outline-secondary"><i class="fas fa-file-export"></i> Export</button>
        </div>
      </div>
    </header>
    <div class="row flex-md-row-reverse">
      <div class="col-md-8">
        <!-- Project -->
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
        <!-- Requirements -->
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5>Requirements</h5>
              <button class="btn text-muted" data-bs-toggle="collapse" data-bs-target="#collapse-fp"><i class="fas fa-sort"></i></button>
            </div>
            <div id="collapse-fp" class="collapse mt-3">
              <draggable v-model="requirements" item-key="id" handle=".input-group-text" animation="300">
                <template #item="{index, element}">
                  <div class="input-group mb-3">
                    <span class="input-group-text">{{index+1}}</span>
                    <input class="form-control w-50" v-model="element.req">
                    <select class="form-control" v-model="element.type">
                      <option>EI</option>
                      <option>EO</option>
                      <option>EQ</option>
                      <option>ILF</option>
                      <option>EIF</option>
                    </select>
                    <select class="form-control" v-model.number="element.pts">
                      <template v-if="element.type==='EO'">
                        <option>4</option>
                        <option>5</option>
                        <option>7</option>
                      </template>
                      <template v-else-if="element.type==='ILF'">
                        <option>7</option>
                        <option>10</option>
                        <option>15</option>
                      </template>
                      <template v-else-if="element.type==='EIF'">
                        <option>5</option>
                        <option>7</option>
                        <option>10</option>
                      </template>
                      <template v-else>
                        <option>3</option>
                        <option>4</option>
                        <option>6</option>
                      </template>
                    </select>
                    <button class="btn btn-outline-secondary" @click="removeReq(index)"><i class="fas fa-minus"></i></button>
                  </div>
                </template>
              </draggable>
              <div class="d-flex justify-content-center">
                <button class="btn btn-outline-secondary" @click="addReq"><i class="fas fa-plus"></i></button></div>
            </div>
          </div>
        </div>
        <!-- Factors -->
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5>Factors</h5>
              <Alert msg="Only values from 0 to 5" v-if="uiFactors"/>
              <!-- <small class="text-danger" v-if="uiFactors">Only values from 0 to 5</small> -->
              <button class="btn text-muted" data-bs-toggle="collapse" data-bs-target="#collapse-af"><i class="fas fa-sort"></i></button>
            </div>
            <div id="collapse-af" class="collapse">
              <div class="mt-3">
                <div class="input-group mb-3" v-for="(element, index) in factors" :key="index">
                  <span class="input-group-text">{{index+1}}</span>
                  <span class="input-group-text w-75 clear">{{element.factor}}</span>
                  <input class="form-control" type="number" min="0" max="5" v-model.number="element.pts">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="sticky-top">
          <!-- Output -->
          <div class="card mb-3">
            <div class="card-body">
              <h5>Output</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Efforts</span>
                <div class="text-end">
                  <span class="d-block" :class="{'text-success': calcEffort>0}">{{ parseFloat(calcEffort).toFixed(2)}}</span>
                  <small class="text-muted">Hrs./Man</small>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Time</span>
                <div class="text-end">
                  <span class="d-block" :class="{'text-success': calcTime>0}">{{parseFloat(calcTime).toFixed(2)}}</span>
                  <small class="text-muted">Months</small>
                </div>
              </li>
            </ul>
          </div>
          <!-- Settings -->
          <div class="card">
            <div class="card-body">
              <h5>Settings</h5>
              <div class="input-group my-3">
                <span class="input-group-text w-50" :class="{'text-danger': uiProductivity}">Productivity</span>
                <input class="form-control" type="number" min="1" v-model.number="productivity">
              </div>
              <div class="input-group my-3">
                <span class="input-group-text w-50" :class="{'text-danger': uiDays}">Days</span>
                <input class="form-control" type="number" min="1" max="30" v-model="days">
              </div>
              <div class="input-group my-3">
                <span class="input-group-text w-50" :class="{'text-danger': uiHours}">Hours</span>
                <input class="form-control" type="number" min="1" max="23" v-model="hours">
              </div>
              <div class="input-group my-3">
                <span class="input-group-text w-50" :class="{'text-danger': uiTeam}">Team</span>
                <input class="form-control" type="number" min="1" v-model="team">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>