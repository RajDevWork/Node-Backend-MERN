import axios from 'axios';
const DisplayNotes = ({allnotes,fetchNotes,BASE_URL,setEditNotes,setNoteDesc,setNoteId}) => {

    const toIST = (date) => {
        return new Date(date).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
        })
        }
    const handleDeleteNote = async(id)=>{
        await axios.delete(`${BASE_URL}/api/notes/${id}`)
        fetchNotes()
        setEditNotes(false)
        setNoteDesc('')
        setNoteId('')
    }
    const handleEditNote = async(id)=>{

            const note = await axios.get(`${BASE_URL}/api/notes/${id}`)
            
            // console.log("note data = ",note.data.note.description)


            setNoteDesc(note.data.note.description)
            setEditNotes(true)
            setNoteId(id)
    }


  return (
    <div className='flex flex-wrap gap-3'>
            {
                allnotes.map((elm)=>{
                    return <div key={elm._id} className='px-3 py-5 bg-amber-50 text-gray-900 rounded-xl flex flex-col justify-between'>
                                <h1 className='text-xl font-bold'>{elm.title}</h1>
                                <p className='text-md font-light text-gray-700 py-3 pl-1'>{elm.description}</p>
                                <div className='flex justify-between gap-5'>
                                <p className='text-md flex flex-col justify-between gap-2'><span className='text-sm'>Create At :</span> <span className='text-xs bg-gray-200 px-2 py-0.5 rounded-full'>{toIST(elm.createdAt)}</span></p>
                                <p className='text-md flex flex-col justify-between gap-2'><span className='text-sm'>Updated At :</span> <span className='text-xs bg-gray-200 px-2 py-0.5 rounded-full'>{toIST(elm.updatedAt)}</span></p>
                                </div>
                                <div className='flex gap-2 pt-3'>
                                    <button className='px-3 py-1 bg-blue-400 rounded-md text-white cursor-pointer active:scale-95' onClick={()=>handleEditNote(elm._id)}>Edit</button>
                                    
                                    <button onClick={()=>handleDeleteNote(elm._id)} className='px-3 py-1 bg-red-400 rounded-md text-white cursor-pointer active:scale-95'>Delete</button>
                                </div>

                    </div>
                })
            }
    </div>
  )
}

export default DisplayNotes