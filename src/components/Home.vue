<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
// import { ElMessage } from "element-plus";
import axios from "axios";
import request from '@/shared/request.js'

const router = useRouter()
const route = useRoute()
const dogList = ref([])
const imgUrl = new URL("../assets/images/home.jpg", import.meta.url).href;
let text = ref("");
const open1 = () => {
  axios.get("https://api.uixsj.cn/hitokoto/get?type=social").then(
    (response) => {
      text.value = response.data;
    },
    (error) => {
      alert(`加载出错了`);
      console.log(`error:${error.message}`);
    }
  );
  ElMessage({
    showClose: true,
    message: text,
    grouping: true,
  });
};

const jump = () => {
  router.push({ path: `/appLayout/breeds-list/${dogList.value[0]}`, replace: true })
}

onMounted(async () => {
  const res = await request({
    method: 'GET',
    url: 'https://dog.ceo/api/breeds/list',
  });
  dogList.value = res.message
  localStorage.setItem('menu', JSON.stringify(res.message))
  // console.log(localStorage)
})

</script>

<template>
  <div class="box">
    <h1 class="animate__animated animate__rubberBand">欢迎来到这个网站</h1>
    <div class="wraper">
      <div class="animate__animated animate__swing">
        <el-image :src="imgUrl" fit="cover" />
      </div>
      <div class="container animate__animated animate__bounceInRight">
        <div><el-button @click="open1">开心一下</el-button></div>
        <div><el-button @click="jump">看看狗狗</el-button></div>
      </div>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
h1 {
  font-size: 6vw;

  color: #6b9c4e;
}

.wraper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  margin-left: 5vw;
  gap: 5vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.el-image {
  width: 30vw;
  height: 30vw;
}

@media screen and (max-width:800px) {
  h1 {
    margin: 7vw auto;
  }

  .wraper {
    display: flex;
    flex-direction: column;
  }

  .container {
    margin: 5vw auto;
  }
}
</style>
