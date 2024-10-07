<template>
    <div class="warehouse">
        <el-dialog
            title="表单"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="编号" prop="warehouseid">
                    <el-input placeholder="请输入供应商编号" v-model="form.warehouseid"></el-input>
                </el-form-item>
                <el-form-item label="医院" prop="hospitalid">
                    <el-input placeholder="请输入医院编号" v-model="form.hospitalid"></el-input>
                </el-form-item>
                <el-form-item label="器械" prop="instrumentid">
                    <el-input placeholder="请输入器械编号" v-model="form.instrumentid"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="amount">
                    <el-input placeholder="请输入数量" v-model="form.amount"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-input placeholder="请输入状态" v-model="form.status"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="warehouse-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>
            <!-- form搜索区 -->
            <el-form :inline="true" :model="warehouseform">
                <el-form-item>
                    <el-input placeholder="请输入器械名称" v-model="warehouseform.instrumentname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <el-table
                stripe
                height="90%"
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="warehouseid"
                    label="库存编号">
                </el-table-column>
                <el-table-column
                    prop="hospitalname"
                    label="医院">
                </el-table-column>
                <el-table-column
                    prop="suppliername"
                    label="供应商">
                </el-table-column>
                <el-table-column
                    prop="instrumentname"
                    label="器械">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="addDate"
                    label="添加时间">
                </el-table-column>
                <el-table-column
                    prop="updateDate"
                    label="修改时间">
                </el-table-column>
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
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
    import { getWarehouse, addWarehouse, updateWarehouse, deleteWarehouse } from '../api/warehouse.js'
    export default {
        data(){
            return {
                dialogVisible : false,
                form: {
                    warehouseid: '',
                    hospitalid: '',
                    hospitalname: '',
                    amount: '',
                    addDate: '',
                    updateDate: '',
                    status: '',
                    instrumentid: '',
                    instrumentname: '',
                },
                rules: {
                    warehouseid: [
                        { required: true, message: '请输入库存编号'}
                    ],
                    hospitalid: [
                        { required: true, message: '请输入医院编号'}
                    ],
                    amount: [
                        { required: true, message: '请输入数量'}
                    ],
                    status: [
                        { required: true, message: '请输入状态'}
                    ],
                    instrumentid: [
                        { required: true, message: '请输入器械编号'}
                    ],
                },
                tableData:[],
                modalType: 0, // 0表示新增弹窗，1表示编辑
                total: 0, //    总条数
                pageData:{
                    _pageNo: 1,  // 页码
                    _pageSize: 5,   // 条数
                },
                warehouseform: {
                    instrumentname: ''
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
                            addWarehouse(this.form).then(()=> {
                                //重新获取列表结构
                                this.getList()
                            })
                        } else {
                            updateWarehouse(this.form).then(()=> {
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
                        deleteWarehouse({ warehouseid: row.warehouseid }).then(() => {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            // 更新列表
                            this.getList()
                        })  
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
                const param = {
                    pageNo: this.pageData._pageNo,
                    pageSize: this.pageData._pageSize,
                    instrumentname: this.warehouseform.instrumentname
                }
                getWarehouse({params: param, headers: {"token": _token}})
                .then(({ data }) => {
                    console.log(data)
                    this.tableData = data.data.records
                    this.total = data.data.total || 0
                })
            },
            handlePage(val){ // 选择页面的回调函数
                this.pageData._pageNo = val
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
.warehouse {
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
    .warehouse-header{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>