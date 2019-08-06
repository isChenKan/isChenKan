<template>
  <div class="fafa-container">
    <div class="fafa-header">
		  <div class="avatar"></div>
      <div>
        <div class="name">汪钰涵</div>
        <div>TEL: 18511869929</div>
        <div>E-mail: towangyuhan@outlook.com</div>
      </div>
	  </div>
    <div class="fafa-content">
      <div v-for="item in data" :key="item.title" class="list-wrap">
        <div>{{item.title}}</div>
        <div v-for="(list, index) in item.content" :key="index">
          <div>{{list}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from './content.js'

export default {
  name: 'FaFa',
  data() {
    return {
      data: data
    }
  },
  mounted() {
    console.log(this.data)
  }
}
</script>

<style scoped>
.fafa-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 150px;
  padding: 0 20px;
  border-radius: 3px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.4);
  background: linear-gradient(90deg, #6BA9A3, 40%,#B76A73);
  color: #fff;
}
.avatar {
  width: 120px;
  height: 120px;
  margin-right: 10px;
  border-radius: 50%;
  background: #eee;
}
.name {
  margin-bottom: 2px;
  font-size: 36px;
}
.fafa-content {
  height: 500px;
}
.list-wrap {
  display: flex;
}
</style>
