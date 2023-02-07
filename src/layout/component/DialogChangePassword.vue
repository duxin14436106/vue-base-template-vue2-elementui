<template>
    <el-dialog
        v-loading="loading"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="600px"
        title="修改密码"
        :visible="visible"
        @close="handleCancel"
    >
        <el-form
            ref="form"
            :rules="rules"
            label-position="top"
            :model="form"
            label-width="80px"
            class="rule-form"
        >
            <el-form-item label="原密码" prop="originPassword">
                <el-input
                    v-model.trim="form.originPassword"
                    :clearable="true"
                    show-password
                    type="password"
                    placeholder="请输入原密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input
                    v-model.trim="form.newPassword"
                    :clearable="true"
                    show-password
                    type="password"
                    placeholder="请输入新密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input
                    v-model.trim="form.confirmPassword"
                    :clearable="true"
                    show-password
                    type="password"
                    placeholder="请输入确认密码"
                ></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">取 消</el-button>
            <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { passwordRegExp } from '@/tool/validate.js'
import { jumpToLogin } from '../../router/index.js'
import { mapGetters } from 'vuex'
export default {
    props: {
        visible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            form: {
                originPassword: '',
                newPassword: '',
                confirmPassword: '',
            },
            loading: false,
            rules: {
                originPassword: [
                    {
                        required: true,
                        message: '请输入旧密码',
                        trigger: 'blur',
                    },
                ],
                newPassword: [
                    {
                        required: true,
                        message: '请输入新密码',
                        trigger: 'blur',
                    },
                    {
                        validator: passwordRegExp().rule,
                        trigger: 'blur',
                    },
                ],
                confirmPassword: [
                    {
                        required: true,
                        message: '请输入确认密码',
                        trigger: 'blur',
                    },
                    {
                        validator: (rule, value, callback) => {
                            if (value !== this.form.newPassword) {
                                return callback(new Error('确认密码与新密码不一致'))
                            }
                            callback()
                        },
                        trigger: 'blur',
                    },
                ],
            },
        }
    },
    computed: {
        ...mapGetters(['userId']),
    },
    methods: {
        handleCancel() {
            this.$refs['form'].resetFields()
            this.$emit('update:visible', false)
        },
        handleSubmit() {
            this.$refs['form'].validate(async isPass => {
                if (isPass) {
                    try {
                        this.loading = true
                        this.$message.success('密码修改成功，请重新登录')
                        jumpToLogin()
                    } catch (error) {
                    } finally {
                        this.loading = false
                    }
                }
            })
        },
    },
}
</script>

<style lang="scss">
.rule-form {
    padding: 0 20px;
    .el-form-item__label {
        padding: 0;
    }
}
</style>
