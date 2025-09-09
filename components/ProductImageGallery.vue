<template>
  <div class="lg:w-1/2">
    <div
      class="relative aspect-square overflow-hidden group border-2 border-primary-200"
    >
      <img
        :src="currentMainImage"
        alt="productName"
        class="w-full h-full object-none"
      />

      <div class="absolute bottom-4 right-4 flex gap-2">
        <button
          @click="previousImage"
          class="bg-[#f3f5f8] rounded-full p-2"
          :disabled="currentIndex === 0"
          :class="{ 'cursor-not-allowed opacity-50': currentIndex === 0 }"
        >
          <img
            src="~/assets/icons/arrow-left.svg"
            alt="Previous"
            class="w-5 h-5 text-primary-950"
          />
        </button>

        <button
          @click="nextImage"
          class="bg-[#f3f5f8] rounded-full p-2"
          :disabled="currentIndex === allImages.length - 1"
          :class="{
            'cursor-not-allowed opacity-50':
              currentIndex === allImages.length - 1,
          }"
        >
          <img
            src="~/assets/icons/arrow-right.svg"
            alt="Next"
            class="w-5 h-5 text-primary-950"
          />
        </button>
      </div>
    </div>

    <div class="grid grid-cols-4 mt-2 gap-2 w-full">
      <img
        v-for="(image, index) in allImages"
        :key="index"
        :src="image.src"
        :alt="image.alt"
        class="w-full h-full object-none cursor-pointer border"
        :class="[currentIndex === index ? 'border-primary-950' : 'border-none']"
        @click="selectImageByIndex(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import image_1 from "~/assets/images/image-1.png";
import image_2 from "~/assets/images/image-2.png";
import image_3 from "~/assets/images/image-3.png";
import image_4 from "~/assets/images/image-4.png";

interface ImageItem {
  src: string;
  alt: string;
}

const currentIndex = ref(0);

const allImages = computed<ImageItem[]>(() => {
  return [
    { src: image_1, alt: "Main product view" },
    { src: image_2, alt: "Side view" },
    { src: image_3, alt: "Detail view" },
    { src: image_4, alt: "Alternative view" },
  ];
});

const currentMainImage = computed(() => {
  return allImages.value[currentIndex.value]?.src || allImages.value[0].src;
});

const nextImage = () => {
  if (currentIndex.value < allImages.value.length - 1) {
    currentIndex.value++;
  }
};

const previousImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const selectImageByIndex = (index: number) => {
  currentIndex.value = index;
};
</script>
