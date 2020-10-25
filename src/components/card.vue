<template>
  <div class="card fill-screen" style="width: 18rem;" :class="classes">
  <div class="card-body">
    <h5 class="card-title">{{title}}</h5>
    <h6 class="card-subtitle mb-2 text-muted">{{subtitle}}</h6>
    <p class="card-text">{{text}}</p>
    <a v-if="link != undefined" :href="link.link" class="card-link">{{link.text}}</a>
  </div>
</div>
</template>

<script>

export default {
  props:['title','subtitle','text','link','classes','functions'],
  methods:{
    iterator(list){
      const obj = {
        text: this.text
      }
      const next = (id) => {
         list && id < list.length && this[list[id]](obj,() => next(id + 1))
      }
      next(0)
    },
    mask_money(obj,next){
      let val = obj.text
      val = '' + parseFloat(val).toFixed(2)

      val = val.replace('.',',')
      if(val.match(/^\d$/)){
        val = val + ',00'
      }
      else if (val.match(/^\d+,\d$/)){
        val = val + '0'
      }

      val = val.replace(/(\d)(?=(\d{3})+,)/g,'$1.')
      obj.text = val
      next()
    },

    replace_text(obj,next){
      this.text = obj.text
      next()
    }
  },
  components:{

  },
  mounted(){
    this.iterator(this.functions)
  }
}
</script>

<style>
.big-text > div > .card-text{
  font-size: 1.8rem;
}

.fill-screen{
  width: 100% !important;
  height: 100%;
}
</style>