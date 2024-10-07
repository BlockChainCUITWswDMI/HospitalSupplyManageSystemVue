<template>
    <div class="contract">
        <div class="contract-header">
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
                <el-table-column
                    prop="operation"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="big" @click="handleBlockchain(scope.row)">签名</el-button>
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
    import { getSUpplierContracts } from '../api/contract.js'
    import { storeSupplierSignature } from '../api/blockchain.js'
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
            async handleBlockchain(row) {
                try {
                    // 将其设置为 true，显示加载状态
                    const loading = this.$loading({
                        lock: true,
                        text: '请等待系统发送交易',
                        spinner: 'el-icon-loading',
                        background: 'rgba(0, 0, 0, 0.7)'
                    });
                    const OrderId = row.orderid;
                    console.log(OrderId,'orderid');
                    console.log(typeof OrderId,'orderid');
                    // 调用 storeSupplierSignature 函数来存储供应商签名
                    await storeSupplierSignature(OrderId);
                    console.log('Supplier signature stored successfully for order ID:', this.orderId);
                    loading.close();
                    // 更新列表
                    this.getList();
                } catch (error) {
                    console.error('Error storing supplier signature:', error);
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
                    getSUpplierContracts({params: param, headers: {"token": _token}})
                    .then(({ data }) => {
                        console.log(data)
                        this.tableData = data.data.records
                        this.total = data.data.total || 0
                    })
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
            }
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