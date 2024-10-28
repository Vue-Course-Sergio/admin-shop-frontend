import { getProductByIdAction } from '@/modules/products/actions';
import { useQuery } from '@tanstack/vue-query';
import { useFieldArray, useForm } from 'vee-validate';
import { defineComponent, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

import * as yup from 'yup';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextArea from '@/modules/common/components/CustomTextArea.vue';

const validationSchema = yup.object({
  title: yup.string().required().min(3),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid', 'unisex']),
});

export default defineComponent({
  components: {
    CustomInput,
    CustomTextArea,
  },
  props: {
    productId: { type: String, required: true },
  },

  setup(props) {
    const router = useRouter();

    const {
      data: product,
      isError,
      isLoading,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductByIdAction(props.productId),
      retry: false,
    });

    const { values, defineField, errors, handleSubmit } = useForm({
      validationSchema,
      initialValues: product.value,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: images } = useFieldArray<string>('images');
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    const onSubmit = handleSubmit((value) => {
      console.log({ value });
    });

    const toggleSize = (size: string) => {
      const currentSizes = sizes.value.map((s) => s.value);
      const hasSize = currentSizes.includes(size);

      if (hasSize) removeSize(currentSizes.indexOf(size));
      else pushSize(size);
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace({ name: 'admin-products' });
      }
    });

    return {
      // Props
      values,
      errors,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      images,
      sizes,
      // Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
      //Actions
      onSubmit,
      toggleSize,
    };
  },
});
