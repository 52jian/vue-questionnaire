<template>
  <div>
    <el-form-item
      label="题目"
      :rules="{
        required: true,
        message: '题目内容不能为空',
        trigger: 'blur'
      }"
    >
      <el-input v-model="listData.qcontent" placeholder="请输入题目内容" />
    </el-form-item>
    <el-form-item label="题目说明">
      <el-input
        v-model="listData.qdescription"
        placeholder="请输入题目说明，可以为空"
      />
    </el-form-item>
    <el-form-item
      label="必填项"
      :rules="{
        type: 'boolean',
        required: true,
        message: '请选择是否为必填项',
        trigger: 'change'
      }"
    >
      <div class="option-addtion">
        <el-switch
          v-model="listData.isRequired"
          active-text="有"
          inactive-text="否"
        />
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  // @Prop({ required: true }) private topic!: Questionnaire.IQuestionItem
  // @Prop({ required: true }) private index!: number

   listData = {
    question: "单选题目",
    qcontent: "多选题目",
    optionsList: [
      {
        ovalue: "选项",
        odesc: "描述",
        content: "选项",
        isAddition: false,
        image: "",
        desc: ""
      }
    ],
    qisrequire: true,
    qdescription: "",
    qtype: "单选",
    isRequired: true,
    selectContent: "",
    setting: {
      last: 1
    },
    additional: ""
  };

  @Watch("listData")
  mounted() {}
}
</script>

<style lang="scss" scoped></style>
