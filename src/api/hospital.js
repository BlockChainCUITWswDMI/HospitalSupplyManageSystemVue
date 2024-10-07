import http from "@/utils/request";

export const getHospital = (params) => {
    //  返回供应商列表对象
    return http.get('/hs/hospital/selectHospital',params)
}

export const getAllHospital = (params) => {
    //  返回供应商列表对象
    return http.get('/hs/hospital/selectAllHospital',params)
}

export const addHospital = (data) => {
    return http.post('/hs/hospital/saveHospital',data)
}

export const updateHospital = (data) => {
    return http.post('/hs/hospital/updateHospital',data)
}