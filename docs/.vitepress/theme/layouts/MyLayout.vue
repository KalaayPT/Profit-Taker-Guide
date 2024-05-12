<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
    <div>
      <button @click="toggleDataFriendly">Toggle Data Friendly Mode</button>
      <!-- Rest of your layout here -->
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDataFriendly: localStorage.getItem('dataFriendly') === 'true',
      };
    },
    methods: {
      toggleDataFriendly() {
        this.isDataFriendly = !this.isDataFriendly;
        localStorage.setItem('dataFriendly', this.isDataFriendly);
        this.updateMediaPlaceholders();
      },
      updateMediaPlaceholders() {
        var placeholders = document.querySelectorAll('.media-placeholder');
        placeholders.forEach((placeholder) => {
          if (this.isDataFriendly) {
            placeholder.src = 'placeholder.jpg';
            placeholder.addEventListener('click', this.loadRealImage);
          } else {
            placeholder.src = placeholder.dataset.src;
            placeholder.removeEventListener('click', this.loadRealImage);
          }
        });
      },
      loadRealImage(event) {
        var placeholder = event.target;
        placeholder.src = placeholder.dataset.src;
        placeholder.removeEventListener('click', this.loadRealImage);
      },
    },
    mounted() {
      this.updateMediaPlaceholders();
    },
  };
  </script>