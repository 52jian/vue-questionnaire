<template>
  <div>
    <el-form-item
      label="题目"
      :prop="'listData.' + index + '.qcontent'"
      :rules="{
        required: true, message: '题目内容不能为空', trigger: 'blur'
      }"
    >
      <el-input v-model="listData.qcontent" placeholder="请输入题目内容" />
    </el-form-item>
    <el-form-item label="题目说明">
      <el-input v-model="listData.qdescription" placeholder="请输入题目说明，可以为空" />
    </el-form-item>
    <el-form-item label="">
      <div
        v-for="(option, opIndex) in listData.optionsList"
        :key="opIndex"
        class="option-item"
      >
        <el-row :gutter="22">
          <el-col :span="18">
            <el-form-item
              :label="`选项 ${ opIndex + 1 }`"
              :prop="'listData.' + index + '.optionsList.' + opIndex + '.qcontent'"
              :rules="{
                required: true, message: '选项内容不能为空', trigger: 'blur'
              }"
            >
              <el-input
                v-model="option.qcontent"
                placeholder="请输入选项内容"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button
              type="success"
              icon="el-icon-plus"
              size="mini"
              @click="addOption(index)"
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
                v-model="option.qdesc"
                type="textarea"
                :autosize="{ minRows: 2,maxRows: 5 }"
                placeholder="请输入选项描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="18">
            <el-form-item label="图片">
              <el-input
                v-model="option.image"
                placeholder="请输入图片地址"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="option-addtion">
          <el-form-item
            label="附加内容："
            :prop="'topic.' + index + '.options.' + opIndex + '.isAddition'"
            :rules="{
              required: true, message: '选项内容不能为空', trigger: 'blur'
            }"
          >
            <el-switch
              v-model="option.isAddition"
              active-text="有"
              inactive-text="无"
              disabled
            />
          </el-form-item>
        </div> -->
      </div>
    </el-form-item>
    <el-form-item
      label="必填项"
      :prop="'listData.' + index + '.isRequired'"
      :rules="{
        type: 'boolean', required: true, message: '请选择是否为必填项', trigger: 'change'
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
    <el-form-item
      v-if="listData.setting"
      label="最少勾几项"
      :prop="'listData.' + index + '.setting.last'"
      :rules="{
        required: true, message: '请输入至少勾选几项', trigger: 'blur'
      }"
    >
      <el-input v-model="listData.setting.last" placeholder="请输入至少勾选几项，默认请填写1" />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
  @Prop({ required: true }) private topic!: Questionnaire.IQuestionItem
  @Prop({ required: true }) private index!: number

  private listData: any = {
    question: "多选题目",
    qcontent: "多选标题",
    optionsList: [
      {
        ovalue: "多选选项",
        odesc: "多选描述",
        content: "多选选项",
        isAddition: false,
        image: "",
        desc: ""
      }
    ],
    qisrequire: true,
    qdescription: "",
    qtype: "多选",
    isRequired: true,
    selectContent: "",
    setting: {
      last: 1
    },
    additional: ""
  };

  @Watch("listData")

  private delOption (index: number, opIndex: number) {
    this.$emit('delOption', {
      index,
      opIndex
    })
  }

  private addOption (index: number) {
    // this.$emit('addOption', {
    //   index
    // })
    this.listData.optionsList!.push({
      ovalue: "选项",
      odesc: "描述",
      content: "选项",
      isAddition: false,
      image: "",
      desc: ""
    });
  }
}
</script>

<style lang="scss" scoped>

</style>
