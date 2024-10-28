import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    console.log('Hola mundo');

    return {
      // Props
      // Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      //Actions
    };
  },
});
