export interface VehicleInterface {
  marque: string
  categorie: string
  emission_co2: string
  consomation: string
  porte: number
  duree_location: string
  first_loyer: string
  puissance_fiscale: string
  carburant: string
  image: string
  modele: string
  puissance: string
  prix: string
  transmission: 'Manuelle' | 'Automatique'
  type_voiture: 'Véhicule utilitaire' | 'voiture'
  url: string,
  distance: number
}

export const IDFFuelCost = {
  Essence: 1.321,
  Diesel: 1.180
}

export const InsurancesCost = {
  tesla: 1061,
  porsche: 953,
  bmw: 773,
  audi: 761,
  jaguar: 697,
  'alfa romeo': 696,
  mini: 685,
  'mercedes-benz': 684,
  seat: 675,
  volkswagen: 658,
  ds: 627,
  lexus: 620,
  'land rover': 612,
  peugeot: 605,
  volvo: 598,
  opel: 594,
  ford: 588,
  renault: 583,
  honda: 577,
  mazda: 571,
  fiat: 570,
  jeep: 568,
  skoda: 552,
  smart: 547,
  nissan: 538,
  citroen: 537,
  kia: 528,
  hyundai: 523,
  yoyota: 519,
  dacia: 461
}
