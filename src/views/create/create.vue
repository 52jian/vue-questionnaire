<template>
  <!-- 创建问卷 -->
  <div class="create">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-position="right"
      label-width="100px"
    >
      <el-form-item label="调查名称" prop="ntitle">
        <el-input v-model="form.ntitle" placeholder="请输入调查名称" />
      </el-form-item>
      <el-form-item label="调查介绍" prop="intro">
        <el-input
          v-model="form.nintro"
          type="textarea"
          rows="5"
          placeholder="请输入调查介绍(选填)"
        />
      </el-form-item>
      <el-form-item label="调查类型" prop="qtype">
        <el-select
          v-model="form.question.qtype"
          placeholder="请选择要创建的调查类型"
          @change="selChange"
        >
          <el-option label="单选题" value="单选"></el-option>
          <el-option label="多选题" value="多选"></el-option>
          <el-option label="文字题" value="文字"></el-option>
        </el-select>
      </el-form-item>

      <template v-if="singleChoice">
        <el-form-item label="题目：" required >
          <el-input
            v-model="form.question.qcontent"
            placeholder="请输入题目内容"
          />
        </el-form-item>
        <el-form-item label="题目说明：">
          <el-input
            v-model="form.question.qdescription"
            placeholder="请输入题目说明，可以为空"
          />
        </el-form-item>
        <el-form-item label="选项：">
          <div
            v-for="(option, opIndex) in form.question.optionsList"
            :key="opIndex"
            class="option-item"
          >
            <el-row :gutter="22">
              <el-col :span="18">
                <el-form-item :label="`选项 ${opIndex + 1}`" required >
                  <el-input
                    v-model="option.ovalue"
                    placeholder="请输入选项内容"
                  />
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
                  @click="delOption(opIndex)"
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
              v-model="form.question.qisrequire"
              active-text="有"
              inactive-text="否"
            />
          </div>
        </el-form-item>
      </template>

      <div class="text-choice" v-if="!singleChoice">
        <el-form-item
          label="题目"
          :rules="{
            required: true,
            message: '题目内容不能为空',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="form.question.qcontent"
            placeholder="请输入题目内容"
          />
        </el-form-item>
        <el-form-item label="题目说明">
          <el-input
            v-model="form.question.qdescription"
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
              v-model="form.question.isRequired"
              active-text="有"
              inactive-text="否"
            />
          </div>
        </el-form-item>
      </div>

      <!-- <question-list
        :question-list="form.topic"
        @delQuestion="onDelQuestion"
        @addOption="onAddOption"
        @delOption="onDelOption"
      /> -->

      <!-- <template v-if="singleChoice">
        <single-choice v-on="$listeners" :isSubmit="isSubmit" />
      </template> -->
      <!-- <template v-if="!singleChoice">
        <text-question v-on="$listeners" />
      </template> -->

      <el-form-item label="截止时间" prop="ndeadline">
        <el-date-picker
          v-model="form.ndeadline"
          type="datetime"
          :picker-options="datePickerOptions"
          placeholder="选择日期时间"
          @change="dateSel"
        />
      </el-form-item>

      <el-form-item>
        <!-- <el-button type="default" @click="submitNaire(NaireStatus.UNPUBLISHED)"
          >保存问卷</el-button
        > -->
        <el-button type="primary" @click="submitNaire"
          >发布问卷</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
import { Form as ElForm } from "element-ui";

import * as NaireAction from "../../api/naire";

import { questionType, questionTypeText } from "../../config/enum/questionType";
import { NaireStatus } from "../../config/enum/naireStatus";

import QuestionList from "../../components/Question/QuestionList.vue";

import SingleChoice from "../../components/Question/SingleChoice.vue";
import MultiChoice from "../../components/Question/MultiChoice.vue";
import TextQuestion from "../../components/Question/TextQuestion.vue";
import TextQuestion from "../view/components/Question/TextQuestion.vue";

@Component({
  components: {
    QuestionList,
    SingleChoice,
    MultiChoice,
    TextQuestion,
    TextQuestion
  }
})
export default class NavBar extends Vue {
  private questionType = questionType;
  private NaireStatus = NaireStatus;
  private singleChoice: boolean = true;
  private isSubmit: boolean = false;
  private form = {
    ntitle: "",
    nintro: "",
    ndeadline: "",
    nstatus: true,
    noptions: "",
    // type: "单选",
    question: {
      qcontent: "题目",
      optionsList: [
        {
          ovalue: "选项",
          odesc: "描述",
          oisaddition: false,
          oimage: "",
        }
      ],
      qisrequire: true,
      qdescription: "",
      qtype: "单选",
      isRequired: true,
    //   selectContent: "",
      qsetting: "",
    //   additional: ""
    }
  };

  private rules = {
    ntitle: [{ required: true, message: "请输入问卷标题", trigger: "blur" }],
    ndeadline: [{ required: true, message: "请选择截止时间", trigger: "blur" }],
    ntype: [{ required: true, message: "请选择调查类型", trigger: "blur" }]
    // content: [{ required: true, message: "题目不能为空", trigger: "blur" }],
    // options: [{ required: true, message: "选项内容不能为空", trigger: "blur" }],
  };

  private datePickerOptions = {
    disabledDate(time: Date) {
      return (
        time.getTime() <
        dayjs()
          .add(-1, "day")
          .valueOf()
      );
    }
  };
  private dateSel(e) {
    this.form.ndeadline = dayjs(e.getTime()).format("YYYY-MM-DD HH:mm:ss");
  }

  private addOption(index: number) {
    const tempData = {
      ovalue: "选项",
      odesc: "描述",
      oisaddition: false,
      oimage: "",
    };
    this.form.question.optionsList!.push({ ...tempData });
  }

  private delOption(opIndex: number) {
    if (this.form.question.optionsList!.length < 2) {
      return this.$message.warning("已经是最后一个选项，无法删除。");
    }
    this.form.question.optionsList!.splice(opIndex, 1);
  }
  selChange(e) {
    this.singleChoice = true;
    this.form.question.qtype = e;
    this.form.question.optionsList = [
      {
        ovalue: "选项",
        odesc: "描述",
        //   content: "选项",
        isAddition: false,
        image: "",
        desc: ""
      }
    ];
    if (e === "文字") {
      this.singleChoice = false;
      this.form.question.optionsList = [];
    }

    // this.addOption(e);
  }

  submitNaire(type: NaireStatus) {
    const form = this.$refs.form as ElForm;
    console.log(this.form);

    form.validate(async valid => {
      if (!valid) return;
      const params = {
        naire: {
          ...this.form,
        },
      };
	  if(this.$route.params.id){
		  const res = await NaireAction.update(this.form);
		  console.log(res);
		  
		  this.$message.success(res.msg);
	  }else{
		  const res = await NaireAction.create(this.form);
		  this.$message.success(res.msg);
	  }
          await this.$router.push("/list");
    });
  }
//   @Watch("form")

  async fetchData() {
    const res = await NaireAction.detail({
      nId: this.$route.params.id
    });
    this.form = {
      ...res.data,
    };
  }
  mounted() {
	if(this.$route.params.id){
		this.fetchData();
	}
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
