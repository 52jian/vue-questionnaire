<template>
  <div>
    <div class="question-item">
      <div class="question-content">
        <el-card shadow="hover">
          <question-item
            :type="questionList.qtype"
            :topic="questionList"
            index="1"
            v-on="$listeners"
          />
          <!-- <single-choice :topic="questionList" index="1"/> -->
        </el-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import QuestionItem from "./QuestionItem.vue";
import SingleChoice from "./SingleChoice.vue";
import MultiChoice from "./MultiChoice.vue";
import TextQuestion from "./TextQuestion.vue";

@Component({
  components: {
    QuestionItem,
    SingleChoice,
    MultiChoice,
    TextQuestion
  }
})
export default class extends Vue {
  @Prop({
    default: () => {
      return {
        qtype: "单选",
        qcontent: "题目"
      };
    }
  }) questionList: any;
  @Prop() selShow!: boolean;
  // @Prop({ default: 'normal' }) type?: string

  // private selShow:boolean = true;
  private delQuestion() {
    this.$emit("delQuestion");
  }

  updated() {
    console.log(this.questionList);
  }
}
</script>

<style lang="scss" scoped>
.no-question {
  margin: 30px 0;
  font-size: 14px;
}

.question-item {
  display: flex;
  align-content: center;
  justify-content: flex-start;
  margin-bottom: 20px;

  .question-order {
    flex: 60px 0 0;
    text-align: center;
  }

  .question-action {
    &:hover {
      color: #018fe5;
      cursor: pointer;
    }
  }

  .question-content {
    flex: 1;
  }
}
</style>
