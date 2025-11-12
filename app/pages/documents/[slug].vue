<template>
  <div>
    <AppHeader />
    <div class="container mx-auto px-4 py-8">
      <!-- Навигация назад -->
      <div class="mb-6">
        <NuxtLink
          to="/"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад к списку документов
        </NuxtLink>
      </div>

      <div v-if="pending" class="text-center py-8">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        />
        <p class="mt-4 text-gray-600">Загрузка документа...</p>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
      >
        <p class="text-red-600">
          Ошибка загрузки документа: {{ error.message }}
        </p>
      </div>

      <div v-else-if="document" class="max-w-4xl mx-auto">
        <!-- Заголовок документа -->
        <div
          class="bg-white rounded-lg shadow-md p-6 mb-6 border border-gray-200"
        >
          <h1 class="text-3xl font-bold text-gray-800 mb-4">
            {{ document.name }}
          </h1>
        </div>

        <!-- Содержимое документа -->
        <div class="bg-white rounded-lg shadow-md border border-gray-200">
          <div class="p-6">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div
              class="prose prose-lg max-w-none document-content"
              v-html="document.html"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DocumentDetail {
  id: string;
  name: string;
  filename: string;
  html: string;
  size: number;
  modified: string;
  messages?: Array<{ message: string; type: string }>;
}

const route = useRoute();
const slug = route.params.slug as string;

// Устанавливаем заголовок страницы
useHead({
  title: `Документ - ${slug}`,
});

const {
  data: document,
  pending,
  error,
} = await useFetch<DocumentDetail>(`/api/documents/${slug}`);
</script>

<style scoped>
.document-content {
  color: #1f2937;
  line-height: 1.75;
}

.document-content :deep(h1) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}

.document-content :deep(h2) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #111827;
}

.document-content :deep(h3) {
  font-size: 1.125rem;
  font-weight: 500;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
  color: #111827;
}

.document-content :deep(p) {
  margin-bottom: 1rem;
  color: #374151;
  line-height: 1.75;
}

.document-content :deep(ul),
.document-content :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.document-content :deep(li) {
  margin-bottom: 0.5rem;
  color: #374151;
}

.document-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d1d5db;
  margin-bottom: 1.5rem;
}

.document-content :deep(th),
.document-content :deep(td) {
  border: 1px solid #d1d5db;
  padding: 1rem;
  text-align: left;
}

.document-content :deep(th) {
  background-color: #f9fafb;
  font-weight: 600;
}

.document-content :deep(strong) {
  font-weight: 600;
  color: #111827;
}

.document-content :deep(em) {
  font-style: italic;
}

.document-content :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1rem;
  font-style: italic;
  color: #4b5563;
  margin: 1rem 0;
}
</style>
