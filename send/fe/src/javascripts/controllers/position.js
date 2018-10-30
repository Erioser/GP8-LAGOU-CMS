import { bus, handleToastByData } from '../util'
// 职位列表视图
import position_list_template from '../views/position-list.html'
// 添加职位视图
import position_save_template from '../views/position-save.html'
// 修改职位视图
import position_update_template from '../views/position-update.html'
// model
import position_model from '../models/position'

import qs from 'querystring'


// 列表视图的控制器
const list = async (req, res, next) => {
    req.query = req.query || {} // 防止没有参数的时候，req.query为null
    
    let _page = { // 页面信息， 当点击了分页器按钮后，页面url就会变化，然后list控制器就会重新执行，重新获取数据再渲染
        pageNo: req.query.pageNo || 1,
        pageSize: req.query.pageSize || 10,
        search:  req.query.search
    }

    // 编译模板 
    let html = template.render(position_list_template, {
        data: (await position_model.list(_page)).data // 获取到列表数据
    })
    res.render(html)
    bindListEvent(_page)// 给添加按钮绑定事件
    // 显示搜索关键字
    $('.position-list #keywords').val(_page.search)
}

// list的事件绑定
const bindListEvent = (_page) => {
    // 添加按钮点击跳转到添加路由
    $('.position-list #addbtn').on('click', function () {
        bus.emit('go','/position-save')
    })
    $('.position-list .pos-update').on('click', function () {
        let id = $(this).parents('tr').data('id')
        bus.emit('go','/position-update', { id })
    })
    $('.pos-remove').on('click', function () {
        handleRemovePosition.call(this, _page)
    })

    $('.position-list #possearch').on('click', function () {
        let _search = $('.position-list #keywords').val()
        // 重新刷新路由 ，注意，页码回复到1
        let _params = {
            search: _search,
            pageNo: 1
        }
        bus.emit('go',`/position-list?${$.param(_params)}`)
    })
}
// 删除操作
const handleRemovePosition = async function (_page)  {
    let id = $(this).parents('tr').data('id')
    let _data = await position_model.remove({id: id, ..._page})
    // 如果此页种只有一条数据，说明删除之后需要跳转到前一页 
    // 删除的时候此页还有多少条数据
    // 如果只剩一个，将pageNo-1 
    handleToastByData(_data, {
        isReact: false,
        success: (data) => {
            // 删除成功后，i依然需要将pageNo带上，否则，删除后，重新渲染的时候会回到默认的第一页
            let _pageNo = _page.pageNo
            _pageNo -= data.isBack ? 1 : 0
            bus.emit('go', '/position-list?pageNo='+_pageNo+'&_='+data.deleteId + '&search='+(_page.search || ''))
        }
    })
}

// save视图的控制器
const save = async (req, res, next) => { 
    res.render(position_save_template)
    bindSaveEvent()
}

// save的事件绑定
const bindSaveEvent = () => {
    // 返回按钮逻辑
    $('.position-save #back').on('click', function () {
        bus.emit('go', '/position-list')
    })
    $('.position-save #save-form').submit(handleSaveSubmit)
}

// 开关防止多次提交
let _isLoading = false
const handleSaveSubmit = async function (e) {
    
    e.preventDefault()

    if ( _isLoading ) return false;
    _isLoading = true
    // 拿到form的数据
    // let _params = qs.parse($(this).serialize())
    let result = await position_model.save()
    _isLoading = false
    handleToastByData(result)
    // handleToastByData(result, { isReact: false, success: () => {
    //     bus.emit('go', '/position-list')
    // }})
}


const update = async (req, res) => {
    let { id } = req.body// 要更新的数据的id
    // 获取id对应的数据进行渲染
    let html = template.render(position_update_template, {
        data: (await position_model.listone({ id })).data // 获取到列表数据
    })
    res.render(html)
    bindUpdateEvent()
}

const bindUpdateEvent = () => {
    // 返回按钮逻辑
    $('.position-update #back').on('click', function () {
        bus.emit('go', '/position-list')
    })

    $('.position-update #update-form').submit(handleUpdateSubmit)
}

const handleUpdateSubmit = async function (e) {
    e.preventDefault();
    // let _datastr = $(this).serialize()
    // let _data = qs.parse(_datastr)
    let _results = await position_model.update()  
    handleToastByData(_results)
}


export default {
    list,
    save,
    update
}

// bind之后，如果第一个参数传的是null，this指向会变成window