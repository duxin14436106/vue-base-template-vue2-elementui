<script>
import { mapGetters } from 'vuex'
export default {
    name: 'MenuItem',
    props: {
        route: {
            type: Array,
            default() {
                return []
            },
        },
        collapse: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        handleMenuSelect(index) {
            // 防止重复点击， vue-router报重复跳转的警告
            if (this.$router.currentRoute.path == index) {
                return
            }

            this.$router.push(index)
        },
        genRouteList(route) {
            return route.reduce((pre, cur) => {
                if (cur.children && cur.children.length) {
                    pre.push(...this.genRouteList(cur.children))
                } else {
                    pre.push(cur)
                }
                return pre
            }, [])
        },
    },
    computed: {
        ...mapGetters(['isCollapse']),
        onRoutes() {
            // 逐级递减， 查找是否存在对应的菜单， 存在则返回对应菜单的url， 让其在菜单列表选中
            const menuPathArr = this.$router.currentRoute.path.split('/')
            menuPathArr.shift()
            while (menuPathArr.length) {
                const path = '/' + menuPathArr.join('/')
                const route = this.routeList.find(item => item.routeUrl == path)
                if (route) {
                    return route.routeUrl
                }
                menuPathArr.pop()
            }
            return ''
        },
        routeList() {
            return this.genRouteList(this.route)
        },
    },
    render() {
        const menuItem = data => {
            return data.map(child => {
                if (child.children.length) {
                    return (
                        <el-submenu index={child.routeUrl} key={child.id}>
                            <template slot="title">
                                <i class={child.icon + ' v-menu-icon'}></i>
                                <span class="menu-item-title" slot="title">
                                    {child.name}
                                </span>
                            </template>
                            {menuItem(child.children)}
                        </el-submenu>
                    )
                } else {
                    return (
                        <el-menu-item
                            index={child.routeUrl}
                            key={child.id}
                            class={child.icon == '' ? 'menu-item-child' : ''}
                        >
                            <i class={child.icon + ' v-menu-icon'}></i>
                            <span
                                class={
                                    child.icon == '' ? 'menu-item-child-title' : 'menu-item-title'
                                }
                                slot="title"
                            >
                                {child.name}
                            </span>
                        </el-menu-item>
                    )
                }
            })
        }

        return (
            <el-menu
                class="sidebar-el-menu"
                collapse={this.isCollapse}
                default-active={this.onRoutes}
                vOn:select={this.handleMenuSelect.bind(this)}
                unique-opened={true}
            >
                {menuItem(this.route)}
            </el-menu>
        )
    },
}
</script>
<style lang="scss">
.sidebar-el-menu {
    border: none;
    background-color: $--color-primary !important;
    &:not(.el-menu--collapse) {
        width: 250px;
    }
    .v-menu-icon {
        color: $color-menu-text-color;
    }
    .el-menu {
        color: $color-menu-text-color;
        background-color: $color-child-menu;
        .el-menu-item {
            color: $color-menu-text-color;
            background-color: $color-child-menu;
        }
    }
    .el-submenu__icon-arrow {
        color: $color-menu-text-color;
    }
    .el-submenu__title,
    .el-menu-item,
    .el-submenu {
        background-color: $--color-primary;
        color: $color-menu-text-color;
    }
    .menu-item-child {
        padding-left: 50px !important;
        background-color: $color-child-menu !important;
        &:hover,
        &:active {
            background-color: $color-select-menu !important;
        }
    }
    .menu-item-title {
        font-size: 16px;
        color: $color-menu-text-color;
    }
    .menu-item-child-title {
        font-size: 14px;
    }
}
// 菜单选中效果，由于折叠后， 菜单子项不在 sidebar-el-menu 范围内， 固设置全局
.el-menu-item.is-active {
    background-color: $color-select-menu !important;
    position: relative;
    color: $color-menu-text-color;
    &::after {
        content: ' ';
        // width: 4px;
        height: 100%;
        // background-color: #fff;
        position: absolute;
        right: -1px;
        top: 0px;
        // border-top-left-radius: 4px;
        // border-bottom-left-radius: 4px;
    }
}
.el-menu {
    background-color: $--color-primary;
    i {
        color: $color-menu-text-color;
    }
    .menu-item-child,
    .menu-item-title {
        color: $color-menu-text-color;
    }
}
.el-menu-item:hover,
.el-menu-item:focus {
    background-color: $color-select-menu !important;
}
</style>
