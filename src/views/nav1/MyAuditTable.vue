<!--待我审核的请假-->
<template>
    <section>
        <!--工具条-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.name" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getVacList">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
        <el-table :data="vacTaskList" border @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" >
            </el-table-column>
            <el-table-column type="index"  >
            </el-table-column>
            <el-table-column prop="name" label="任务名称" >
            </el-table-column>
            <el-table-column prop="createTime" label="任务时间" :formatter="formatCreateTime" >
            </el-table-column>
            <el-table-column prop="vac.applyUser" label="申请人" >
            </el-table-column>
            <el-table-column prop="vac.applyTime" label="申请时间" :formatter="formatApplyTime">
            </el-table-column>
            <el-table-column prop="vac.days" label="天数">
            </el-table-column>
            <el-table-column prop="vac.reason" label="事由">
            </el-table-column>
            <el-table-column label="操作" >
                <template scope="scope">
                    <el-button size="small" @click="passAudit(scope.$index, scope.row,1)">审核通过</el-button>
                    <el-button type="danger" size="small" @click="passAudit(scope.$index, scope.row,0)">审核拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--工具条-->
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20"
                           :total="total" style="float:right;">
            </el-pagination>
        </el-col>
    </section>
</template>

<script>
    import util from '../../common/js/util'
    import {getUserListPage, removeUser, batchRemoveUser, editUser, addUser} from '../../api/api';

    export default {
        data() {
            return {
                userName: '',
                filters: {
                    name: ''
                },
                vacTaskList: [],
                total: 0,
                page: 1,
                listLoading: false,
                sels: [],//列表选中列
                editFormVisible: false,//编辑界面是否显示
                editLoading: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },

                addFormVisible: false,//新增界面是否显示
                addLoading: false,
                addFormRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'}
                    ]
                },
            }
        },
        methods: {
            //日期转换
            formatCreateTime: function (row, column) {
                const val =row.createTime;
                if (!val) {
                    return null;
                }
                const pattern = "yyyy-MM-dd hh:mm:ss"
                return util.formatDate.format(new Date(val), pattern);
            },
            formatApplyTime: function (row, column) {
                const val =row.vac.applyTime;
                if (!val) {
                    return null;
                }
                const pattern = "yyyy-MM-dd hh:mm:ss"
                return util.formatDate.format(new Date(val), pattern);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getVacList();
            },
            //获取请假列表
            getVacList() {
                let para = {
                    //page: this.page,
                    //name: this.filters.name
                     userName:this.userName
                };
                this.listLoading = true;
                this.$ajax.post('http://127.0.0.1:8081/myAudit',{
                    userName:this.userName
                }).then((response) => {
                    this.vacTaskList = response.data;
                }).catch((response) => {
                    alert("错误：" + response);
                })
            },
            //删除
            handleDel: function (index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {id: row.id};
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getVacList();
                    });
                }).catch(() => {

                });
            },
            //操作
            passAudit: function (index, row,result) {
                this.$ajax.post('http://127.0.0.1:8081/passAudit',{
                    id : row.id,
                    userName:this.userName,
                    vac : {
                        result : result == 1 ? "审核通过" : "审核拒绝"
                    }
                }).then((response) => {
                    if (response.data == true) {
                        alert("操作成功！");
                        window.location.reload();
                    } else {
                        alert("操作失败！");
                    }
                }).catch((response) => {
                    alert("错误：" + response);
                })
                /*this.$http.post("http://127.0.0.1:8081/passAudit",
                    {
                        id : row.id,
                        userName:this.userName,
                        vac : {
                            result : result == 1 ? "审核通过" : "审核拒绝"
                        }
                    }
                ).then(function (response) {
                    if (response.data == true) {
                        alert("操作成功！");
                        $window.location.reload();
                    } else {
                        alert("操作失败！");
                    }
                })*/
            },
            selsChange: function (sels) {
                this.sels = sels;
            },
            //批量删除
            batchRemove: function () {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = {ids: ids};
                    batchRemoveUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getVacList();
                    });
                }).catch(() => {

                });
            }
        },
        mounted() {
            var user = sessionStorage.getItem('user');
            if (user) {
                user = JSON.parse(user);
                this.userName = user.userName || '';
                //this.sysUserAvatar = user.avatar || '';
            }
            this.getVacList();


        }
    }

</script>

<style scoped>

</style>