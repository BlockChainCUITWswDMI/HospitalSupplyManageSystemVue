<template>
    <div class="instrument">
        <el-dialog
            title="表单"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="编号" prop="instrumentid">
                    <el-input placeholder="请输入器械编号" v-model="form.instrumentid"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="instrumentname">
                    <el-input placeholder="请输入器械名称" v-model="form.instrumentname"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierid">
                    <el-input placeholder="请输入供应商编号" v-model="form.supplierid"></el-input>
                </el-form-item>
                <el-form-item label="UDI" prop="udi">
                    <el-input placeholder="请输入医疗器械唯一标识" v-model="form.udi"></el-input>
                </el-form-item>
                <el-form-item label="生产日期" prop="productionTime">
                    <el-input placeholder="请输入生产日期" v-model="form.productionTime"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="instrument-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>
            <!-- form搜索区 -->
            <el-form :inline="true" :model="instrumentform">
                <el-form-item>
                    <el-input placeholder="请输入器械名称" v-model="instrumentform.instrumentname"></el-input>
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
                    prop="instrumentid"
                    label="器械编号">
                </el-table-column>
                <el-table-column
                    prop="instrumentname"
                    label="器械名称">
                </el-table-column>
                <el-table-column
                    prop="suppliername"
                    label="供应商">
                </el-table-column>
                <el-table-column
                    prop="productionTime"
                    label="器械">
                </el-table-column>
                <el-table-column
                    prop="udi"
                    label="医疗器械唯一标识">
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
    import { getInstrument, addInstrument, updateInstrument, deleteInstrument } from '../api/instrument.js'
    export default {
        data(){
            return {
                dialogVisible : false,
                form: {
                    instrumentid: '',
                    instrumentname: '',
                    supplierid: '',
                    suppliername: '',
                    productionTime: '',
                    udi: '',
                },
                rules: {
                    instrumentid: [
                        { required: true, message: '请输入器械编号'}
                    ],
                    instrumentname: [
                        { required: true, message: '请输入器械名称'}
                    ],
                    supplierid: [
                        { required: true, message: '请输入供应商编号'}
                    ],
                    suppliername: [
                        { required: true, message: '请输入供应商名称'}
                    ],
                    productionTime: [
                        { required: true, message: '请输入生产日期'}
                    ],
                    udi: [
                        { required: true, message: '请输入医疗器械唯一标识'}
                    ],
                },
                tableData:[],
                modalType: 0, // 0表示新增弹窗，1表示编辑
                total: 0, //    总条数
                pageData:{
                    _pageNo: 1,  // 页码
                    _pageSize: 6,   // 条数
                },
                instrumentform: {
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
                            addInstrument(this.form).then(()=> {
                                //重新获取列表结构
                                this.getList()
                            })
                        } else {
                            updateInstrument(this.form).then(()=> {
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
                        deleteInstrument({ instrumentid: row.instrumentid }).then(() => {
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
                const param = {
                    pageNo: this.pageData._pageNo,
                    pageSize: this.pageData._pageSize,
                    instrumentname: this.instrumentform.instrumentname
                }
                console.log(param,'param')
                getInstrument({params: param})
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
.instrument {
    height: 90%; 
    .instrument-header{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table {
        height: calc(100% - 62px);
        position: relative;   
        .pager {
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
    
}
</style>