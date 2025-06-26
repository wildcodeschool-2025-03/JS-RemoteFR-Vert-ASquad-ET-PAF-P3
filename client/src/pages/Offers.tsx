export default function Offers() {
  return (
    <>
            <h1 className="title">Nos offres d'emploi</h1>

      <form 
        action="/server/src/modules/...." 
        method="get" 
        className="formulaire"
      >
        <label htmlFor="frecherche">Rechercher</label>
        <input type="search" id="frecherche"/>
        <select name="Domaines">Catégories</select>
        <label htmlFor="femplacement">Emplacement</label>
        <input type="text" id="femplacement"/>
        <select name="Salaires min.">Salaire min.</select>
        <input type="submit" value="filtrer"/>
      </form>

      <div className="offres">Offres prosposés </div>
      <div className="offres">Offres prosposés </div>
      <div className="offres">Offres prosposés </div>
    </>
    );
}