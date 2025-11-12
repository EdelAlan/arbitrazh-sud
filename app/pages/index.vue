<template>
  <div>
    <AppHeader />

    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-8">Арбитражный суд - Документы</h1>

        <div v-if="pending" class="text-center py-8">
          <div
            class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
          />
          <p class="mt-4 text-gray-600">Загрузка документов...</p>
        </div>

        <div
          v-else-if="error"
          class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
        >
          <p class="text-red-600">
            Ошибка загрузки документов: {{ error.message }}
          </p>
        </div>

        <div
          v-else-if="!documents || documents.length === 0"
          class="text-center py-8"
        >
          <p class="text-gray-600">Документы не найдены</p>
        </div>

        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div
            v-for="document in documents"
            :key="document.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200"
          >
            <div class="flex items-start justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-800 leading-tight">
                {{ document.name }}
              </h2>
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded"
                >DOCX</span
              >
            </div>

            <NuxtLink
              :to="document.path"
              class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200"
            >
              Читать документ
              <svg
                class="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Информационный раздел -->
      <div class="mt-16 max-w-4xl mx-auto">
        <!-- О нас -->
        <section
          class="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            О Казахстанском арбитражном суде
          </h2>

          <div class="prose max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              Арбитраж при ТОО «Казахстанский арбитражный суд» был создан в
              целях обеспечения реализации права каждого участника гражданского
              оборота на защиту нарушенных или оспоренных
              социально-экономических и личных прав и свобод, в соответствии с
              Законом РК «Об арбитраже».
            </p>

            <p>
              Основной целью и смыслом деятельности ТОО «Казахстанский
              арбитражный суд» является создание и развитие в Республике
              Казахстан правовых механизмов, обеспечивающих компетентное,
              оперативное и экономичное разрешение гражданско-правовых споров, и
              неуклонное стремление развиваться параллельно постоянно
              возрастающему интересу к ним у отечественных юристов и деловых
              кругов.
            </p>
          </div>
        </section>

        <!-- Преимущества -->
        <section
          class="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Преимущества арбитражного разбирательства
          </h2>

          <p class="text-gray-700 mb-6">
            Арбитражное разбирательство обладает целым комплексом очевидных
            преимуществ, к которым, в частности, относятся следующие:
          </p>

          <div class="space-y-6">
            <div class="bg-blue-50 rounded-lg p-6 border border-blue-100">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">
                — Оперативность рассмотрения дела.
              </h3>
              <p class="text-gray-700 leading-relaxed">
                Традиционно государственное судопроизводство характеризуется
                длительностью судебных процессов. В связи с возможностью
                обжалования решения в апелляционной и кассационной инстанциях
                средний срок рассмотрения дела до момента его вступления в
                законную силу достигает до шести месяцев!!! Решение арбитража
                выносится, как правило, в течение 14 дней и вступает в силу
                немедленно.
              </p>
            </div>

            <div class="bg-green-50 rounded-lg p-6 border border-green-100">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">
                — Экономичность.
              </h3>
              <p class="text-gray-700 leading-relaxed">
                Арбитражный сбор составляет один процент от цены иска (но не
                менее 30 МРП), против трёх процентов в суде общей юрисдикции.
              </p>
            </div>

            <div class="bg-purple-50 rounded-lg p-6 border border-purple-100">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">
                — Гарантия исполнения решения арбитража.
              </h3>
              <p class="text-gray-700 leading-relaxed">
                Согласно законодательству Республики Казахстан, решение
                арбитража, не исполненное добровольно, подлежит принудительному
                исполнению, что практически не отличается от решения суда общей
                юрисдикции.
              </p>
            </div>

            <div class="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <h3 class="text-lg font-semibold text-gray-800 mb-3">
                — Конфиденциальность арбитражного (третейского) разбирательства.
              </h3>
            </div>
          </div>
        </section>

        <!-- Арбитражная оговорка -->
        <section
          class="bg-white rounded-lg shadow-md p-8 mb-8 border border-gray-200"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Арбитражная оговорка
          </h2>

          <p class="text-gray-700 mb-4">
            Для обращения в арбитраж необходимо письменное соглашение по
            приведенному ниже образцу либо внесение в любые договоры статьи
            «Рассмотрение споров» следующего содержания:
          </p>

          <div class="bg-gray-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p class="text-gray-800">
              Все споры, вытекающие из настоящего договора подлежат рассмотрению
              в постоянно действующем Арбитраже, созданном ТОО «Казахстанский
              арбитражный суд» в соответствии с его регламентом.
            </p>
          </div>
        </section>

        <!-- Контактная информация -->
        <section
          class="bg-white rounded-lg shadow-md p-8 border border-gray-200"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-6">
            Контактная информация
          </h2>

          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Адрес и контакты
              </h3>
              <div class="space-y-3">
                <div class="flex items-start">
                  <svg
                    class="w-5 h-5 text-gray-500 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p class="text-gray-700">
                    Адрес Арбитража в г. Петропавловск: Казахстан, СКО, г.
                    Петропавловск, ул. Конституции Казахстана 54 офис 219.
                  </p>
                </div>

                <div class="flex items-start">
                  <svg
                    class="w-5 h-5 text-gray-500 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <p class="text-gray-700">
                    Телефоны: + 7 705 450 9360 (WhatsApp, Telegram).
                  </p>
                </div>

                <div class="flex items-start">
                  <svg
                    class="w-5 h-5 text-gray-500 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9"
                    />
                  </svg>
                  <p class="text-gray-700">Сайт:</p>
                </div>

                <div class="flex items-start">
                  <svg
                    class="w-5 h-5 text-gray-500 mt-1 mr-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p class="text-gray-700">E-mail: mister_murik@mail.ru</p>
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4">
                Банковские реквизиты
              </h3>
              <div class="bg-gray-50 rounded-lg p-4 text-sm">
                <p class="font-medium text-gray-800 mb-2">
                  ТОО «Казахстанский арбитражный суд»
                </p>
                <div class="space-y-1 text-gray-700">
                  <p><span class="font-medium">БИН:</span> 160840003490</p>
                  <p><span class="font-medium">БИК:</span> TSESKZKA</p>
                  <p>
                    <span class="font-medium">ИИК:</span> KZ47998KTB0000335644
                  </p>
                  <p class="text-xs text-gray-600 mt-2">
                    Северо-Казахстанский филиал<br />
                    АО «First Heartland Jýsan Bank»
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-200">
            <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div class="flex items-center">
                <svg
                  class="w-5 h-5 text-blue-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p class="text-blue-800 font-medium">
                  За консультацией Вы можете обратиться по телефонам:
                  +7-705-450-93-60, (WhatsApp, Telegram).
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DocumentInfo {
  id: string;
  name: string;
  filename: string;
  size: number;
  modified: string;
  path: string;
}

const {
  data: documents,
  pending,
  error,
} = await useFetch<DocumentInfo[]>("/api/documents");
</script>
