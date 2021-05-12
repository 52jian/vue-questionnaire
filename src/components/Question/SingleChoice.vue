<template>
  <div class="single-choice">
    <el-form-item label="题目：" required props="qcontent">
      <el-input v-model="listData.qcontent" placeholder="请输入题目内容" />
    </el-form-item>
    <el-form-item label="题目说明：">
      <el-input
        v-model="listData.qdescription"
        placeholder="请输入题目说明，可以为空"
      />
    </el-form-item>
    <el-form-item label="选项：">
      <div
        v-for="(option, opIndex) in listData.optionsList"
        :key="opIndex"
        class="option-item"
      >
        <el-row :gutter="22">
          <el-col :span="18">
            <el-form-item :label="`选项 ${opIndex + 1}`" required>
              <el-input v-model="option.ovalue" placeholder="请输入选项内容" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              @click="addOption(opIndex)"
            />
            <el-button
              type="warning"
              icon="el-icon-delete"
              size="mini"
              @click="delOption(index, opIndex)"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="描述">
              <el-input
                v-model="option.odesc"
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="请输入选项描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form-item>
    <el-form-item label="必填项">
      <div class="option-addtion">
        <el-switch
          v-model="listData.qisrequire"
          active-text="有"
          inactive-text="否"
        />
      </div>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Questionnaire } from "../../types/Naire";

@Component
export default class extends Vue {
  // @Prop() private topic: any;

  @Prop({ required: true }) private isSubmit!: boolean;

  private rules = {
    qcontent: [
      {
        required: true,
        message: "选项内容不能为空",
        trigger: "blur"
      }
    ]
  };
  private listData: any = {
    question: "单选题目",
    qcontent: "题目标题",
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

  private delOption(index: number, opIndex: number) {
    // this.$emit("delOption", {
    //   index,
    //   opIndex
    // });
    if (this.listData.optionsList!.length < 2) {
      return this.$message.warning("已经是最后一个选项，无法删除。");
    }
    this.listData.optionsList!.splice(opIndex, 1);
  }

  addOption(index: number) {
    // this.$emit("addOption", {
    //   index
    // });

    this.listData.optionsList!.push({
      ovalue: "选项",
      odesc: "描述",
      content: "选项",
      isAddition: false,
      image: "",
      desc: ""
    });
    console.log(this.listData);
  }

  @Watch("listData")
  mounted() {
    console.log(1);
    
  }
}
</script>

<style lang="scss" scoped></style>
