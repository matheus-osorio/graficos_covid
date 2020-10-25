<template>
  <div class="card">
      <echart :options="graph" autoresize />
  </div>
</template>

<script>
export default {
    props:['valores'],
    data(){
        return {
            graph: {}
        }
    },
    methods:{
        criaGrafico(arr){
            const option = {}
            const x = arr.map((value, index) => index + 1)
            option.xAxis = {
                type:'category',
                data: x
            }

            option.yAxis = {
                type:'value'
            }

            option.legend = {
                data:['Valor Diário','Média']
            }

            option.tooltip = {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            }

            option.toolbox = {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
                feature: {
                    saveAsImage: {show: true, title: "Salvar Gráfico"},
                    dataZoom: {show: true, title: {zoom: "Zoom", back:" unZoom"}},
                    
                }
            }
            const media = (arr.reduce((total,valor) => {return total + valor},0)/arr.length).toFixed(2)
            option.series = [
                {
                    name: 'Valor Diário',
                    data: arr,
                    type: 'bar',
                    color: '#207d99'
                },
                {
                    name: 'Média',
                    data: arr.map(() => media),
                    type: 'line'
                }
            ]
            
            return option
        }
    },
    mounted(){
        this.graph = this.criaGrafico(this.valores)
    }
}
</script>

<style>
.echarts{
    width: 100%;
    height: 100%;
}
</style>