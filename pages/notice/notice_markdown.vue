<template>
  <div>
    <div v-html="md.render(markdownText)"></div>
  </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import { computed } from "vue";
import {ref} from "vue";

const md = new MarkdownIt();
// const currentHTML =  computed(() =>{
// 	if(currentPost.value)
// }) 

const markdownText = ref('# 巧妹儿的标题!;```console.log("巧妹")```')

//const markdownText = ref('# 一级标题吗；`console.log("这是一段代码")`'')
</script>

<style></style>
