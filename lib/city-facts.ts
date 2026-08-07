// Real, publicly documented facts about each Canadian municipality the site serves.
// Population figures reflect the 2021 Statistics Canada census and are approximations.
// The "street", "climate" and "housing" notes add genuine local texture that matters to
// board-up, glass and graffiti dispatch work (retail corridors, storm and freeze-thaw
// risk, break-in pressure, commercial glass exposure).
export type CityFact = {
  population: string;
  neighbourhood: string;
  landmark: string;
  climate: string;
  region: string;
  street: string;
};

export const CITY_FACTS: Record<string, CityFact> = {
  // ---------------- Ontario ----------------
  Toronto: {
    population: "about 2.79 million residents",
    neighbourhood: "the downtown core and the Queen West corridor",
    landmark: "the CN Tower and the Yonge–Bloor spine",
    climate: "a humid continental climate where freeze-thaw swings and winter storms test storefront glass and door hardware",
    region: "the City of Toronto",
    street: "Queen, King and Yonge street frontages",
  },
  Ottawa: {
    population: "about 1.02 million residents",
    neighbourhood: "the ByWard Market and the Sparks Street core",
    landmark: "Parliament Hill and the Rideau Canal",
    climate: "a cold continental climate with deep frost and heavy snow that strain glazing and exterior doors",
    region: "the National Capital Region",
    street: "Sparks, Rideau and Bank street frontages",
  },
  Mississauga: {
    population: "about 718,000 residents",
    neighbourhood: "Square One and the Port Credit village",
    landmark: "the Absolute World towers and the Credit River",
    climate: "a lake-moderated climate with lake-effect snow squalls that test glass and signage installations",
    region: "the Regional Municipality of Peel",
    street: "Hurontario and City Centre frontages",
  },
  Brampton: {
    population: "about 656,000 residents",
    neighbourhood: "the downtown core and the Queen Street corridor",
    landmark: "the Rose Theatre and Gage Park",
    climate: "a humid continental climate with heavy lake-effect snow that keeps winter board-up crews busy",
    region: "the Regional Municipality of Peel",
    street: "Queen, Main and Vodden street frontages",
  },
  Hamilton: {
    population: "about 569,000 residents",
    neighbourhood: "the downtown core and the industrial bayfront",
    landmark: "the Niagara Escarpment and Dundurn Castle",
    climate: "an escarpment climate with strong winds off the harbour that batter glass and storefronts",
    region: "the Hamilton area",
    street: "King, James and Barton street frontages",
  },
  London: {
    population: "about 422,000 residents",
    neighbourhood: "Richmond Row and the Wellington corridor",
    landmark: "Victoria Park and the forks of the Thames",
    climate: "a humid continental climate with severe thunderstorms and winter ice that test windows and roofs",
    region: "southwestern Ontario",
    street: "Richmond, Dundas and Wellington frontages",
  },
  Markham: {
    population: "about 338,000 residents",
    neighbourhood: "the Highway 7 corridor and the historic village core",
    landmark: "the Markham Museum and Rouge National Urban Park",
    climate: "a humid continental climate with freeze-thaw cycles that expose glazing seal failures",
    region: "York Region",
    street: "Highway 7 and Warden frontages",
  },
  Oshawa: {
    population: "about 183,000 residents",
    neighbourhood: "the downtown core and the Oshawa Creek valley",
    landmark: "Lake Ontario and the Parkwood Estate",
    climate: "a humid continental climate with lake-effect storms and wet springs that stress storefront glazing",
    region: "Durham Region",
    street: "King, Simcoe and Bond frontages",
  },
  Burlington: {
    population: "about 187,000 residents",
    neighbourhood: "the downtown lakeshore and the Appleby corridor",
    landmark: "the Royal Botanical Gardens and Lake Ontario",
    climate: "a lake-influenced climate with lake-effect snow and wet springs that test window wells and glass",
    region: "Halton Region",
    street: "Brant, Lakeshore and Fairview frontages",
  },
  Oakville: {
    population: "about 213,000 residents",
    neighbourhood: "the downtown core and Kerr Village",
    landmark: "Lake Ontario and the Oakville Harbour",
    climate: "a lake-moderated climate with freeze-thaw winters that keep glass replacement crews booked",
    region: "Halton Region",
    street: "Lakeshore Road and Trafalgar frontages",
  },
  Guelph: {
    population: "about 144,000 residents",
    neighbourhood: "St. George's Square and the downtown core",
    landmark: "the Speed River and the University of Guelph",
    climate: "a humid continental climate with winter ice and wet falls that test storefronts and signage",
    region: "Wellington County",
    street: "Wyndham, Macdonell and Woolwich frontages",
  },
  Brantford: {
    population: "about 104,000 residents",
    neighbourhood: "the downtown core and the Grand River corridor",
    landmark: "the Grand River and the Bell Homestead",
    climate: "a humid continental climate with freeze-thaw swings and wet springs that stress glazing seals",
    region: "Brant County",
    street: "Colborne, Dalhousie and Market frontages",
  },
  // ---------------- British Columbia ----------------
  Vancouver: {
    population: "about 663,000 residents",
    neighbourhood: "the downtown peninsula and the Mount Pleasant corridor",
    landmark: "Stanley Park and the Burrard Inlet",
    climate: "a wet coastal climate with atmospheric rivers that test storefront glass and exterior cladding",
    region: "Metro Vancouver",
    street: "Granville, Robson and Main street frontages",
  },
  Surrey: {
    population: "about 568,000 residents",
    neighbourhood: "the Whalley–City Centre area and the Guildford corridor",
    landmark: "the Fraser River and Crescent Beach",
    climate: "a wet coastal climate with heavy rain and seasonal flooding that keeps emergency crews busy",
    region: "Metro Vancouver",
    street: "King George Boulevard and 104 Avenue frontages",
  },
  Burnaby: {
    population: "about 250,000 residents",
    neighbourhood: "the Metrotown area and the Brentwood corridor",
    landmark: "Burnaby Mountain and Deer Lake",
    climate: "a wet coastal climate with damp winters that test glass and storefront weatherproofing",
    region: "Metro Vancouver",
    street: "Kingsway and Lougheed frontages",
  },
  Richmond: {
    population: "about 210,000 residents",
    neighbourhood: "the City Centre and the Steveston waterfront",
    landmark: "the Fraser River delta and Steveston Village",
    climate: "a wet coastal climate with tidal surges and heavy rain on low-lying, diked land",
    region: "Metro Vancouver",
    street: "No. 3 Road and Steveston Highway frontages",
  },
  "North Vancouver": {
    population: "about 90,000 residents",
    neighbourhood: "the Lonsdale Quay area",
    landmark: "Grouse Mountain and the Burrard Inlet",
    climate: "a wet coastal climate with heavy rain and wind that stress glazing and canopies",
    region: "Metro Vancouver",
    street: "Lonsdale and Marine Drive frontages",
  },
  Coquitlam: {
    population: "about 152,000 residents",
    neighbourhood: "the Burquitlam and Austin Heights corridors",
    landmark: "the Coquitlam River and Lafarge Lake",
    climate: "a wet coastal climate with heavy rain and landslide-season storms that test hillside storefronts",
    region: "Metro Vancouver",
    street: "Austin Avenue and Lougheed frontages",
  },
  Delta: {
    population: "about 108,000 residents",
    neighbourhood: "the Ladner and Tsawwassen areas",
    landmark: "the Fraser River delta and Boundary Bay",
    climate: "a coastal climate with flood risk and wind storms that keep roll-up door and glazing crews busy",
    region: "Metro Vancouver",
    street: "72nd Avenue and Ladner Trunk Road frontages",
  },
  Victoria: {
    population: "about 93,000 residents",
    neighbourhood: "the downtown core and the Fernwood–Cook Street corridor",
    landmark: "the Inner Harbour and the Royal BC Museum",
    climate: "a mild coastal climate with wet winters and stormy autumns that keep exterior work flowing",
    region: "the Capital Regional District",
    street: "Douglas, Yates and Government frontages",
  },
  Abbotsford: {
    population: "about 162,000 residents",
    neighbourhood: "the downtown core and the Sumas Prairie area",
    landmark: "Sumas Mountain and the Fraser Valley",
    climate: "a wet valley climate with atmospheric rivers and historic flooding on the prairie flats",
    region: "the Fraser Valley",
    street: "South Fraser Way and Essendene frontages",
  },
  // ---------------- Alberta ----------------
  Calgary: {
    population: "about 1.31 million residents",
    neighbourhood: "the Beltline and the Inglewood corridor",
    landmark: "the Bow River and the Calgary Tower",
    climate: "a semi-arid climate with chinook swings and summer hail that hammers windows and siding",
    region: "the Calgary region",
    street: "Stephen Avenue and 17th Avenue frontages",
  },
  Edmonton: {
    population: "about 1.04 million residents",
    neighbourhood: "the downtown core and the Old Strathcona strip",
    landmark: "the North Saskatchewan River valley",
    climate: "a cold prairie climate with deep freezes and rapid thaws that stress glazing and door hardware",
    region: "the Edmonton Capital Region",
    street: "Whyte Avenue and Jasper Avenue frontages",
  },
  // ---------------- Manitoba ----------------
  Winnipeg: {
    population: "about 749,000 residents",
    neighbourhood: "the Exchange District and St. Boniface",
    landmark: "the Red and Assiniboine rivers",
    climate: "a cold prairie climate with historic river flooding, deep frost and rapid spring thaws",
    region: "the Winnipeg Capital Region",
    street: "Portage and Main frontages",
  },
  // ---------------- Quebec ----------------
  Montreal: {
    population: "about 1.76 million residents",
    neighbourhood: "the Plateau–Rosemont belt and the downtown core",
    landmark: "Mount Royal and the St. Lawrence River",
    climate: "a humid continental climate with freeze-thaw cycles and heavy snow that test storefront glass and doors",
    region: "the Island of Montreal",
    street: "Ste-Catherine and St-Laurent frontages",
  },
  // ---------------- Saskatchewan ----------------
  Saskatoon: {
    population: "about 266,000 residents",
    neighbourhood: "the Broadway–Nutana corridor and the downtown core",
    landmark: "the South Saskatchewan River and the Bessborough Hotel",
    climate: "a cold prairie climate with deep frost, spring thaws and severe summer storms",
    region: "central Saskatchewan",
    street: "20th Street and 8th Street frontages",
  },
};
