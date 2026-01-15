import axios from 'axios'
export const getTopContext = async (question) =>{
    const res= await axios.post('http://localhost:8000/query',{
        query:question,
        top_k:5
    })
    const result =res.data
    return result

}