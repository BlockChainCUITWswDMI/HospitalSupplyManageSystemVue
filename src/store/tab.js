import Cookie from "js-cookie"
export default {
    state: {
        isCollapse: false, // 控制菜单展开|收起
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home'
            },   
        ],
        menu: []
    },
    mutations: {
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            console.log(val, 'val')
            if (val.name !== 'home') {
                const index = state.tabsList.findIndex(item => item.name === val.name)
                // 如果不存在
                if (index === -1) {
                    state.tabsList.push(val)
                }
            }
        },
        closeTag(state, item){
            console.log(item,'item')
            const index = state.tabsList.findIndex(val => val.name === item.name)
            state.tabsList.splice(index, 1)
        },
        setMenu(state, val){
            state.menu = val
            Cookie.set('menu',JSON.stringify(val))
        },
        //  动态注册路由
        addMenu(state, router){
            if (!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 动态路由的数据
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => import(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }   
            });
            console.log(menuArray, 'menuArray')
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        }
    }
}