<template>
  <div class="max-w-7xl mx-auto p-4">
    <div class="flex flex-col lg:flex-row gap-24">
      <!-- Product Image -->
      <ProductImageGallery />

      <!-- Product Details -->
      <div class="lg:w-1/2">
        <h1 class="text-3xl lg:text-5xl text-primary-950 leading-tight">
          {{ product?.name || "Loading..." }}
        </h1>
        <p class="mt-6 text-primary-950 leading-relaxed">
          {{ product?.description || "Loading..." }}
        </p>

        <div class="mt-12">
          <h2 class="text-xl text-primary-950 mb-6">CHOOSE OPTIONS</h2>
          <table class="w-full border-collapse border border-gray-300">
            <tbody>
              <tr
                v-for="option in optionTypes"
                :key="option.optionTypeId"
                class="border-b border-gray-300 cursor-pointer hover:bg-gray-100"
                @click="openOptionsSelector(option.optionTypeId)"
              >
                <td class="font-bold p-4 w-1/3 text-primary-950">
                  {{ option.displayName }}
                </td>
                <td class="p-4 w-2/3 text-primary-950">
                  {{
                    productStore.getSelectedOptionDisplayName(
                      option.optionTypeId
                    )
                  }}
                </td>
              </tr>
            </tbody>
          </table>

          <div class="mt-8">
            <div class="text-3xl font-bold text-primary-950">
              {{ formattedPrice }}
            </div>
          </div>

          <div class="mt-8 flex items-end gap-3 w-full">
            <div class="flex flex-col items-start gap-2">
              <span class="font-medium text-primary-950">Quantity</span>
              <div
                class="flex items-center justify-between border border-gray-300 w-[120px] p-2"
              >
                <button @click="decrementQuantity">
                  <img
                    src="~/assets/icons/minus.svg"
                    alt="Decrease quantity"
                    class="w-6 h-6"
                  />
                </button>
                <span class="w-[3rem] text-center">{{ quantity }}</span>
                <button @click="incrementQuantity">
                  <img
                    src="~/assets/icons/plus.svg"
                    alt="Increase quantity"
                    class="w-6 h-6"
                  />
                </button>
              </div>
            </div>
            <button
              @click="addToCart"
              class="w-full bg-primary-950 border border-primary-950 hover:bg-primary-800 text-white font-semibold px-8 py-2 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <img
                src="~/assets/icons/basket-add.svg"
                alt="Add to cart"
                class="w-6 h-6"
              />
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Overlay -->
  <div
    v-if="showSidebar"
    class="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
  />

  <SelectOptionsSidebar
    :class="showSidebar ? 'open' : 'closed'"
    :selectedOptionTypeId="selectedOptionTypeId"
    @close="closeSidebar"
  />

  <!-- Toast Notification -->
  <Toast
    :visible="showToast"
    title="Success!"
    message="The product has been added to your cart"
    @close="showToast = false"
  />
</template>

<script setup lang="ts">
import { PRODUCT_MOCK_DATA } from "~/constants";
import { useProductStore } from "~/stores/product";

definePageMeta({
  title: PRODUCT_MOCK_DATA.product?.name || "Product Details",
  meta: [
    {
      name: "description",
      content:
        PRODUCT_MOCK_DATA.product?.description ||
        "Detailed information about the product",
    },
  ],
});

const productStore = useProductStore();

const product = computed(() => productStore.product);
const optionTypes = computed(() => productStore.optionTypes);
const quantity = computed(() => productStore.quantity);
const formattedPrice = computed(() => productStore.formattedPrice);

const showSidebar = ref<boolean>(false);
const selectedOptionTypeId = ref<number | null>(null);
const showToast = ref<boolean>(false);

const openOptionsSelector = (optionTypeId: number) => {
  selectedOptionTypeId.value = optionTypeId;
  showSidebar.value = true;
};

const closeSidebar = () => {
  showSidebar.value = false;
  selectedOptionTypeId.value = null;
};

const addToCart = () => {
  showToast.value = true;
};

const incrementQuantity = () => {
  productStore.incrementQuantity();
};

const decrementQuantity = () => {
  productStore.decrementQuantity();
};

onMounted(() => {
  productStore.setProduct(PRODUCT_MOCK_DATA.product);
  productStore.setOptionTypes(PRODUCT_MOCK_DATA.optionTypes);
  document.title = PRODUCT_MOCK_DATA.product?.name || "Product Details";
});
</script>
