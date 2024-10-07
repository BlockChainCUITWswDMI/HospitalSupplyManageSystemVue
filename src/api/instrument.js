import http from "@/utils/request";

export const getInstrument = (params) => {
    return http.get('/hs/instrument/getInstrument',params)
}

export const addInstrument = (data) => {
    return http.post('/hs/instrument/saveInstrument',data)
}

export const updateInstrument = (data) => {
    return http.post('/hs/instrument/updateInstrument',data)
}

export const deleteInstrument = (data) => {
    return http.post('/hs/instrument/deleteInstrument',data)
}
