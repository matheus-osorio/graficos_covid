<template>
  <div class="card">
      <echart :options="graph"  autoresize/>
  </div>
</template>

<script>
import {det, lusolve} from 'mathjs'


export default {
    props: ['data','valores'],
    data(){
        return {
            graph: {}
        }
    },
    methods:{
        acumula(arr){
            const max = this.ultimoValor(arr)
            return arr.reduce((soma,atual,index) => {
                const ultimo = soma.length > 0 ? soma[soma.length - 1] : 0
                if(index <= max){
                    soma.push(ultimo + atual)
                }
                else{
                    soma.push(0)
                }
                return soma
            },[])
        },

        ultimoValor(arr){
            return arr.reduce((salvo,atual,novo) => {
                if(atual > 0){
                    return novo
                }
                return salvo
            },0)
        },

        criaX(arr){
            const max = this.ultimoValor(arr)
            const x = []
            for(let i=1;i<= max+1;i++){
                x.push(i)
            }

            return x
        },

        naoNulos(arr){
            arr.filter(val => val>0).length
        },
        
        arrPotencia(arr, pot){
            return arr.reduce((total, valor) => {
                return total + Math.pow(valor,pot)
            },0)
        },

        multiplicaArrays(arr1,arr2,pot1,pot2){
            return arr1.reduce((total, valor, index) => {
                return total + Math.pow(valor,pot1) * Math.pow(arr2[index],pot2)
            },0)
        },

        linearSolve(arr){
            const acumulado = this.acumula(arr)
            const xArr = this.criaX(arr)
            const x2 = this.arrPotencia(xArr, 2)
            const x1 = this.arrPotencia(xArr,1)
            const y1 = this.arrPotencia(acumulado,1)
            const xy = this.multiplicaArrays(xArr,acumulado,1,1)
            const n = xArr.length
            return det([[x2,x1],[x1,n]]) != 0 ? lusolve([[x2, x1], [x1, n]], [xy, y1]) : null
        },
        polinomialSolve(arr){
            const acumulado = this.acumula(arr)
            const xArr = this.criaX(arr)
            const x4 = this.arrPotencia(xArr,4)
            const x3 = this.arrPotencia(xArr,3)
            const x2 = this.arrPotencia(xArr, 2)
            const x1 = this.arrPotencia(xArr,1)
            const y1 = this.arrPotencia(acumulado,1)
            console.log('acumulado:',xArr)
            const x2y = this.multiplicaArrays(xArr,acumulado,2,1)
            const xy = this.multiplicaArrays(xArr,acumulado,1,1)
            const n = xArr.length
            return det([[x4,x3,x2], [x3,x2,x1], [x2,x1,n]]) !=0 ? lusolve([[x4,x3,x2], [x3,x2,x1], [x2,x1,n]], [x2y, xy, y1]) : null
        },

        projLinear(arr,x){
            const lsolve = this.linearSolve(arr)
            return x.map((x) => x*lsolve[0][0] + lsolve[1][0])
        },
        
        projPolinomial(arr,x){
            const psolve = this.polinomialSolve(arr)
            return x.map((x) => x*x*psolve[0][0] + x*psolve[1][0] + psolve[2][0])
        },

        montaGrafico(arr){
            const acumulado = this.acumula(arr)
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
                data:['Valor Acumulado','Projeção Linear','Projeção Polinomial']
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
            
            option.series = [
                {
                    name: 'Valor Acumulado',
                    data: acumulado,
                    type: 'bar',
                    color: '#b52424'
                },
                {
                    name: 'Projeção Linear',
                    data: this.projLinear(arr, x).map(valor => valor.toFixed(2)),
                    type: 'line'
                },
                {
                    name: 'Projeção Polinomial',
                    data: this.projPolinomial(arr, x).map(valor => valor.toFixed(2)),
                    type: 'line'
                }

            ]

            return option
        }

    },
    mounted(){
        this.graph = this.montaGrafico(this.valores)
    }
}
</script>

<style>
.echarts{
    width: 100% !important;
    height: 100%;
}
</style>