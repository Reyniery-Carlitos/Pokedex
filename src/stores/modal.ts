import { defineStore } from "pinia";
import { ref, Ref } from "vue";

const useModal = defineStore('modal', () => {
  const showModal: Ref<boolean> = ref(false)

  function toggleModal() {
    showModal.value = !showModal.value
  }
  
  return {showModal, toggleModal}
}) 

export default useModal