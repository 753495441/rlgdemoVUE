<template>
  <div>
    <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell
          v-for="(item, index) in list"
          clickable
          :key="item"
          :title="`复选框 ${item}`"
          @click="toggle(index)"
        >
          <van-checkbox
            :name="item"
            ref="checkboxes"
            slot="right-icon"
          />
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
  </div>
</template>

<script>
  export default {
    name: 'Test',
    data() {
      return {
        result: ['a', 'b'],
        list:['a', 'b'],
      }
    },

    methods: {
      toggle(index) {
        this.$refs.checkboxes[index].toggle();
      }
    }
  };
</script>

<style scoped>

</style>
