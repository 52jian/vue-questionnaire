<template>
  <div>
    <el-radio-group v-model="topic.selectContent" vertica class="radio-list">
      <el-radio
        v-for="(option, opIndex) in topic.optionsList"
        :key="opIndex"
        :label="option.oid"
        class="option-item"
        @change='radioChange'
      >
        <span>{{ option.ovalue }}</span>
        <!-- <el-input
          v-show="option.oisaddtion && topic.selectContent === option.oid"
          v-if="option.isAddition"
          v-model="topic.additional"
          placeholder="请输入理由"
          style="width: 300px"
          class="addition-input"
          size="mini"
        /> -->
        <div class="option-desc" v-text="option.odesc" />
      </el-radio>
    </el-radio-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ required: true }) private topic!: Questionnaire.IQuestionItem;
  @Prop({ required: true }) private index!: number;

  radioChange(e){
    this.$emit('radioSel',e)
  }

  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.radio-list {
  width: 100%;

  .option-item {
    display: flex;
    font-size: inherit;
    align-items: center;
    margin: 20px 0;
  }

  .option-desc {
    width: 100%;
    padding-left: 19px;
    box-sizing: border-box;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }

  .addition-input {
    margin-left: 20px;
  }
}
</style>
