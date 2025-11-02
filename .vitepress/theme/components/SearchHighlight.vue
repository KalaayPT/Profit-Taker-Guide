<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const STORAGE_KEY = 'search-button-clicked';
let highlightTimeout: number | undefined;

const hasBeenClicked = ref(false);

const markAsClicked = () => {
  hasBeenClicked.value = true;
  localStorage.setItem(STORAGE_KEY, 'true');

  const searchButton = document.querySelector('.VPNavBarSearch button, .DocSearch-Button') as HTMLElement;
  if (searchButton) {
    searchButton.classList.add('search-button-clicked');
  }
};

const highlightSearchButton = () => {
  const searchButton = document.querySelector('.VPNavBarSearch button, .DocSearch-Button') as HTMLElement;

  if (searchButton) {
    searchButton.classList.add('search-highlighted');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    markAsClicked();

    highlightTimeout = window.setTimeout(() => {
      searchButton.classList.remove('search-highlighted');
      window.history.replaceState(null, '', window.location.pathname);
    }, 1000);
  }
};

const checkHash = () => {
  if (window.location.hash === '#search') {
    setTimeout(highlightSearchButton, 100);
  }
};

const setupSearchButtonListener = () => {
  const searchButton = document.querySelector('.VPNavBarSearch button, .DocSearch-Button') as HTMLElement;
  if (searchButton) {
    searchButton.addEventListener('click', markAsClicked);
  }
};

const updateSearchButtonGlow = () => {
  const searchButton = document.querySelector('.VPNavBarSearch button, .DocSearch-Button') as HTMLElement;

  if (searchButton) {
    if (hasBeenClicked.value) {
      searchButton.classList.add('search-button-clicked');
    } else {
      searchButton.classList.remove('search-button-clicked');
    }
  }
};

onMounted(() => {
  hasBeenClicked.value = localStorage.getItem(STORAGE_KEY) === 'true';

  setTimeout(() => {
    updateSearchButtonGlow();
    setupSearchButtonListener();
  }, 100);

  checkHash();
  window.addEventListener('hashchange', checkHash);
});

onUnmounted(() => {
  window.removeEventListener('hashchange', checkHash);
  if (highlightTimeout) {
    clearTimeout(highlightTimeout);
  }
});
</script>

<template>
</template>
