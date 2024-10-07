import http from "@/utils/request";

export const getWarehouse = (params) => {
    //  返回一个promise 对象
    return http.get('/hs/warehouse/getWarehouses',params)
}

export const addWarehouse = (data) => {
    return http.post('/hs/warehouse/saveWarehouse',data)
}

export const updateWarehouse = (data) => {
    return http.post('/hs/warehouse/updateWarehouse',data)
}

export const deleteWarehouse = (data) => {
    return http.post('/hs/warehouse/deleteWarehouse',data)
}