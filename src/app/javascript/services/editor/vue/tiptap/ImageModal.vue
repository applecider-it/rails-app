<script setup lang="ts">
/** モーダルウィンドウ動作確認 */
import Modal from '@/services/ui/vue/popup/Modal.vue';
import { useImageModal } from '../../vue-hook/useImageModal';

interface Props {
  modal: ReturnType<typeof useImageModal<string>>;
}

const props = defineProps<Props>();
</script>

<template>
  <Modal :isOpen="modal.isOpen.value" :onClose="modal.onCancel">
    <h2 class="text-xl font-bold mb-2">画像のURL</h2>

    <div class="my-4">
      URL<input type="text" class="app-form-input" v-model="modal.value.value" />
    </div>

    <button @click="modal.onCommit" class="app-btn-primary mr-2" type="button">
      決定
    </button>

    <button @click="modal.onCancel" class="app-btn-secondary" type="button">
      キャンセル
    </button>
  </Modal>
</template>
