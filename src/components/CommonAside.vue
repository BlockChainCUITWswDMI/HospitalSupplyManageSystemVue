<template>
    <div>
        <el-menu default-active="1-4-1" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <h3>{{ isCollapse ? '系统' : '医院供应链管理系统' }}</h3>
            <!--noChildren-->
            <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.name" :index="item.name">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item> 
            <!--hasChildren-->   
            <el-submenu v-for="item in hasChildren" :key="item.label" index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">          
                    <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">{{ subItem.label }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>         
            </el-menu>
        </div>
</template>


<script>
  import Cookie from "js-cookie"
  export default {
    data() {
      return { };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
        if (this.$route.path !== item.path && !(this.$route.path ==='/home' && (item.path === '/'))){
            this.$router.push(item.path);
        }
        this.$store.commit('selectMenu', item);
      }
    },

    computed:{
        //  没有子菜单
        noChildren(){
            return this.menuData.filter(item => !item.children)
        },
        //  有子菜单
        hasChildren(){
            return this.menuData.filter(item => item.children)
        },
        menuData(){
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.Menu
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100vh;
    border-right: none;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
  }
</style>