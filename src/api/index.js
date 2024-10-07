import http from "@/utils/request";

export const login = (data) => {
    return http.post('/hs/system/login',data)
}

export const getVerifiCodeImage = async (data) => {
    return http.get('/hs/system/getVerifiCodeImage', data)
}
