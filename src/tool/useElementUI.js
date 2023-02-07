import Vue from 'vue'
import {
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tree,
    Alert,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Steps,
    Step,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    PageHeader,
    Loading,
    MessageBox,
    Message,
    Notification,
    Result,
    Scrollbar,
    Image,
    Empty,
    Cascader,
    CascaderPanel,
    Tag,
    DescriptionsItem,
    Descriptions,
} from 'element-ui'

import '@/theme/element-variables.scss'
import { isType } from './helper'

const componentsList = [
    DescriptionsItem,
    Descriptions,
    Scrollbar,
    Pagination,
    Dialog,
    Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Switch,
    Select,
    Option,
    OptionGroup,
    Button,
    ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    TimeSelect,
    TimePicker,
    Popover,
    Tooltip,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    Tree,
    Alert,
    Icon,
    Row,
    Col,
    Upload,
    Progress,
    Spinner,
    Badge,
    Steps,
    Step,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Timeline,
    TimelineItem,
    Link,
    Divider,
    PageHeader,
    Result,
    Image,
    Empty,
    Cascader,
    CascaderPanel,
    Tag,
]

componentsList.forEach(component => {
    Vue.use(component)
})

Vue.use(Loading.directive)

//  修改element ui的全局配置
Vue.prototype.$ELEMENT = { size: 'medium' }

Vue.prototype.$loading = Loading.service
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification

// 重置message， 同一时间只出现一个
let messageInstance = null
export const resetMessage = options => {
    if (messageInstance) {
        messageInstance.close()
    }
    messageInstance = Message(options)
}
;['error', 'success', 'info', 'warning'].forEach(type => {
    resetMessage[type] = options => {
        if (isType(options, 'String')) {
            options = {
                message: options,
            }
        }
        options.type = type
        return resetMessage(options)
    }
})

Vue.prototype.$message = resetMessage
