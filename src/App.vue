<template>
  <div id="app">
    <div class="menu-activator"></div>
    <div class="menu-slider">
      <img src="../public/imgs/logo.svg" alt="logo covid" class="logo">
      <div class="titulo">
        {{titulo}}
      </div>
      <hr class="padding-bottom-0 mb-0">
      <div class="selecionavel" :class="{'grafico-atual': $route.name == 'total'}" >
        <router-link :to="{name:'total'}"   class="nolink" >Visitas Totais</router-link>
      </div>
      <div class="selecionavel" :class="{'grafico-atual': $route.name == 'unicos'}" >
        <router-link :to="{name:'unicos'}" class="nolink" >Visitas Únicas</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      titulo: "MENU COVID"
    }
  }
}
</script>

<style>
#app{
  height: 100vh;
  width: 100vw;
}

.logo{
  width: 100%;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 5%;
}

.padding-bottom-0{
  padding-bottom: 0px;
}

.menu-activator{
  background-color: rgba(255, 0, 0, 0);
  position: absolute;
  top: 0;
  left: 0;
  z-index:99;
  width: 20px;
  height: 100%;
}

.menu-slider{
  position:absolute;
  top:0;
  left:-200px;
  width: 200px;
  height: 100%;
  -webkit-animation: slide 0.5s forwards;
  -webkit-animation-delay: 2s;
  animation: slide 0.5s forwards;
  background-color: rgb(0, 11, 48);
  animation-delay: 2s;
  z-index: 100;
  transition: 0.5s;
  box-shadow: 0px 10px 0px 0px;
}

.menu-activator:hover ~ .menu-slider{
  transition: 1s;
  left:0;
}

.menu-slider:hover{
  transition: 0.8s;
  background: rgb(0, 116, 145);
  left:0;
}

.titulo{
  text-align: center;
  font-weight: bolder;
  font-size: 1.3rem;
  color: white;
}

.selecionavel{
  width: 100%;
  text-decoration: none;
  text-align: center;
  padding: 10px 0px;
}

.selecionavel:hover{
  background-color: rgba(0, 255, 255, 0.589);
}

.grafico-atual{
  background-color: rgba(0, 0, 0, 0.158);
}

.nolink{
  color: white;
}

.nolink:hover{
  text-decoration: none;
  color: white;
}
</style>
