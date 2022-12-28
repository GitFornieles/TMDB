const GridWord =({element})=>{
    return <span className="detailResourceWord" id={element.id} key={element.id}>
        <span>{element.name}</span>
    </span>
}

export default GridWord