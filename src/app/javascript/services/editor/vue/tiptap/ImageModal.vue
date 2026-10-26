<script setup lang="ts">
import { ref, onMounted, type Ref } from 'vue';
/** モーダルウィンドウ動作確認 */
import Modal from '@/services/ui/vue/popup/Modal.vue';
import { useImageModal } from '../../vue-hook/useImageModal';

interface Props {
  modal: ReturnType<typeof useImageModal<string>>;
}

const props = defineProps<Props>();

const images: Ref<string[], string[]> = ref([]);

/** 画像選択時 */
const onSelectImage = (src: string) => {
  props.modal.value.value = src;
  props.modal.onCommit();
};

onMounted(() => {
  images.value.push('http://localhost:3000/icon.svg');
  images.value.push('http://localhost:3000/icon.svg');
  images.value.push('http://localhost:3000/icon.svg');
});
</script>

<template>
  <Modal :isOpen="modal.isOpen.value" :onClose="modal.onCancel">
    <h2 class="text-xl font-bold mb-2">画像</h2>

    <h3 class="font-bold my-2">一覧から選択</h3>

    <div class="flex flex-wrap gap-1 items-center">
      <img
        v-for="(src, index) in images"
        :key="index"
        :src="src"
        class="w-10 object-cover"
        @click="onSelectImage(src)"
      />
    </div>

    <h3 class="font-bold my-2">URL指定</h3>

    <div class="my-4 text-nowrap">
      URL:
      <input
        type="text"
        class="app-form-input w-auto"
        v-model="modal.value.value"
      />

      <button
        @click="modal.onCommit"
        class="app-btn-primary mr-2"
        type="button"
      >
        決定
      </button>
    </div>

    <button @click="modal.onCancel" class="app-btn-secondary" type="button">
      キャンセル
    </button>
  </Modal>
</template>
