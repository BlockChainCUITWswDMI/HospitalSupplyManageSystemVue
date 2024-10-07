<template>
    <div class="contract">
        <el-dialog
            title="表单"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <el-form ref="form" :rules="rules" :inline="true" :model="form" label-width="80px">
                <el-form-item label="编号" prop="contractid">
                    <el-input placeholder="请输入合同编号" v-model="form.contractid"></el-input>
                </el-form-item>
                <el-form-item label="白名单" prop="whitelistid">
                    <el-input placeholder="请输入白名单编号" v-model="form.whitelistid"></el-input>
                </el-form-item>
                <el-form-item label="供应商" prop="supplierid">
                    <el-input placeholder="请输入供应商编号" v-model="form.supplierid"></el-input>
                </el-form-item>
                <el-form-item label="医院" prop="hospitalid">
                    <el-input placeholder="请输入医院编号" v-model="form.hospitalid"></el-input>
                </el-form-item>
                <el-form-item label="订金" prop="deposit">
                    <el-input placeholder="请输入订金" v-model="form.deposit"></el-input>
                </el-form-item>
                <el-form-item label="违约金" prop="dedit">
                    <el-input placeholder="请输入订金" v-model="form.dedit"></el-input>
                </el-form-item>
                <el-form-item label="udi" prop="udi">
                    <el-input placeholder="请输入医疗器械唯一标识" v-model="form.udi"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="amount">
                    <el-input placeholder="请输入白名单编号" v-model="form.amount"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="contract-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>
            <!-- form搜索区 -->
            <el-form :inline="true" :model="contractform">
                <el-form-item>
                    <el-input placeholder="请输入设备名称" v-model="contractform.instrumentname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <el-table
                height="90%"
                :data="tableData"
                style="width: 100%"
                stripe>
                <el-table-column
                    prop="contractid"
                    label="合同编号">
                </el-table-column>
                <el-table-column
                    prop="suppliername"
                    label="供应商名称">
                </el-table-column>
                <el-table-column
                    prop="hospitalname"
                    label="医院名称">
                </el-table-column>
                <el-table-column
                    prop="instrumentname"
                    label="器械名称">
                </el-table-column>
                <el-table-column
                    prop="deposit"
                    label="订金">
                </el-table-column>
                <el-table-column
                    prop="dedit"
                    label="违约金">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="创建时间">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="orderid"
                    label="链上编号">
                </el-table-column>        
                <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope">
                        <el-button size="big" @click="handleBlockchain(scope.row)">上链</el-button>
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
    import { getContracts, addContract, addOrderId } from '../api/contract.js'
    import { createOrder } from '../api/blockchain.js'
    
    export default {
        data(){
            return {
                dialogVisible : false,
                form: {
                    contractid: '',
                    whitelistid: '',
                    supplierid: '',
                    suppliername: '',
                    hospitalid: '',
                    hospitalname: '',
                    deposit: '',
                    dedit: '',
                    createDate: '',
                    udi: '',
                    instrumentname: '',
                    amount: '',
                    orderid: '',
                },
                rules: {
                    contractid: [
                        { required: true, message: '请输入合同编号'}
                    ],
                    whitelistid: [
                        { required: true, message: '请输入白名单编号'}
                    ],
                    supplierid: [
                        { required: true, message: '请输入供应商编号'}
                    ],
                    hospitalid: [
                        { required: true, message: '请输入医院编号'}
                    ],
                    deposit: [
                        { required: true, message: '请输入订金'}
                    ],
                    dedit: [
                        { required: true, message: '请输入违约金'}
                    ],
                    udi: [
                        { required: true, message: '请输入医疗器械唯一标识'}
                    ],
                    amount: [
                        { required: true, message: '请输入数量'}
                    ],
                },
                tableData:[],
                modalType: 0, // 0表示新增弹窗，1表示编辑
                total: 0, //    总条数
                pageData:{
                    _pageNo: 1,  // 页码
                    _pageSize: 5,   // 条数
                },
                contractform: {
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
                            addContract(this.form).then(()=> {
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
            async handleBlockchain(row) {
                try {
                    // 将其设置为 true，显示加载状态
                    const loading = this.$loading({
                        lock: true,
                        text: '请等待系统发送交易',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });

                    this.form = JSON.parse(JSON.stringify(row));
                    console.log('form', this.form);
                    if (this.form.orderid === 0) {
                        // 调用 createOrder 方法，不使用 await
                        createOrder(row)
                            .then((orderId) => {
                                console.log('Order ID:', orderId);
                                this.form.orderid = orderId;
                                console.log('this.form.orderid:', this.form.orderid);
                                addOrderId(this.form); // 将OrderID添加入数据库                 
                                loading.close();
                                // 更新列表
                                this.getList();
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                this.$router.push({ name: 'error', params: { message: error.message } });
                            });
                    } else {
                        console.error('该合同已经上链');
                        this.$router.push({ name: 'error', params: { message: '该合同已经上链' } });
                    }
                } catch (error) {
                    console.error('Error blockchain:', error);
                    this.$router.push({ name: 'error', params: { message: error.message } });
                } finally {
                    // 更新列表
                    this.getList();
                }
            },    
            handleAdd(){
                this.modalType = 0
                this.dialogVisible = true
            },
            getList(){
                try{
                    const _token = Cookies.get('token')
                    const param = {
                        pageNo: this.pageData._pageNo,
                        pageSize: this.pageData._pageSize,
                        instrumentname: this.contractform.instrumentname
                    }
                    getContracts({params: param, headers: {"token": _token}})
                    .then(({ data }) => {
                        console.log(data)
                        this.tableData = data.data.records
                        this.total = data.data.total || 0
                    });
                } catch (error) {
                    console.error("Error creating order:", error);
                    this.$router.push({ name: 'error', params: { message: error.message } });
                }
            },
            handlePage(val){ // 选择页面的回调函数
                this.pageData._pageNo = val
                this.getList()
            },
            onSubmit(){  // 列表查询
                this.getList()
            },
        },
        mounted() {
            this.getList()
        }
    }
</script>

<style lang="less" scoped>
.contract {
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
    .contract-header{
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
</style>