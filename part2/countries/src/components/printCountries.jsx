import {useState} from 'react'

const ShowDetails = ({details}) => {
    if (!details){return }
    console.log(`ShowDetails has been clicked for ${details.name.common}`)
    return (
        <div>
            <h1>{details.name.common}</h1>
            <ul>capital {details.capital} </ul>
            <ul>area {details.area}</ul>
            <h3>languages:</h3>
            {Object.values(details.languages).map((language,index) => <li key={index}>{language}</li>)}
            <img src={details.flags.png} alt="new"/>
        </div>  
    )
}

const PrintCountries = (props) => {
    const [details,setDetails] =useState('')

    const detailsHandler = (event,country) => {
        console.log(`detailsHandler has been clicked for ${country.name.common}`)
        setDetails(country)
    }

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
        <div>
            {props.countriesList.map(country => 
                <main>{country.name.common}
                    <button country={country} onClick={(e) => {detailsHandler(e,country)}}>show</button>
                    <ShowDetails details={details}/>
                    </main>)}
            
            
            
        </div>
    )
}
export default PrintCountries