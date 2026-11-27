<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Toasts from '@/services/ui/vue/message/Toasts.vue';
import Loading from '@/services/ui/vue/message/Loading.vue';
import { useToast } from '@/services/ui/vue-hook/useToast';
import { setupMessage } from '@/services/ui/message';
import { setupImage } from '@/services/image-modal/image';
import ImageModal from '@/services/image-modal/vue/ImageModal.vue';
import { useImageModal } from '@/services/image-modal/vue-hook/useImageModal';

const { toasts, showToast } = useToast();

const isLoading = ref(false);

const imageModal = useImageModal();

const setIsLoading = (value: boolean) => {
  isLoading.value = value;
};

onMounted(() => {
  setupMessage(showToast, setIsLoading);
  setupImage(imageModal);
});
</script>

<template>
  <div>
    <ImageModal :imageModal="imageModal" />

    <Toasts :toasts="toasts" />
    <Loading :isLoading="isLoading" />
  </div>
</template>
