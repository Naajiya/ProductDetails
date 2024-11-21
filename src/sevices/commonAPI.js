
import axios from "axios"

const commonAPI = async (httpmethod, url, reqbody) => {
    

    const reqConfig = {
        method: httpmethod,
        url, // same as url:url (if the key and value are same)
        data: reqbody
    }


    //return to axios(where we can call)

    return await axios(reqConfig).then(res => {
        return res  
    }).catch(err => {
        return err
    })


}

export default commonAPI