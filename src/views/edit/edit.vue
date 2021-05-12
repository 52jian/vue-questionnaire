<template>
  <!-- 创建问卷 -->
  <div v-loading.fullscreen.lock="loading" class="create">
    <!-- <el-alert class="mb-20" type="error"
      >编辑问卷会清空已有的统计数据，请确保问卷在未发布的情况下进行修改。</el-alert
    > -->
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="调查名称" prop="title">
        <el-input v-model="form.ntitle" />
      </el-form-item>
      <el-form-item label="调查介绍" prop="intro">
        <el-input v-model="form.nintro" type="textarea" rows="5" />
      </el-form-item>
      <!-- <el-form-item label="调查类型" prop="type">
        <el-select v-model="form.question.qtype" :disabled="selAble" placeholder="请选择调查类型" @change="typeSelChange">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->

      <!-- <div class="add-option">
        <el-button type="primary" @click="addOption(questionType.SINGLE_CHOICE)"
          >单选题</el-button
        >
        <el-button
          type="primary"
          @click="addOption(questionType.MULTIPLE_CHOICE)"
          >多选题</el-button
        >
        <el-button type="primary" @click="addOption(questionType.TEXT_QUESTION)"
          >文本题</el-button
        >
      </div> -->
      <question-list
        :question-list="form.question"
        @delQuestion="onDelQuestion"
        @addOption="onAddOption"
        @delOption="onDelOption"
        :selShow='selAble'
      />

      <el-form-item label="截止时间" prop="deadline">
        <el-date-picker
          v-model="form.ndeadline"
          type="datetime"
          value-format='yyyy-MM-dd'
          placeholder="选择日期时间"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="default" @click="submitNaire(NaireStatus.UNPUBLISHED)"
          >保存问卷</el-button
        >
        <el-button type="success" @click="submitNaire(NaireStatus.PUBLISHED)"
          >发布问卷</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import dayjs from "dayjs";
import { Form as ElForm } from "element-ui";
import * as NaireAction from "@/api/naire";

import { questionType, questionTypeText } from "@/config/enum/questionType";
import { NaireStatus } from "@/config/enum/naireStatus";
import { Questionnaire } from "@/types/Naire";
import QuestionList from "@/components/Question/QuestionList.vue";

@Component({
  components: {
    QuestionList
  }
})
export default class NavBar extends Vue {
  private questionType = questionType;
  private NaireStatus = NaireStatus;
  private form: Questionnaire.INaire = {
    ntitle: "标题",
    nintro: "",
    ndeadline: "",
    nstatus: true,
    noptions: "",
    topic: [],
    question: {}
  };
  private selAble:boolean = true;
  private loading: boolean = false;
  private rules = {
    title: [{ required: true, message: "请输入问卷标题", trigger: ["blur"]}],
    deadline: [{ required: true, message: "请选择截止时间", trigger: "blur" }],
    type: [{ required: true, message: "请选择调查类型", trigger: "blur" }]
  };

  // private datePickerOptions = {
  //   disabledDate(time: Date) {
  //     return (
  //       dayjs(time).format('YYYY-MM-DD HH:mm:ss')
  //     );
  //   }
  // };
  private typeOptions = [
    {
      value: '单选',
      label: '单选题'
    },
    {
      value: '多选',
      label: '多选题'
    },
    {
      value: '文本',
      label: '文本题'
    },
  ]
  private typeSelChange(e){
    this.addOption (e)
  }

  // 添加选项
  private onAddOption({ index }: { index: number }) {
    const tempData = {
      ovalue: "选项",
      oisaddtion: false,
      oimage: "", // 选项图片
      odesc: ""
    };
    this.form.question.optionsList!.push({ ...tempData });
  }

  // 删除选项
  private onDelOption({ index, opIndex }: { index: number; opIndex: number }) {
    if (this.form.question.optionsList!.length < 2) {
      return this.$message.warning("已经是最后一个选项，无法删除。");
    }
    this.form.question.optionsList.splice(opIndex, 1);
  }

  // 删除问题
  private onDelQuestion() {
    this.selAble = false;
    this.form.question = {};
  }

  // 添加新问题
  addOption(type: questionTypeText) {
    switch (type) {
      case questionType.SINGLE_CHOICE:
        this.form.question = {
          optionsList: [
            {
              ovalue:'选项',
              odesc:'',
            }
          ],
          qtype:'单选',
          qisrequire: true,
          qdescription: '',
          qcontent: '单选题目'
        }
        // const radioQues = {
        //   question: "单选题目",
        //   options: [
        //     {
        //       content: "选项",
        //       isAddition: false,
        //       image: "",
        //       desc: ""
        //     }
        //   ],
        //   description: "",
        //   type: "单选",
        //   isRequired: true,
        //   selectContent: "",
        //   setting: {
        //     last: 1
        //   },
        //   additional: ""
        // };
        // this.form.question.push(radioQues);
        break;
      case questionType.MULTIPLE_CHOICE:
        const checkboxQues = {
          question: "多选题目",
          options: [
            {
              content: "选项",
              isAddition: false,
              image: "",
              desc: ""
            }
          ],
          description: "",
          type: "多选",
          isRequired: true,
          setting: {
            last: 1 // 最少选择几项
          },
          selectMultipleContent: []
        };
        this.form.topic.push(checkboxQues);
        break;
      case questionType.TEXT_QUESTION:
        const textareaQues = {
          question: "文本题目",
          description: "",
          type: "文本",
          isRequired: true,
          setting: {},
          selectContent: ""
        };
        this.form.topic.push(textareaQues);
        break;
    }
  }

  submitNaire(type: NaireStatus) {
    const form = this.$refs.form as ElForm;
    console.log(form.model);
    
    // form.validate(async valid => {
    //   if (!valid) return;
    //   if (this.form.topic.length === 0) {
    //     return this.$message.warning("请至少添加一道题目。");
    //   }
    //   const params = {
    //     naire: {
    //       ...this.form,
    //       deadline: new Date(this.form.deadline).getTime()
    //     },
    //     status: "update"
    //   };
    //   this.loading = true;
    //   const res = await NaireAction.create(params);
    //   this.loading = false;
    //   if (res.success) {
    //     this.$message.success("修改问卷成功！");
    //     await this.$router.push("/list");
    //   } else {
    //     this.$message.error(res.msg);
    //   }
    // });
  }

  async fetchData() {
    this.loading = true;
    const res = await NaireAction.detail({
      nId: this.$route.params.id
    });
    this.loading = false;
    this.form = {
      ...res.data,
      deadline: new Date(Number(res.data.ndeadline))
    };
  }

  mounted() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.create {
  .add-option {
    margin-bottom: 20px;
    text-align: center;
  }
}
</style>
