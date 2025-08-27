import axios from "axios";

export const API_BASE_URL = "http://localhost:8081/api/khotbas";

export const fetchFilteredKhotbas=async(mosqueId?:number,language?:string,type?:string,page:number=0,size:number=10)=>{
 try{
    const params=new URLSearchParams();
    if(!mosqueId){
        throw new Error('mosqueId is required');
    }
    if(language){
        params.append('khotbaLanugage',language);
    }
    if(type){
        params.append('khotbaType',type);
    }
    params.append('mosqueId',mosqueId.toString());
    params.append('page',page.toString());
    params.append('size',size.toString());
    const url=`${API_BASE_URL}/filter?${params.toString()}`;
    const response=await axios.get(url);
    return response.data;
    
 }catch(error){
    console.error('Error fetching filtered khotbas:', error);
    throw error;
 }
}