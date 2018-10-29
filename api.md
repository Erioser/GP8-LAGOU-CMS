
### 拉钩网管理系统接口api文档

> version v1.0, 前缀：/api/v1/

#### 职位信息接口

> 前缀: /position

1. 职位列表查询

url: '/list' || /listall

method: GET

params: 

    pageNo = 1, pageSize = 10

response:

    status: 200 | 304 | 404 ...

    data: 数据

        city 城市
        positionName 职位名称...

2. 添加职位

url: '/save'

method: POST

params: 

    city string required... ; companyName ; positionName ; salary （form-data）

response:

    status: 200 | 304 | 404 ...

    data: 'ok' || 'fail'


3. 删除职位

url: '/remove'

method: get

params: 

    id required querystring

response:

    status: 200 | 304 | 404 ...

    data: 'ok' || 'fail'


