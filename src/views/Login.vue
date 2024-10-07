<template>
    <div>
        <el-form ref="form" lable-width="70px" :inline="true" class="login-container" :model="form" :rules="rules">
            <h3 class="login_title"> 系统登录 </h3>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="verifiCode">
                <el-input v-model="form.verifiCode" placeholder="请输入验证码"></el-input>
                <img v-if="verifiCodeImage" :src="verifiCodeImage" alt="验证码" @click="refreshverifiCode" style="cursor: pointer">
            </el-form-item>
            <el-form-item label="角色" prop="usertype">
                <el-radio v-model="form.usertype" label=1>医院</el-radio>
                <el-radio v-model="form.usertype" label=2>供应商</el-radio>
                <el-radio v-model="form.usertype" label=3>管理员</el-radio>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" style="margin-left: 175px; margin-top: 10px;" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import Cookie from 'js-cookie';
    import { login, getVerifiCodeImage } from "../api";
    export default {
        data(){
            return{
                form: {
                    username: '',
                    password: '',                
                    verifiCode: '',
                    usertype: '',
                },
                rules: {
                    username: [
                        {required: true, trigger: 'blur', message: '请输入用户名'}
                    ],
                    password:[
                        {required: true, trigger: 'blur', message: '请输入密码'}
                    ],
                    usertype:[
                        {required: true, trigger: 'blur', message: '请选择用户类型'}
                    ],
                    verifiCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
                },
                verifiCodeImage: '',
            }
        },
        mounted() {
            // 页面加载时获取验证码
            this.getverifiCode();
        },
        methods:{
            submit(){ //登录
                try {
                    this.$refs.form.validate((valid) => {
                        // 验证通过，执行登录操作
                        if (valid) {               
                            login(this.form).then(( data ) => {
                                if (data.data.code === 200) {
                                    console.log( data );
                                    Cookie.set('token', data.data.data.token);
                                    const _menuHospital = [
                                        {
                                            path: '/home',
                                            name: 'home',
                                            label: '首页',
                                            icon: 's-home',
                                            url: 'Home.vue'
                                        },
                                        {
                                            path: '/instrument',
                                            name: 'instrument',
                                            label: '器械管理',
                                            icon: 'info',
                                            url: 'Instrument.vue'
                                        },
                                        {
                                            path: '/warehouse',
                                            name: 'warehouse',
                                            label: '库存管理',
                                            icon: 'document',
                                            url: 'Warehouse.vue'
                                        },
                                        {
                                            label: '合同签订管理',
                                            icon: 'location',
                                            children: [
                                                {
                                                    path: '/contract',
                                                    name: 'contract',
                                                    label: '合同管理',
                                                    icon: 's-cooperation',
                                                    url: 'Contract.vue'
                                                },
                                                {
                                                    path: '/blockchain',
                                                    name: 'blockchain',
                                                    label: '链上数据',
                                                    icon: 's-blockchain',
                                                    url: 'Blockchain.vue'
                                                },
                                            ],
                                        },
                                        {
                                            label: '用户管理',
                                            icon: 's-custom',
                                            children: [
                                                {
                                                    path: '/supplier',
                                                    name: 'supplier',
                                                    label: '供应商管理',
                                                    icon: 'user',
                                                    url: 'Supplier.vue'
                                                },
                                                {
                                                    path: '/hospital',
                                                    name: 'hospital',
                                                    label: '医院管理',
                                                    icon: 'user-solid',
                                                    url: 'Hospital.vue'
                                                },
                                            ],
                                        },
                                    ];
                                    const _menuSupplier = [
                                    {
                                            path: '/home',
                                            name: 'home',
                                            label: '首页',
                                            icon: 's-home',
                                            url: 'Home.vue'
                                        },
                                        {
                                            label: '合同签订管理',
                                            icon: 'location',
                                            children: [
                                                {
                                                    path: '/contract',
                                                    name: 'contract',
                                                    label: '合同管理',
                                                    icon: 's-cooperation',
                                                    url: 'ContractSupplier.vue'
                                                },
                                                {
                                                    path: '/blockchain',
                                                    name: 'blockchain',
                                                    label: '链上数据',
                                                    icon: 's-blockchain',
                                                    url: 'Blockchain.vue'
                                                },
                                            ],
                                        },
                                    ];
                                    const _meneAdmin = [
                                        {
                                            path: '/home',
                                            name: 'home',
                                            label: '首页',
                                            icon: 's-home',
                                            url: 'Home.vue'
                                        },
                                        {
                                            path: '/hospital',
                                            name: 'hospital',
                                            label: '医院管理',
                                            icon: 'user-solid',
                                            url: 'HospitalAdmin.vue'
                                        },
                                    ];
                                    if (this.form.usertype === '1') {
                                        this.$store.commit('setMenu',_menuHospital);
                                        this.$store.commit('addMenu',this.$router);
                                        //  跳转首页
                                        this.$router.push('/home');
                                    } else if (this.form.usertype === '2') {
                                        this.$store.commit('setMenu',_menuSupplier);
                                        this.$store.commit('addMenu',this.$router);
                                        //  跳转首页
                                        this.$router.push('/home');
                                    } else if (this.form.usertype === '3') {
                                        this.$store.commit('setMenu',_meneAdmin);
                                        this.$store.commit('addMenu',this.$router);
                                        //  跳转首页
                                        this.$router.push('/home');
                                    } else{
                                        this.$message.error(data.data.message);
                                    }
                                } else {
                                    // 登录失败，显示错误消息
                                    this.$message.error(data.data.message);
                                }
                            })
                        }
                    }) 
                } catch (error) {
                    console.error('An error occurred while validating the form:', error);
                }                
            },
            // 获取验证码
            async getverifiCode() {
                try {
                    // 向后端请求获取验证码图片，确保响应类型为 blob
                    const response = await getVerifiCodeImage({ responseType: 'blob' });
                    
                    // 将获取到的验证码图片 Blob 数据转换为 base64 编码
                    const reader = new FileReader();
                    reader.readAsDataURL(response.data);  // 确保 response.data 是一个 Blob
                    reader.onload = () => {
                    this.verifiCodeImage = reader.result; // 将结果赋给 verifiCodeImage 用于显示
                    };
                    reader.onerror = (error) => {
                    console.error('Error converting verifiCode to base64:', error);
                    };
                } catch (error) {
                    console.error('Failed to refresh verifiCode:', error);
                }
            },
            // 刷新验证码
            refreshverifiCode() {
                console.log('触发更新事件');
                this.getverifiCode();
            }
        }
    }
</script>

<style lang="less" scoped>
.login-container{
    width: 480px;
    border: 1px solid #eaeaea;
    margin: 180px auto;
    padding: 35px 35px 35px 35px;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 0 25px #cac6c6;
    box-sizing: border-box;
    .el-input{
        width: 230px;
    }
    .login_title {
        text-align: center;
        margin-bottom: 40px;
        color: #505458;
    }
}
</style>