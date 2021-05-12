<template>
  <div class="change-pwd">
    <el-form ref="form" :model="form" :rules="rules" label-width="80">
      <el-form-item label="旧密码" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="loading" @click="handleSubmit"
          >确认修改</el-button
        >
        <!-- <el-button type="ghost" style="margin-left: 8px" @click="handleReset">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { ElForm } from "element-ui/types/form";
import * as AdminAction from "@/api/admin";
import { UserModule } from "@/store/modules/user";

@Component
export default class extends Vue {
  private form: {
    oldPassword: string;
    newPassword: string;
    userName: string;
  } = {
    oldPassword: "",
    newPassword: "",
    userName: "admin"
  };

  private rules: any = {
    newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    oldPassword: [{ required: true, message: "请输入原密码", trigger: "blur" }]
  };

  private loading: boolean = false;

  handleSubmit() {
    const ref = this.$refs.form as ElForm;
    ref.validate(async valid => {
      if (!valid) return;
      this.loading = true;
      const res = await AdminAction.changePwd(this.form);
      this.loading = false;
      console.log(res);

      this.$message.success(res.msg);
      UserModule.logout();
      this.$router.push("/login");
    });
  }

  handleReset() {
    const ref = this.$refs.form as ElForm;
    ref.resetFields();
  }
}
</script>

<style lang="scss" scoped>
.change-pwd {
  width: 50%;
}
</style>
