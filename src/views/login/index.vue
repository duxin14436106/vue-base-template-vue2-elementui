<template>
    <div class="login">
        <div class="login-input-con">
            <div class="form-left">
                <img src="../../assets/img/logo.png" alt="" />
                <p class="system-name">{{ appName }}</p>
            </div>
            <div class="form-right">
                <el-form class="login-form">
                    <el-form-item label="账号">
                        <el-input
                            v-model.trim="account"
                            placeholder="请输入账号"
                            size="normal"
                            clearable
                        >
                            <template slot="prepend"><i class="el-icon-user"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input
                            v-model.trim="password"
                            placeholder="请输入密码"
                            size="normal"
                            type="password"
                            show-password
                            clearable
                        >
                            <template slot="prepend"><i class="el-icon-lock"></i></template>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button size="normal" class="full-width" type="primary">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            account: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters(['appName']),
    },
}
</script>

<style lang="scss">
.login {
    width: 100%;
    height: 100%;
    background-color: $color-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('../../assets/img/login_bg.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    .login-input-con {
        width: 700px;
        height: 400px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        overflow: hidden;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .form-left {
            width: 50%;
            flex-shrink: 0;
            background-color: $--color-primary;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            img {
                display: block;
                margin-top: -40px;
            }
            p {
                font-size: 28px;
                color: #fff;
            }
        }
        .form-right {
            box-sizing: border-box;
            width: 50%;
            padding: 0 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            .login-form {
                width: 100%;
                .full-width {
                    width: 100%;
                    margin-top: 20px;
                }
            }
        }
    }
}
</style>
