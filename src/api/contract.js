import http from "@/utils/request";

export const getContracts = (params) => {
    //  返回供应商列表对象
    return http.get('/hs/contract/getContrastShowModel',params)
}

export const getSUpplierContracts = (params) => {
    //  返回供应商列表对象
    return http.get('/hs/contract/getSupplierContrastShowModel',params)
}

export const addContract = (data) => {
    return http.post('/hs/contract/saveContract',data)
}

export const addOrderId = (data) => {
    return http.post('/hs/contract/addOrderId', data);
}
