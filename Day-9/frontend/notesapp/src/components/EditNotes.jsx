import React from 'react'
import axios from "axios"
const EditNotes = ({setEditNotes,fetchNotes,BASE_URL,setNoteDesc,NoteDesc,NoteId}) => {

    const handleEditSubmit = async(e)=>{
        e.preventDefault();
        await axios.patch(`${BASE_URL}/api/notes/${NoteId}`,{description:NoteDesc})
        fetchNotes()
    }


  return (
    <div className="bg-gray-300 p-8 rounded">
  <form className="flex items-center gap-3 rounded-2xl" onSubmit={handleEditSubmit}>

    <p className='text-black text-lg font-semibold'>Edit Description: </p>
    <input
      type="text"
      name="description"
      value={NoteDesc}
      onChange={(e)=>setNoteDesc(e.target.value)}
      placeholder="Description"
      className="flex-[2] px-4 py-3 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    <button
      type="submit"
      className="active:scale-95 cursor-pointer px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
    >
      Apply Changes
    </button>

    <button
     
     onClick={()=>setEditNotes(false)}
      type="button"
      className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition cursor-pointer active:scale-95 "
    >
      Cancel
    </button>

  </form>
</div>
  )
}

export default EditNotes