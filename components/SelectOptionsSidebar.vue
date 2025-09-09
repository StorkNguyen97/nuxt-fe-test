<template>
  <div
    class="fixed top-0 right-0 h-full w-[512px] bg-white sidebar z-50 transform transition-transform duration-300 ease-in-out"
    :class="{ 'translate-x-0': true, 'translate-x-full': false }"
  >
    <div class="flex justify-between items-center p-8 shadow-md">
      <h2 class="text-2xl font-semibold">
        {{ selectedOptionType?.displayName || "SELECT OPTION" }}
      </h2>
      <button
        @click="$emit('close')"
        class="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 6L6 18M6 6L18 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="grid grid-cols-1 divide-y p-8" v-if="selectedOptionType">
      <div
        v-for="option in selectedOptionType.options"
        :key="option.uid"
        class="flex items-center justify-between py-4 cursor-pointer"
        @click="selectOption(option.uid)"
      >
        <div>
          <span class="font-medium">
            {{ option.displayName }}
          </span>
        </div>
        <div
          class="w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all duration-200"
          :class="{
            'bg-primary-950 border-primary-950': isSelected(option.uid),
            'border-gray-300 hover:border-gray-400': !isSelected(option.uid),
          }"
        >
          <img v-if="isSelected(option.uid)" src="~/assets/icons/check.svg" alt="check-icon">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/product";

interface Props {
  selectedOptionTypeId?: number | null;
}

const props = withDefaults(defineProps<Props>(), {
  selectedOptionTypeId: null,
});

const emit = defineEmits(['close']);

const productStore = useProductStore();

const selectedOptionType = computed(() => {
  if (!props.selectedOptionTypeId) return null;
  return productStore.optionTypes.find(
    (type) => type.optionTypeId === props.selectedOptionTypeId
  );
});

const isSelected = (optionId: string) => {
  if (!props.selectedOptionTypeId) return false;
  const selectedOption = productStore.getSelectedOption(
    props.selectedOptionTypeId
  );
  return selectedOption?.optionId === optionId;
};

const selectOption = (optionId: string) => {
  if (props.selectedOptionTypeId) {
    productStore.selectOption(props.selectedOptionTypeId, optionId);
    // Close modal after selection
    emit("close");
  }
};
</script>

<style scoped>
.sidebar {
  transition: transform 0.3s ease-in-out;
}
.sidebar.open {
  transform: translateX(0);
}
.sidebar.closed {
  transform: translateX(100%);
}
</style>
