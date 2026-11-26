<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Toasts from '@/services/ui/vue/message/Toasts.vue';
import Loading from '@/services/ui/vue/message/Loading.vue';
import { useToast } from '@/services/ui/vue-hook/useToast';
import { setupMessage } from '@/services/ui/message';
import { setupImage } from '@/services/ui/image';
import ImageModal from '@/services/ui/vue/popup/ImageModal.vue';
import { useModal } from '@/services/ui/vue-hook/useModal';

const { toasts, showToast } = useToast();

const isLoading = ref(false);

/** 画像用モーダル */
const imageModal = useModal<string>();

onMounted(() => {
  setupMessage(showToast, (value: boolean) => {
    isLoading.value = value;
  });
  setupImage(async (initialValue: string) => {
    return await imageModal.open(initialValue);
  });
});
</script>

<template>
  <div>
    <ImageModal :modal="imageModal" />

    <Toasts :toasts="toasts" />
    <Loading :isLoading="isLoading" />
  </div>
</template>
