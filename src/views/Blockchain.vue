<template>
    <div class="container">
        <h1>区块链管理</h1>
        <div class="input-container">
            <input type="text" v-model="orderId" placeholder="请输入订单ID">
            <button @click="fetchOrder">获取链上信息</button>
        </div>
        <div v-if="isLoading" class="loading">加载中...</div>
        <div v-else>
            <h2>链上合同信息</h2>
            <div v-if="order" class="order-info">
                <p>合同ID: <span @click="toggleContractId">{{ shortenedContractId }}</span></p>
                <p>白名单ID: <span @click="toggleWhitelistId">{{ shortenedWhitelistId }}</span></p>
                <p>供应商ID: <span @click="toggleSupplierId">{{ shortenedSupplierId }}</span></p>
                <p>医院ID: <span @click="toggleHospitalId">{{ shortenedHospitalId }}</span></p>
                <p>UDI: <span @click="toggleUDI">{{ shortenedUDI }}</span></p>
                <p>订金: {{ order.deposit }}</p>
                <p>违约金: {{ order.dedit }}</p>
                <p>数量: {{ order.amount }}</p>
                <p>医院签名: <span @click="toggleHospitalSignature">{{ shortenedHospitalSignature }}</span></p>
                <p>供应商签名: <span @click="toggleSupplierSignature">{{ shortenedSupplierSignature }}</span></p>
            </div>
            <div v-else>
                <p>未找到订单信息。</p>
            </div>
        </div>
    </div>
</template>

<script>
// 导入web3.js库
import { getOrderFromBlockchain } from '../api/blockchain.js'
export default {
    data() {
        return {
            isLoading: false,
            order: null,
            orderId: '',
            // 控制是否显示完整的 ID
            showFullContractId: false,
            showFullWhitelistId: false,
            showFullSupplierId: false,
            showFullHospitalId: false,
            showFullUDI: false,
            showFullHospitalSignature: false,
            showFullSupplierSignature: false
        };
    },
    methods: {
        async fetchOrder() {
            try {
                // 开始加载状态
                this.isLoading = true;
                
                // 发起请求获取订单信息
                const order = await getOrderFromBlockchain(this.orderId);
                // 将订单信息存储到组件的数据中
                this.order = order;
            } catch (error) {
                console.error('Error fetching order:', error);
            } finally {
                // 停止加载状态
                this.isLoading = false;
            }
        },
        // 切换是否显示完整的 Contract ID
        toggleContractId() {
            this.showFullContractId = !this.showFullContractId;
        },
        // 切换是否显示完整的 Whitelist ID
        toggleWhitelistId() {
            this.showFullWhitelistId = !this.showFullWhitelistId;
        },
        // 切换是否显示完整的 Supplier ID
        toggleSupplierId() {
            this.showFullSupplierId = !this.showFullSupplierId;
        },
        // 切换是否显示完整的 Hospital ID
        toggleHospitalId() {
            this.showFullHospitalId = !this.showFullHospitalId;
        },
        // 切换是否显示完整的 UDI
        toggleUDI() {
            this.showFullUDI = !this.showFullUDI;
        },
        // 切换是否显示完整的 Hospital Signature
        toggleHospitalSignature() {
            this.showFullHospitalSignature = !this.showFullHospitalSignature;
        },
        // 切换是否显示完整的 Supplier Signature
        toggleSupplierSignature() {
            this.showFullSupplierSignature = !this.showFullSupplierSignature;
        }
    },
    computed: {
        // 计算属性，根据 showFullContractId 的值返回完整或缩短的 Contract ID
        shortenedContractId() {
            if (this.showFullContractId || !this.order || !this.order.contractId) {
                return this.order ? this.order.contractId : '';
            } else {
                // 只显示前 20 个字符
                return this.order.contractId.slice(0, 20) + '...';
            }
        },
        // 计算属性，根据 showFullWhitelistId 的值返回完整或缩短的 Whitelist ID
        shortenedWhitelistId() {
            if (this.showFullWhitelistId || !this.order || !this.order.whitelistId) {
                return this.order ? this.order.whitelistId : '';
            } else {
                // 只显示前 20 个字符
                return this.order.whitelistId.slice(0, 20) + '...';
            }
        },
        // 计算属性，根据 showFullSupplierId 的值返回完整或缩短的 Supplier ID
        shortenedSupplierId() {
            if (this.showFullSupplierId || !this.order || !this.order.supplierId) {
                return this.order ? this.order.supplierId : '';
            } else {
                // 只显示前 20 个字符
                return this.order.supplierId.slice(0, 20) + '...';
            }
        },
        // 计算属性，根据 showFullHospitalId 的值返回完整或缩短的 Hospital ID
        shortenedHospitalId() {
            if (this.showFullHospitalId || !this.order || !this.order.hospitalId) {
                return this.order ? this.order.hospitalId : '';
            } else {
                // 只显示前 20 个字符
                return this.order.hospitalId.slice(0, 20) + '...';
            }
        },
        // 计算属性，根据 showFullUDI 的值返回完整或缩短的 UDI
        shortenedUDI() {
            if (this.showFullUDI || !this.order || !this.order.udi) {
                return this.order ? this.order.udi : '';
            } else {
                // 只显示前 20 个字符
                return this.order.udi.slice(0, 20) + '...';
            }
        },
        // 计算属性，根据 showFullHospitalSignature 的值返回完整或缩短的 Hospital Signature
        shortenedHospitalSignature() {
            if (this.showFullHospitalSignature || !this.order || !this.order.hospitalSignature) {
                return this.order ? this.order.hospitalSignature : '';
            } else {
                // 只显示前 20 个字符
                return this.order.hospitalSignature.slice(0, 20) + '...';
            }
        },
        // 计算属性，根据 showFullSupplierSignature 的值返回完整或缩短的 Supplier Signature
        shortenedSupplierSignature() {
            if (this.showFullSupplierSignature || !this.order || !this.order.supplierSignature) {
                return this.order ? this.order.supplierSignature : '';
            } else {
                // 只显示前 20 个字符
                return this.order.supplierSignature.slice(0, 20) + '...';
            }
        }
    }
};
</script>

<style scoped>
.container {
    margin: 20px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    background-color: #f9f9f9;
}

h1, h2 {
    color: #333;
    font-family: 'Arial', sans-serif;
}

.input-container {
    margin-bottom: 20px;
}

.loading {
    margin-top: 20px;
}

.order-info p {
    margin-bottom: 10px;
}

.order-info span {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
}
</style>