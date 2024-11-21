import commonAPI from "./commonAPI";
import SERVER_URL from "./server_url";



export const addProduct= async (prdct)=>{
    return await commonAPI("POST",`${SERVER_URL}/allProducts`,prdct)
}

export const dplyProduct= async ()=>{
    return await commonAPI("GET",`${SERVER_URL}/allProducts`,"")
}

export const deleteProduct= async (prodId)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/allProducts/${prodId}`,{})
}
