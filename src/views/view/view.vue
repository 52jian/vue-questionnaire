<template>
  <div v-loading.fullscreen.lock="loading" class="view-layout">
    <!-- <div v-if="isNotPublish" class="main">
      <div class="header">
        <h1>问卷未发布！</h1>
      </div>
      <div class="content">
        <p>您所填写的问卷未发布，暂不能填写。</p>
      </div>
    </div> -->
    <!-- <div v-else-if="isExpired" class="main">
      <div class="header">
        <h1>问卷已过期！</h1>
      </div>
      <div class="content">
        <p>您所填写的问卷已到截止日期，暂不能填写。</p>
      </div>
    </div> -->
    <div  class="main">
      <div class="header">
        <h1>{{ naire.ntitle }}</h1>
      </div>
      <div class="content">
        <div class="intro">
          <div style="white-space: pre-wrap">{{ naire.nintro }}</div>
          <p class="mt-10">截止日期：{{ naire.ndeadline }}</p>
        </div>
        <!-- <div class="user-info">
          <el-alert :type="isLogin ? 'success' : 'warning'">{{
            loginTip
          }}</el-alert>
          <el-form
            v-show="!isLogin"
            ref="userInfo"
            class="mt-10"
            :model="userInfo"
            :rules="userInfoRule"
            inline
          >
            <el-form-item prop="name">
              <el-input v-model="userInfo.name" placeholder="请输入姓名" />
            </el-form-item>
            <el-form-item prop="identity">
              <el-input
                v-model="userInfo.identity"
                placeholder="请输入身份证后6位"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit"
                >点击登录</el-button
              >
            </el-form-item>
          </el-form>
        </div> -->

        <question-list :question-list="naire.question" @radioSel='handleRadio'/>

        <div class="text-center">
          <el-button v-if="isAdmin" type="success" @click="goBack"
            >返回管理平台
          </el-button>
          <el-button
            type="primary"
            :loading="finished"
            :disabled="finished"
            @click="submitNaire"
            >提交问卷</el-button
          >
        </div>
      </div>
      <div class="footer">
        <p>微型问卷系统</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { UserModule } from "@/store/modules/user";
import * as NaireAction from "@/api/naire";
import * as UserAction from "@/api/user";
import QuestionList from "./components/Question/QuestionList.vue";
import { ElForm } from "element-ui/types/form";
import { questionType } from "@/config/enum/questionType";

@Component({
  components: {
    QuestionList
  }
})
export default class extends Vue {
  private loading: boolean = false;
  private naire: any = {
	  ntitle: '',
	  ntype: ''
  };
  private isLogin: boolean = false;
  private userId: string = "";
  private userInfo: any = {
    name: "",
    identity: ""
  };
  private userInfoRule: any = {
    name: [{ required: true, message: "请填写用户名", trigger: "blur" }],
    identity: [
      { required: true, message: "请填写身份证后6位", trigger: "blur" }
    ]
  };
  private finished: boolean = false;

  @Watch("$route")
  watchRoute() {
    this.fetchData();
  }

  get loginTip() {
    if (this.isLogin)
      return `当前登录用户：${this.userInfo.name}，请继续完成问卷！`;
    return `在填写表单之前，请先填写用户信息。`;
  }

  // 是否为管理员
  get isAdmin() {
    return UserModule.isAdmin;
  }

  // 问卷未发布
  get isNotPublish() {
    return this.isAdmin ? false : this.naire.nstatus === true;
  }

  // 问卷已截止
  get isExpired() {
    return this.isAdmin
      ? false
      : Number(this.naire.deadline) < new Date().getTime();
  }

  // 返回管理平台
  goBack() {
    this.$router.push("/list");
  }

  
  // 问卷表单校验
   validateNaire(): boolean {
	if(this.naire.noptions) return true;
    return false
  } 

  handleRadio(e){
	  this.naire = {
		  ...this.naire,
		  noptions:e
	  }
  }

  // 提交问卷
   async submitNaire() {
    if (!this.validateNaire()) {
		this.$message.error("请先选择选项");
      return;
    }
	console.log(this.naire);
	

    
    const res = await NaireAction.submit({
      naire: this.naire
    });
	console.log(res);
	
    // this.finished = false;
    // if (res.success) {
    //   this.$message.success(res.data.msg);
    //   this.$router.push("/complete");
    // } else {
    //   this.$message.error("提交失败，错误信息：" + res.data.msg);
    // }
  } 

  async fetchData() {
    this.loading = true;
    const res = await NaireAction.detail({
      nId: this.$route.params.id
    });
    this.loading = false;
    this.naire = res.data;
    document.title = res.data.ntitle;
  } 

  created() {
    this.fetchData();
  }
}
</script>

<style lang="scss" scoped>
.view-layout {
  background-color: rgb(237, 240, 248);
  min-height: 100vh;
  max-height: 100%;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  font-size: 14px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;

  .main {
    max-width: 800px;
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding-bottom: 30px;
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgba(124, 124, 124, 0.2);
  }

  .header {
    padding: 30px 20px;
    height: auto;
    min-height: 33px;
    border-bottom: 2px dotted #eee;

    h1 {
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
  }

  .content {
    padding: 20px;
    text-align: left;
    font-size: inherit;

    .intro {
      margin: 10px 0;
    }
  }

  .footer {
    margin-top: 10px;
    padding-top: 10px;
    text-align: center;
    border-top: 1px dotted #eee;
  }
}

.code-row-bg button {
  margin: 0 10px;
}
</style>
