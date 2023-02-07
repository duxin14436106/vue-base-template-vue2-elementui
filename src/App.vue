<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
* {
    font-size: 14px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
}

html,
body,
#app {
    width: 100%;
    height: 100%;
}

#app {
    display: flex;
}

/**重置 dialog 整体样式 */
.el-dialog {
    border-radius: 8px !important;
    overflow: hidden;
    .el-dialog__header {
        background-color: $--color-primary;
        padding-bottom: 15px;
        padding-top: 15px;
        .el-dialog__headerbtn {
            top: 18px;
            .el-dialog__close {
                color: rgba($color: #ffffff, $alpha: 0.7);
            }
            &:hover {
                .el-dialog__close {
                    color: #fff;
                }
            }
        }
    }
    .el-dialog__title {
        color: #fff;
    }
}

.el-tooltip__popper.is-dark {
    max-width: 800px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type='number'] {
    -moz-appearance: textfield;
}

.el-table__row {
    height: 60px;
}
</style>
