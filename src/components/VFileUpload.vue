<template>
    <div class="file-upload">
        <el-upload
            class="upload-inner"
            drag
            list-type="picture-card"
            :show-file-list="false"
            :accept="accept"
            action="#"
            :on-change="handleUploadChange"
            :auto-upload="false"
        >
            <div class="default-con">
                <el-image
                    v-show="value && !isShowIFrame"
                    ref="showImage"
                    :preview-src-list="[value]"
                    :src="value"
                    style="width: 100%; height: 100%"
                ></el-image>
                <i v-show="!value" ref="fileUploadBtn" class="el-icon-plus"></i>
            </div>
        </el-upload>
        <div v-if="value && isShowIFrame" class="iframe-con">
            <iframe
                v-if="!isIE"
                :src="value"
                frameborder="0"
                style="width: 100%; height: 100%"
            ></iframe>
            <i v-if="isIE" class="el-icon-document ie-iframe-icon"></i>
        </div>
        <div v-if="value" class="file-upload__mask">
            <!--上传和预览 -->
            <i v-if="!viewer" class="el-icon-upload2" @click="handleUpload"></i>
            <i class="el-icon-view" @click="handleView"></i>
        </div>

        <el-dialog :visible.sync="iFramePreview" title="预览" width="800px" append-to-body>
            <iframe :src="value" frameborder="0" style="width: 100%; height: 600px"></iframe>
        </el-dialog>
    </div>
</template>

<script>
import { computed, defineComponent, ref, toRef } from 'vue'
import { Message, MessageBox } from 'element-ui'
export default defineComponent({
    props: {
        value: {
            type: String,
            default: '',
        },
        max: {
            type: Number,
            default: -1,
        },
        accept: {
            type: String,
            default: '',
        },
        viewer: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, { emit }) {
        const value = toRef(props, 'value')
        const max = toRef(props, 'max')
        const accept = toRef(props, 'accept')

        const showImage = ref(null)
        const fileUploadBtn = ref(null)
        //			const showMask = ref(false)
        const iFramePreview = ref(false)

        // 除了图片类型，其他都显示iframe
        const isShowIFrame = computed(() => {
            //				showMask.value = value.value
            return !/\.(png|PNG|jpg|JPG|jpeg|JPEG|gif|GIF|bmp|webp|psd|tif|ico)$/.test(value.value)
        })

        // 判断是否是IE
        const isIE = ref(false)
        useBrowser(isIE)

        const handleUploadChange = file => {
            // 校验文件类型
            const arr = accept.value.split(',')
            let flag = false
            for (let i = 0; i < arr.length; i++) {
                const re = new RegExp(`${arr[i]}$`)
                if (re.test(file.name.toLowerCase())) {
                    flag = true
                }
            }

            if (!flag) {
                Message.error(`不能上传非${accept.value}之外的文件类型`)
                return
            }
            //限制大小
            if (max.value > -1 && file.size > max.value * 1024 * 1024) {
                Message.error(`图片大小不能超过 ${max.value} M`)
                return
            }

            //				showMask.value = true;

            emit('update:value', file.url)

            emit('change', file.raw)
        }
        const handleUpload = () => {
            fileUploadBtn.value.click()
        }
        const handleView = () => {
            if (isIE.value && isShowIFrame.value) {
                MessageBox.confirm('您的浏览器不支持预览，请点击确定下载', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        window.open(value.value)
                    })
                    .catch(() => {
                        //
                    })
                return
            }

            if (isShowIFrame.value) {
                iFramePreview.value = true
            } else {
                showImage.value.clickHandler()
            }
        }

        return {
            isIE,
            isShowIFrame,
            iFramePreview,
            //				showMask,
            showImage,
            fileUploadBtn,
            handleUploadChange,
            handleUpload,
            handleView,
        }
    },
})

function useBrowser(isIE) {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        isIE.value = true
    }
}
</script>

<style lang="scss">
.file-upload {
    width: 100%;
    height: 100%;
    position: relative;
    .upload-inner {
        width: 100%;
        height: 100%;
        .el-upload {
            width: 100%;
            height: 100%;
        }
        .el-upload-dragger {
            width: 100%;
            height: 100%;
            border: none;
            position: relative;
        }
    }
    .default-con {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 40px;
            color: #999;
        }
    }
    .iframe-con {
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        .ie-iframe-icon {
            font-size: 40px;
            color: #999;
        }
    }
    .file-upload__mask {
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: rgba($color: #000000, $alpha: 0.7);
        z-index: 88;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
            font-size: 24px;
            color: rgba($color: #fff, $alpha: 0.8);
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            &:hover {
                color: #409eff;
            }
        }
    }
}
</style>
