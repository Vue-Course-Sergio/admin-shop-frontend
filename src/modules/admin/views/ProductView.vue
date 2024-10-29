<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Product: <small class="text-blue-500">{{ title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5" @submit="onSubmit">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Title</label>
        <CustomInput v-model="title" v-bind="titleAttrs" :error="errors.title" />
      </div>

      <div class="mb-4 flex-1">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" v-bind="slugAttrs" :error="errors.slug" />
      </div>

      <div class="mb-4 flex-1">
        <label for="description" class="form-label">Description</label>
        <CustomTextArea
          v-model="description"
          v-bind="descriptionAttrs"
          :error="errors.description"
        />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4">
          <label for="price" class="form-label">Price</label>
          <CustomInput v-model="price" v-bind="priceAttrs" :error="errors.price" type="number" />
        </div>

        <div class="mb-4">
          <label for="stock" class="form-label">Stock</label>
          <CustomInput v-model="stock" v-bind="stockAttrs" :error="errors.stock" type="number" />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Sizes</label>

        <div class="flex">
          <button
            v-for="size of allSizes"
            :key="size"
            @click="toggleSize(size)"
            :class="[
              'p-2 rounded w-14 mr-2 flex-1',
              {
                'bg-blue-100': !hasSize(size),
                'bg-blue-500 text-white': hasSize(size),
              },
            ]"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Images</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div v-for="image of images" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" :alt="title" class="w-[250px] h-[250px] rounded" />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Upload image</label>

        <input multiple type="file" id="image" class="form-control" />
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Genre</label>
        <select v-model="gender" v-bind="genderAttrs" class="form-control">
          <option value="">Seleccione</option>
          <option value="kid">Niño</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
          <option value="unisex">Unisex</option>
        </select>
        <span v-if="errors.gender" class="text-red-400">{{ errors.gender }}</span>
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          :disabled="isPending"
          type="submit"
          class="disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save
        </button>
      </div>
    </div>
  </form>
</template>

<style scoped>
.form-label {
  @apply block text-gray-700 text-sm font-bold mb-2;
}

.form-control {
  @apply shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none;
}
</style>

<script src="./ProductView.ts" lang="ts"></script>
