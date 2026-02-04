import axios from "axios"
const AddNotes = ({setIsAddNotes,fetchNotes,BASE_URL}) => {

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const {title, description} = e.target.elements;
        console.log("title = ",title.value)
        console.log("description = ",description.value)

        if(title.value ==='' || description.value===''){
            return alert("Empty field detected!")
        }

        await axios.post(`${BASE_URL}/api/notes`,{"title":title.value,"description":description.value})

        fetchNotes()
        title.value = '';
        description.value = '';

    }


  return (
  <div className="bg-gray-300 p-8 rounded">
  <form className="flex items-center gap-3 rounded-2xl" onSubmit={handleSubmit}>

    <input
      type="text"
      name="title"
      placeholder="Title"
      className="flex-1 px-4 py-3 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    <input
      type="text"
      name="description"
      placeholder="Description"
      className="flex-[2] px-4 py-3 rounded-lg bg-gray-200 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
    />

    <button
      type="submit"
      className="px-5 py-2 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition"
    >
      Add
    </button>

    <button
     
     onClick={()=>setIsAddNotes(false)}
      type="button"
      className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition"
    >
      Cancel
    </button>

  </form>
</div>

  )
}

export default AddNotes