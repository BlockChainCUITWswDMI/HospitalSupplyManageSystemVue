<template>
    <div class="hospital">
        <el-dialog
            title="表单"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="编号" prop="hospitalid">
                    <el-input placeholder="请输入医院编号" v-model="form.hospitalid"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="hospitalname">
                    <el-input placeholder="请输入医院名称" v-model="form.hospitalname"></el-input>
                </el-form-item>
                <el-form-item label="USCI" prop="hosUsci">
                    <el-input placeholder="请输入医院USCI" v-model="form.hosUsci"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="白名单" prop="whitelistid">
                    <el-input placeholder="请输入白名单编号" v-model="form.whitelistid"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="hospital-header">
        </div>
        
        <div class="common-table">
            <el-table
                stripe
                height="90%"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="hospitalid"
                    label="医院编号">
                </el-table-column>
                <el-table-column
                    prop="hospitalname"
                    label="医院名称">
                </el-table-column>
                <el-table-column
                    prop="hosUsci"
                    label="统一社会信用代码">
                </el-table-column>
                <el-table-column
                    prop="password"
                    label="密码">
                </el-table-column>
                <el-table-column
                    prop="whitelistid"
                    label="白名单编号">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="big" @click="handleEdit(scope.row)">编辑</el-button>
                        <!-- <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>
        </el-table>
        <div class="pager">
            <el-pagination
                layout="prev, pager, next"
                :total="total"
                @current-change="handlePage">
            </el-pagination>
        </div>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import { getHospital, addHospital, updateHospital } from '../api/hospital.js'
    export default {
        data(){
            return {
                dialogVisible : false,
                form: {
                    hospitalid: '',
                    hospitalname: '',
                    hosUsci: '',
                    password: '',
                    whitelistid: ''
                },
                rules: {
                    hospitalid: [
                        { required: true, message: '请输入医院编号'}
                    ],
                    hospitalname: [
                        { required: true, message: '请输入医院名称'}
                    ],
                    hosUsci: [
                        { required: true, message: '请输入统一社会信用代码'}
                    ],
                    password: [
                        { required: true, message: '请输入密码'}
                    ],
                    whitelistid: [
                        { required: true, message: '请输入白名单编号'}
                    ],
                },
                tableData:[],
                modalType: 0, // 0表示新增弹窗，1表示编辑
                total: 0, //    总条数
                pageData:{
                    pageNo: 1,  // 页码
                    pageSize: 1,   // 条数
                },
                hospitalform: {
                    hospitalname: ''
                },
            }
        },
        methods: {
            // 提交用户表单
            submit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        // 进行后续处理
                        if (this.modalType === 0) {
                            addHospital(this.form).then(()=> {
                                //重新获取列表结构
                                this.getList()
                            })
                        } else {
                            updateHospital(this.form).then(()=> {
                                //重新获取列表结构
                                this.getList()
                            })
                        }
                        // 清空表单数据
                        this.$refs.form.resetFields()
                        // 关闭弹窗
                        this.dialogVisible = false
                    }
                })
            },
            handleClose(){
                console.log(this.$refs.form)
                this.$refs.form.resetFields()
                this.dialogVisible = false
            },
            cancel(){
                this.handleClose()
            },
            handleEdit(row){
                this.modalType = 1
                this.dialogVisible = true
                //  对当前行数据进行深拷贝
                this.form = JSON.parse(JSON.stringify(row))
            },
            handleDelete(row){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                    }).then(() => {
                        // delSupplier({ id: row.supplierid }).then(() => {
                        //     this.$message({
                        //         type: 'success',
                        //         message: '删除成功!'
                        //     });
                        //     // 更新列表
                        //     this.getList()
                        // })  
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
            },
            handleAdd(){
                this.modalType = 0
                this.dialogVisible = true
            },
            getList(){
                const _token = Cookies.get('token')
                getHospital({headers: {"token": _token}})
                .then(({ data }) => {
                    console.log(data)
                    this.tableData = data.data.records
                    this.total = data.total || 0
                })
            },
            handlePage(val){ // 选择页面的回调函数
                this.pageNo = val
                this.getList()
            },
            onSubmit(){  // 列表查询
                this.getList()
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style lang="less" scoped>
.hospital {
    height: 90%; 
    .common-table {
        height: calc(100% - 62px);
        position: relative;   
        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
    .hospital-header{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>