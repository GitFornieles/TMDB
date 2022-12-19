const SideBar=()=>{
  const options=["Top10","Top20","Top50","Generos"]
    return (
        <div className="sidebarClase">
          <h4>Advanced Search (N/A)</h4>
          <form>
            <label htmlFor="type">Tipo</label>
            <select name="type" id="type" disabled>
              <option value="tv">TV Show</option>
              <option value="movie">Movie</option>
            </select>
            <label htmlFor="type">Genres</label>
            <select name="genres" id="genres" disabled>
              <option value="tv"></option>
              {/* {mapeo con los géneros disponibles, select múltiple} */}
            </select>
            <label htmlFor="keywords">Keywords</label>
            <input name="keywords" disabled></input>
            <label htmlFor="cast">Cast</label>
            <input name="cast" disabled></input>
            <label htmlFor="releaseFrom">Released From</label>
            <input type="date" name="dateFrom" disabled></input>
            <label htmlTo="releaseTo">Released To</label>
            <input type="date" name="dateFrom" disabled></input>
          </form>

        </div>
      );
}

export default SideBar