<template>
    <div class="header-con">
        <div class="header-left">
            <i
                v-if="!isCollapse"
                class="el-icon-s-fold fontsize-22 clickable mar-right-20"
                @click="handleSideOpen(true)"
            ></i>
            <i
                v-else
                class="el-icon-s-unfold fontsize-22 clickable mar-right-20"
                @click="handleSideOpen(false)"
            ></i>
            <VBreadcrumb></VBreadcrumb>
        </div>
        <div class="header-right">
            <!-- <el-badge is-dot>
        <i class="el-icon-bell fontsize-22 clickable"></i>
      </el-badge> -->
            <div class="user-con">
                <div class="user-avatar">
                    <i class="el-icon-user-solid"></i>
                </div>
                <el-dropdown class="user-name" trigger="hover" @command="handleCommand">
                    <span class="el-dropdown-link">
                        测试用户
                        <em class="el-icon-caret-bottom"></em>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="changePw">修改密码</el-dropdown-item>
                            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <DialogChangePassword :visible.sync="passwordDialogVisible"></DialogChangePassword>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import DialogChangePassword from './DialogChangePassword.vue'
import { jumpToLogin } from '../../router/index.js'
import VBreadcrumb from './VBreadcrumb.vue'

export default {
    components: {
        DialogChangePassword,
        VBreadcrumb,
    },
    data() {
        return {
            passwordDialogVisible: false,
        }
    },
    mounted() {
        this.handleSideOpen(window.innerWidth < 992)

        window.addEventListener('resize', this.handleAutoCollapse)
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleAutoCollapse)
    },
    computed: {
        ...mapGetters(['isCollapse']),
    },
    methods: {
        ...mapActions(['setCollapse']),
        handleSideOpen(flag) {
            this.setCollapse(flag)
        },
        handleCommand(command) {
            if (command == 'loginout') {
                this.handleLogOut()
            } else if (command == 'changePw') {
                this.passwordDialogVisible = true
            }
        },
        handleLogOut() {
            this.$confirm('是否确定退出登录？', '登出提示')
                .then(async () => {
                    this.$message.success('已退出登录')
                    jumpToLogin()
                })
                .catch(err => {
                    console.error(err)
                })
        },
        handleAutoCollapse(e) {
            if (e.target.innerWidth < 992) {
                this.handleSideOpen(true)
            } else {
                this.handleSideOpen(false)
            }
        },
    },
}
</script>

<style lang="scss">
.header-con {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .fontsize-22 {
        font-size: 22px;
    }
    .clickable {
        cursor: pointer;
    }
    .mar-right-20 {
        margin-right: 20px;
    }
    .header-left {
        display: flex;
        align-items: center;
        i {
            color: $header-bg-color-revers;
        }
    }
    .header-right {
        display: flex;
        align-items: flex-end;
        .user-con {
            margin-left: 40px;
            display: flex;
            align-items: center;
            .user-avatar {
                margin-right: 8px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background-color: $header-bg-color-revers;
                display: flex;
                align-items: center;
                justify-content: center;
                i {
                    font-size: 24px;
                    color: $header-bg-color;
                }
            }
            .user-name {
                cursor: pointer;
                color: $header-bg-color-revers;
            }
        }
    }
}
</style>
