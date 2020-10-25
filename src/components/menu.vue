<template>
  <div class="card fill-screen" style="width: 18rem;" :class="classes">
  <div class="card-body">
    <h5 class="card-title">MENU</h5>
    <h6 class="card-subtitle mb-2 text-muted">{{mes}}/{{ano}}</h6>
    <p class="card-text">{{text}}</p>
    <button type="button" class="btn btn-outline-info" @click="$emit('anterior')">Anterior</button>

    <button type="button" class="btn btn-outline-info" @click="$emit('proximo')">Próximo</button>
  </div>
  </div>
</template>

<script>
export default {
    props:['mes','ano']
}
</script>

<style>
.fill-screen{
  width: 100% !important;
  height: 100%;
}
</style>