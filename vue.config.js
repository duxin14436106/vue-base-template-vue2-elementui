// 多端代理转发到对应的来源IP本地服务 -- 白名单机制
const multipleClientProxy = useMultipleClientProxy()

module.exports = {
    //是否为生产环境生成sourceMap
    productionSourceMap: process.env.NODE_ENV !== 'production',
    configureWebpack: config => {
        // 解决 element-ui 中icon 在 dart-sass 乱码的问题
        config.module.rules
            .filter(rule => {
                return rule.test.toString().indexOf('scss') !== -1
            })
            .forEach(rule => {
                rule.oneOf.forEach(oneOfRule => {
                    oneOfRule.use.splice(oneOfRule.use.indexOf(require.resolve('sass-loader')), 0, {
                        loader: require.resolve('css-unicode-loader'),
                    })
                })
            })
    },
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = process.env.VUE_APP_HTML_TITLE
            return args
        })
    },
    publicPath: './',
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/theme/index.scss"`,
            },
            scss: {
                prependData: `@import "~@/theme/index.scss";`,
            },
        },
    },
    devServer: {
        port: '8070', // 端口号
        https: false, // https: {type:Bollean}
        open: false, // 配置自动启动浏览器
        // 配置代理
        proxy: {
            [multipleClientProxy.DEV_API_KEY]: {
                // target: 'https://openapi.vvtech.tech/oms/web/cms',
                target: 'https://dms.vvtech.tech/dms', //测试地址
                // target: 'http://192.168.1.77:8105/dms', //贺峰
                changeOrigin: true,
                pathRewrite: multipleClientProxy.pathRewrite,
                router: multipleClientProxy.router,
            },
        },
    },
}

// 多端代理， 哪个客户端请求， 转发到那个客户端服务， 针对白名单用户， 非白名单用户走正常代理流程
function useMultipleClientProxy() {
    const DEV_API_KEY = process.env.VUE_APP_REQUEST_URL || '/api'
    const base = '/dms'
    const port = '8105'
    const acceptIps = ['192.168.1.77', '192.168.1.183', '192.168.1.144']

    // 路由重写
    function pathRewrite(path, req) {
        const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
        if (acceptIps.indexOf(ip) >= 0) {
            return path.replace(DEV_API_KEY, base)
        }
        return path.replace(DEV_API_KEY, '')
    }

    // 路由转发
    function router(req) {
        const ip = req.ip.match(/\d+\.\d+\.\d+\.\d+/)[0]
        if (acceptIps.indexOf(ip) >= 0) {
            console.log('白名单IP:', ip)
            return `${req.protocol}://${ip}:${port}`
        }
        return
    }

    return {
        DEV_API_KEY,
        pathRewrite,
        router,
    }
}
