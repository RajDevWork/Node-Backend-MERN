import Card from './components/Card'

const App = () => {
  // Data object with 5 people
  const peopleData = [
    {
      id: 1,
      image: "https://plus.unsplash.com/premium_photo-1661638109410-c7ccce8f0711?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHVzZXJzfGVufDB8fDB8fHww",
      title: "Sarah Johnson",
      description: "Full Stack Developer | React Enthusiast | Coffee Lover"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/flagged/photo-1573740144655-bbb6e88fb18a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJzfGVufDB8fDB8fHww",
      title: "Mike Chen",
      description: "UI/UX Designer | Creative Thinker | Always Learning"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1667127752169-74c7e4d8822f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fHVzZXJzfGVufDB8fDB8fHww",
      title: "Emma Wilson",
      description: "Product Manager | Tech Innovator | Team Builder"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1688989667321-03b336e24a44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA0fHx1c2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Alex Rodriguez",
      description: "Backend Engineer | Cloud Specialist | DevOps Expert"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1643256598535-684358ec557a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE3fHx1c2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
      title: "Lisa Park",
      description: "Data Scientist | AI & ML Enthusiast | Problem Solver"
    }
  ]

  return (
    <div className='container'>
      <h1 className='heading'>Meet Our Team</h1>
      <div className='cardsWrapper'>
        {peopleData.map((person) => (
          <Card
            key={person.id}
            image={person.image}
            title={person.title}
            description={person.description}
          />
        ))}
      </div>
    </div>
  )
}

export default App