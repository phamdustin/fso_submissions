const PrintAllNames = ({filter, people}) => {
 
  if (filter!="") {
    console.log("Filtered output")
    const filterBySearch = people.filter((person) => {
      
      if (person.name.toString().toLowerCase().includes(filter.toLowerCase())) {return person} 
    }) 
    return (
      <div>{filterBySearch.map(person => <main> {person.name} {person.number}</main>)}</div>
    )
  }

  else {
    console.log("NON-Filtered output")
    return (
      <div>{people.map(person => <main> {person.name} {person.number}</main>)}</div>
    )
  }
  

}
export default PrintAllNames