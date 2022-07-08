<script setup>
import {ref, watch, computed} from 'vue'
import Alert from '@/components/Alert.vue'
import validateMonth, {validateDay, validateTeam} from '@/services/validations'
import ResultItem from '../components/ResultItem.vue';

const name=ref('')
const owner=ref('')
const actors=ref([
  {level: 'Simple', weight: 1, nro: 0},
  {level: 'Medium', weight: 2, nro: 0},
  {level: 'Complex', weight: 3, nro: 0},
])
const cases=ref([
  {level: 'Simple', weight: 5, nro: 0},
  {level: 'Medium', weight: 10, nro: 0},
  {level: 'Complex', weight: 15, nro: 0},
])
const technical=ref([
  {factor: 'Distributed system', weight: 2, pts: 0},
  {factor: 'Performance goals', weight: 1, pts: 0},
  {factor: 'Efficiency with respect to the end user',weight: 1,  pts: 0},
  {factor: 'complex processing', weight: 1, pts: 0},
  {factor: 'Reusable code', weight: 1, pts: 0},
  {factor: 'Easy installation', weight: 0.5, pts: 0},
  {factor: 'Easy to use', weight: 0.5, pts: 0},
  {factor: 'Portability', weight: 2, pts: 0},
  {factor: 'Easy to change', weight: 1, pts: 0},
  {factor: 'Concurrent use', weight: 1, pts: 0},
  {factor: 'Security features', weight: 1, pts: 0},
  {factor: 'Accessible by third parties', weight: 1, pts: 0},
  {factor: 'Special trainig required', weight: 1, pts: 0}
])
const enviroment=ref([
  {factor: 'Family with RUP', weight: 1.5, pts: 0},
  {factor: 'Application experience', weight: 0.5, pts: 0},
  {factor: 'Object oriented experience', weight: 1, pts: 0},
  {factor: 'Analysis capabilities', weight: 0.5, pts: 0},
  {factor: 'Motivation', weight: 1, pts: 0},
  {factor: 'Stable requirements', weight: 2, pts: 0},
  {factor: 'Part-time worker', weight: -1, pts: 0},
  {factor: 'Complex language', weight: -1, pts: 0}
])
const days=ref(20)
const hours=ref(6)
const team=ref(1)
const productivity=ref(0)
const effort=ref(0)

let uiTechnical=ref(false)
let uiEnviroment=ref(false)
let uiActors=ref(false)
let uiCases=ref(false)
let uiDays=ref(false)
let uiHours=ref(false)
let uiTeam=ref(false)

const verifyActors=watch(actors, ()=>{
  actors.value.some(elm=>elm.nro<0? uiActors.value=true: uiActors.value=false)
}, {deep: true})
const verifyCases=watch(cases, ()=>{
  cases.value.some(elm=>elm.nro<0? uiCases.value=true: uiCases.value=false)
}, {deep: true})
const verifyTechinical=watch(technical, ()=>{
  technical.value.some(elm=>elm.pts<0 || elm.pts>5? uiTechnical.value=true: uiTechnical.value=false)
}, {deep: true})
const verifyEnviroment=watch(enviroment, ()=>{
  enviroment.value.some(elm=>elm.pts<0 || elm.pts>5? uiEnviroment.value=true: uiEnviroment.value=false)
}, {deep: true})
const verifyDays=watch(days, ()=>{
  validateMonth(days.value)? uiDays.value=true: uiDays.value=false
})
const verifyHours=watch(hours, ()=>{
  validateDay(hours.value)? uiHours.value=true: uiHours.value=false
})
const verifyTeam=watch(team, ()=>{
  validateTeam(team.value)? uiTeam.value=true: uiTeam.value=false
})

const calcProductivity=computed(()=>{
  if(uiEnviroment.value){
    return productivity.value=0
  }
  let count = 0
  for (let i = 0; i < enviroment.value.length; i++) {
    if (enviroment.value[i].pts <= 3 && i < 6) {
      count = count + 1
    } else if (enviroment.value[i].pts > 3 && i > 5) {
      count = count + 1
    }
  }
  if (count <= 2) {
    return productivity.value=20
  } else if (count > 2 && count <= 4) {
    return productivity.value=28
  } else {
    return productivity.value=36
  }
})
const calcEffort=computed(()=>{
  if(uiActors.value || uiCases.value || uiTechnical.value || uiEnviroment.value || uiDays.value || uiHours.value){
    return effort.value=0
  }else{
    let resActors=0, resCases=0, resTechnical=0, resEnviroment=0
    actors.value.forEach(elm=>resActors+=elm.weight*elm.nro)
    cases.value.forEach(elm=>resCases+=elm.weight*elm.nro)
    technical.value.forEach(elm=>resTechnical+=elm.weight*elm.pts)
    enviroment.value.forEach(elm=>resEnviroment+=elm.weight*elm.pts)
    return effort.value=(resActors+resCases)*(0.6+(0.01*resTechnical))*(1.4-(0.03*resEnviroment))*productivity.value
  }
})
const calcTime=computed(()=>{
  if (uiTeam.value){
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
        <h5 class="fw-bold">Use Cases Points</h5>
      </div>
      <button class="btn btn-outline-secondary"><i class="fas fa-file-export"></i> Export</button>
    </header>
    <div class="row flex-md-row-reverse">
      <div class="col-md-8">
        <!-- project -->
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
        <!-- Actors -->
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <h5>Actors</h5>
                  <Alert msg="Only values positives" v-if="uiActors"/>
                </div>
                <div class="input-group mt-3" v-for="(elm, index) in actors" :key="index">
                  <span class="input-group-text w-50">{{elm.level}}</span>
                  <input class="form-control" type="number" min="0" v-model.number="elm.nro">
                </div>
              </div>
            </div>
          </div>
          <!-- Cases -->
          <div class="col-md-6">
            <div class="card mb-3">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center">
                  <h5>Use Cases</h5>
                  <Alert msg="Only values positives" v-if="uiCases"/>
                </div>
                <div class="input-group mt-3" v-for="(elm, index) in cases" :key="index">
                  <span class="input-group-text w-50">{{elm.level}}</span>
                  <input class="form-control" type="number" min="0" v-model="elm.nro">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- technical -->
        <div class="card mb-3">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5>Technical Factors</h5>
              <Alert msg="Only values from 0 to 5" v-if="uiTechnical"/>
              <button class="btn text-muted" data-bs-toggle="collapse" data-bs-target="#technical"><i class="fas fa-sort"></i></button>
            </div>
            <div id="technical" class="collapse">
              <div class="mt-3">
                <div class="input-group mb-3" v-for="(elm, index) in technical" :key="index">
                  <span class="input-group-text">{{index+1}}</span>
                  <span class="input-group-text w-75">{{elm.factor}}</span>
                  <input class="form-control" type="number" min="0" max="5" v-model.number="elm.pts">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- enviroment -->
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h5>Enviroment Factors</h5>
              <Alert msg="Only values from 0 to 5" v-if="uiEnviroment"/>
              <button class="btn text-muted" data-bs-toggle="collapse" data-bs-target="#enviroment"><i class="fas fa-sort"></i></button>
            </div>
            <div id="enviroment" class="collapse">
              <div class="mt-3">
                <div class="input-group mb-3" v-for="(elm, index) in enviroment" :key="index">
                  <span class="input-group-text">{{index+1}}</span>
                  <span class="input-group-text w-75">{{elm.factor}}</span>
                  <input class="form-control" type="number" min="0" max="5" v-model.number="elm.pts">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="sticky-top">
          <!-- Results -->
          <div class="card mb-3">
            <div class="card-body">
              <h5>Results</h5>
            </div>
            <ul class="list-group list-group-flush">
              <ResultItem title="Productivity" :value="calcProductivity" unit="Hrs./Use Case"/>
              <ResultItem title="Effort" :value="parseFloat(calcEffort).toFixed(2)" unit="Hrs./Man"/>
              <ResultItem title="Time" :value="parseFloat(calcTime).toFixed(2)" unit="Months"/>
<!--               <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Productivity</span>
                <div class="text-end">
                  <span class="d-block">{{calcProductivity}}</span>
                  <small>Hrs./Use Case</small>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Effort</span>
                <div class="text-end">
                  <span class="d-block" :class="{'text-success': calcEffort>0}">{{parseFloat(calcEffort).toFixed(2)}}</span>
                  <small>Hrs./Man</small>
                </div>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>Time</span>
                <div class="text-end">
                  <span class="d-block" :class="{'text-success': calcTime>0}">{{parseFloat(calcTime).toFixed(2)}}</span>
                  <small>Months</small>
                </div>
              </li> -->
            </ul>
          </div>
          <!-- Settings -->
          <div class="card">
            <div class="card-body">
              <h5>Settings</h5>
              <div class="input-group my-3">
                <span class="input-group-text w-50" :class="{'text-danger': uiDays}">Days</span>
                <input class="form-control" type="number" min="1" max="30" v-model.number="days">
              </div>
              <div class="input-group mb-3">
                <span class="input-group-text w-50" :class="{'text-danger': uiHours}">Hours</span>
                <input class="form-control" type="number" min="1" max="23" v-model="hours">
              </div>
              <div class="input-group">
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