<template>
  <div id="app" class="bg-skin" :class="bgstyle">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      bgstyle:'default'
    }
  },
  watch:{

  },
  mounted(){
    var that = this;
    //换肤事件发布
    this.$root.eventHub.$on("changeBackdropEvent",item=>{
      that.bgstyle = item;
    });

  },
  computed:{

  },
  methods:{

  },
   beforeDestroy() {
      this.$root.eventHub.$off('changeBackdropEvent',{

      })

    }
}
</script>
