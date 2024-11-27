const PrintCountries = (props) => {
    if (!props.countriesList || props.filter==="") {
        return ""
    }
    if (props.countriesList.length > 11){
        return <div>Too many matches, specify another filter</div>
    }
    
    if (props.countriesList.length === 1) {
        return (
            <div> 
                <h1>{props.countriesList[0].name.common}</h1>
                <ul>capital {props.countriesList[0].capital} </ul>
                <ul>area {props.countriesList[0].area}</ul>
                <h3>languages:</h3>
                {Object.values(props.countriesList[0].languages).map((language,index) => <li key={index}>{language}</li>)}
                <img src={props.countriesList[0].flags.png} alt="new"/>
            </div>
        )
    }
    return (
        <div>{props.countriesList.map(country => <main>{country.name.common}</main>)}</div>
    )
}
export default PrintCountries