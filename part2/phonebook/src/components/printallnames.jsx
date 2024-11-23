const PrintAllNames = ({people}) => {
    return (
      <div>{people.map(person => <main> {person.name} {person.number}</main>)}</div>
    )
}
export default PrintAllNames