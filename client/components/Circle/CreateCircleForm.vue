<!-- Form for creating circles (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateCircleForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/circles',
      method: 'POST',
      hasBody: true,
      fields: [
        {id: 'title', label: 'Title', value: ''},
        {id: 'bio', label: 'Bio', value: ''},
        {id: 'category', label: 'Category', value: ''}
      ],
      title: 'Create a circle',
      refreshCircles: true,
      callback: () => {
        const message = 'Successfully created a circle!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>
