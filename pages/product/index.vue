<template>
  <div>
    The page will redirect to
    <strong>/product/{{ PRODUCT_MOCK_DATA.product.slug }}</strong>
  </div>
</template>

<script setup lang="ts">
import { PRODUCT_MOCK_DATA } from "~/constants";

const router = useRouter();
onMounted(() => {
  router.push(`/product/${PRODUCT_MOCK_DATA.product.slug}`);
});
</script>

<style scoped></style>
