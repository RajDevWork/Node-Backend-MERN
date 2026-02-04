import { useEffect, useState } from "react"
import AddNotes from "./components/AddNotes"
import DisplayNotes from "./components/DisplayNotes"
import { BASE_URL } from "./config"
import axios from "axios"
import EditNotes from "./components/EditNotes"
const App = () => {

  const [IsAddNotes, setIsAddNotes] = useState(false)
  const [IsEditNotes, setEditNotes] = useState(false)
  const [NoteDesc, setNoteDesc] = useState('')
  const [NoteId, setNoteId] = useState('')
  const [AllNotes, setAllNotes] = useState([])
  
  
  async function fetchNotes(){
    const notes = await axios.get(`${BASE_URL}/api/notes`)
    const allnotes = notes.data.notes
    setAllNotes(allnotes)
  }

  useEffect(() => {
    fetchNotes()
  
  }, [])
  

  return (
    <div className="p-5 w-full h-screen flex flex-col">
        
        <div className="py-5">
            {
            IsEditNotes
            ? <EditNotes NoteDesc={NoteDesc} setNoteDesc={setNoteDesc} NoteId={NoteId} setEditNotes={setEditNotes} fetchNotes={fetchNotes} BASE_URL={BASE_URL}/>
            : IsAddNotes 
                  ? <AddNotes setIsAddNotes={setIsAddNotes} fetchNotes={fetchNotes} BASE_URL={BASE_URL}/>
                  : <button  onClick={()=>setIsAddNotes(true)} className="px-3 py-2 text-sm font-semibold bg-amber-500 rounded-lg cursor-pointer active:scale-95">Add Note</button>
          }
        </div>
        <div className="flex-1 pt-5">
            <DisplayNotes setNoteDesc={setNoteDesc} setNoteId={setNoteId} allnotes={AllNotes} setEditNotes={setEditNotes} fetchNotes={fetchNotes} BASE_URL={BASE_URL}/>
        </div>
    </div>
  )
}

export default App