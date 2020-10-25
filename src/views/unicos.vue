<template>
  <div id="total">
      <menuItem id="menu" :mes="data.mes" :ano="data.ano" @anterior="trocaMensal(-1)" @proximo="trocaMensal(1)"/>
      <card id="card-total" :title="total.title" :subtitle="total.subtitle" :text="total.text" classes="big-text"/>
      <card id="card-mes" :title="mensal.title" :subtitle="mensal.subtitle" :text="mensal.text" classes="big-text"/>
      <card id="card-hoje" :title="hoje.title" :subtitle="hoje.subtitle" :text="hoje.text" classes="big-text"/>
      <acumulado id="grafico-acumulado" :valores="graficos.valor" v-if="!loading" :key="acumulado_chave"/>
      <diario id="grafico-diario" :valores="graficos.valor" v-if="!loading" :key="diario_chave"/>
  </div>
</template>

<script>
import card from '../components/card'
import acumulado from '../components/acumulado'
import diario from '../components/diario'
import menuItem from '../components/menu'

export default {
  data(){
    return {
      atual:0,
      acumulado_chave:0,
      diario_chave:0,
      maximo: 0,
      loading:true,
      api: {},
      data: {
        mes: '',
        ano: 0
      },
      graficos:{
        valor: [],
        data: {}
      },
      total:{
        title: 'TOTAL VISITAS',
        subtitle: 'Total de Visitas Únicas Até Hoje',
        text: 0
      },
      mensal:{
        title: 'VISITAS DO MÊS',
        subtitle: 'Total de Visitas Únicas desse Mês',
        text: 0
      },
      hoje:{
        title: 'VISITAS HOJE',
        subtitle: 'Total de Visitas Únicas Hoje',
        text: 0
      },
    }
  },
  components:{
      card,
      acumulado,
      diario,
      menuItem
  },
  methods:{
    
    trocaMensal(num){
      if(this.atual + num > this.maximo){this.atual = 0}
      else if(this.atual + num < 0){this.atual = this.maximo}
      else {this.atual += num }

      this.graficos.valor = this.api[this.atual].unicos
      this.graficos.data = this.api[this.atual].data

      this.mensal.text = this.api[this.atual].unicos.reduce((soma,atual) => soma + atual)
      this.data = this.api[this.atual].data
      if(this.atual == this.maximo){
        const hoje = (new Date()).getDate()
        this.hoje.text = this.api[this.atual].unicos[hoje]
      }
      else{
        this.hoje.text = 'Indisponível'
      }

      this.acumulado_chave++
      this.diario_chave++
    }
  },
  async mounted(){
    const api = await fetch(this.$store.getters.link('visita',this.$route.params)).then(response => response.json())
    
    const total = api.reduce((valor, arr) => {
      valor += arr.unicos.reduce((soma,total) => soma + total)
      return valor
    },0)
    
    this.atual = api.length - 1
    this.maximo = api.length - 1
    this.api = api
    this.total.text = total
    this.trocaMensal(0)
    this.loading = false
  }
}

</script>

<style>
#total{
  padding:10px;
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: repeat(4,1fr);
  grid-template-columns: repeat(8,1fr);
  row-gap: 15px;
  column-gap: 10px;
  grid-template-areas: 
  "menu menu menu tabela-diario  tabela-diario tabela-diario tabela-diario tabela-diario"
  "card-total card-total card-total tabela-diario tabela-diario tabela-diario tabela-diario tabela-diario"
  "card-mes card-mes card-mes tabela-acumulado tabela-acumulado tabela-acumulado tabela-acumulado tabela-acumulado"
  "card-hoje card-hoje card-hoje tabela-acumulado tabela-acumulado tabela-acumulado tabela-acumulado tabela-acumulado";
}

#card-total{
  grid-area: card-total;
}

#card-mes{
  grid-area: card-mes;
}

#card-hoje{
  grid-area: card-hoje;
}

#grafico-acumulado{
  grid-area: tabela-acumulado;
}

#grafico-diario{
  grid-area: tabela-diario;
}

#menu{
  grid-area:menu;
}
</style>