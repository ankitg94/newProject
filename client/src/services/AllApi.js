import axiosInstance from "./AxiosInstance"

export const getAllCaterory = async()=>{
    try{
    const res =await axiosInstance.get('/cat/getAll')
    return res
    }catch(error){
      return error
    }
}

export const getAllProduct = async()=>{
    try{
        const res = await axiosInstance.get("/product/getall")
        return res
    }catch(error){
        return error
    }
}
export const getSingleProduct = async(id)=>{
    try{
        const res =await axiosInstance.get(`product/getSingle/${id}`)
        return res

    }catch(error){
        return error
    }
}
export const  searchProduct =async(key)=>{
    try{
    const res =await axiosInstance.get(`product/searchproduct/${key}`)
    return res  

    }catch(error){
        return error
    }

}

export const Register =async(data)=>{
    try{
        const res =await axiosInstance.post("/auth/register",data)
        return res

    }catch(error){
        return error
    }
}
export const Login =async(data)=>{
    try{
        const res =await axiosInstance.post("/auth/login",data)
        return res

    }catch(error){
        return error
    }
}
export const userDetails =async()=>{
    const res =await axiosInstance.get("/auth/userdetails")
    return res
}
export const logout =async()=>{
    try{
    const res =await axiosInstance.post("/auth/logout")
      return res


    }catch(error){
        return error
    }
}

export const sellerProduct =async()=>{
    try{
        const res =await axiosInstance.get("/product/getSellerProduct")
        return res
    }
    catch(error){
        return error
    }
}

export const deleteProduct =async(id)=>{
    try{
    const res =await axiosInstance.delete(`/product/delete/${id}`)
    return res

    }catch(error){
        return error
    }
}
export const createProduct =async(data)=>{
    try{
        const res =await axiosInstance.post("/product/create",data, {
            headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
        )
        return res
    
        }catch(error){
            return error
        }
}

export const updateProduct = async(id,data)=>{
    try{
    const res =await axiosInstance.put(`/product/update/${id}`,data)
    return res 
    }catch(error){
        return error
    }
}