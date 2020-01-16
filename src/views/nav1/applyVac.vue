<!--我要请假-->
<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<el-form-item label="请假天数" >
			<el-input-number v-model="ruleForm.days"  :min="1" :max="10" label="描述文字"></el-input-number>
		</el-form-item>
		<el-form-item label="请假理由" prop="reason">
			<el-input type="textarea" v-model="ruleForm.reason"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
			<el-button @click="resetForm('ruleForm')">取消</el-button>
		</el-form-item>
	</el-form>

</template>

<script>
    export default {
        data() {
            return {
                userName:'',
                ruleForm: {
                    reason: '有紧急事情',
                    days: 1,
                },
                rules: {
                    reason: [
                        { required: true, message: '请假理由不能为空', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$ajax.post('http://127.0.0.1:8081/startVac',{
                            userName:this.userName,
                            reason : this.ruleForm.reason,
                            days : this.ruleForm.days
                        }).then((response) => {
                            alert("请假成功！")
                            this.$router.push({path: '/MyVacTable'});
                        }).catch((response) => {
                            alert("错误：" + response);
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.userName = user.userName || '';
                //this.sysUserAvatar = user.avatar || '';
            }
        }
    }
</script>