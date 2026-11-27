<script setup lang="ts">
import Modal from './Modal.vue';
import type { useImageModal } from '../../vue-hook/useImageModal';

interface Props {
  imageModal: ReturnType<typeof useImageModal>;
}

const props = defineProps<Props>();
</script>

<template>
  <Modal
    :isOpen="imageModal.modal.isOpen.value"
    :onClose="imageModal.modal.onCancel"
  >
    <h2 class="text-xl font-bold mb-2">画像</h2>

    <h3 class="font-bold my-2">一覧から選択</h3>

    <div v-if="imageModal.loading.value">Loading...</div>
    <div v-else class="flex flex-wrap gap-1 items-center">
      <img
        v-for="(src, index) in imageModal.images.value"
        :key="index"
        :src="src"
        class="w-10 object-cover"
        @click="imageModal.onSelectImage(src)"
      />
    </div>

    <h3 class="font-bold my-2">URL指定</h3>

    <div class="my-4 text-nowrap">
      URL:
      <input
        type="text"
        class="app-form-input w-auto"
        v-model="imageModal.modal.value.value"
      />

      <button
        @click="imageModal.modal.onCommit"
        class="app-btn-primary mr-2"
        type="button"
      >
        決定
      </button>
    </div>

    <button
      @click="imageModal.modal.onCancel"
      class="app-btn-secondary"
      type="button"
    >
      キャンセル
    </button>
  </Modal>
</template>
