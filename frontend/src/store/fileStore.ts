import {create} from 'zustand'
import axios from 'axios'

export const useUploadStore = create((set)=>({
    uploadedfiles:[],
    questions:[],
    answers:[],
    isuploading:false,
    adduploadedfiles: async (files)=>{
        set({isuploading:true})
        const formData = new FormData()
        files.forEach((file)=>formData.append('files',file))
        const res= await axios.post('http://localhost:3000/api/upload',formData,{
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        set((state)=>({uploadedfiles:[...state.uploadedfiles,...files],isuploading:false}))

    },
    clearuploadedfiles: async ()=>{
        await axios.delete('http://localhost:3000/api/upload/clear')
        set({uploadedfiles:[]})
    },
    askquestion: async (question) =>{
        set({isuploading:true})
        const res = await axios.post('http://localhost:3000/api/qa/ask',{question})
        set((state)=>({questions:[...state.questions,question],answers:[...state.answers,res.data],isuploading:false}))

    },
           
}))

