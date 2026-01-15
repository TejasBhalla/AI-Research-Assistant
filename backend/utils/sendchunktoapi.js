import axios from 'axios'

export const sendChunkToApi = async(chunks)=>{
    try{
    const response = await axios.post('http://localhost:8000/embed',{
        chunks:chunks
    })
    console.log("Embedding response:", response.data);
    return response.data;
    }catch(error) {
        
        throw error
    }
}