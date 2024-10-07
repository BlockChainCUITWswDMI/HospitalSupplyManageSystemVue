import http from "@/utils/request";

export const getSupplier = (params) => {
    //  返回供应商列表对象
    return http.get('/hs/supplier/getSuppliers',params)
}

export const addSupplier = (data) => {
    return http.post('/hs/supplier/saveSupplier',data)
}

export const updateSupplier = (data) => {
    return http.post('/hs/supplier/updateSupplier',data)
}

export const delSupplier = (data) => {
    return http.post('/hs/supplier/deleteSupplierfromwhitelist',data)
}