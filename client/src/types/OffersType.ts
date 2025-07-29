export type Offer = {
  id: number;
  jobTitle: string;
  metier: string;
  contractType: string;
  description: string;
  salary: string;
  requirements: string;
  city_id: number;
  company_id: number;
};

export type OfferJoin = {
  offer_id: number;
  jobTitle: string;
  metier: string;
  contractType: string;
  description: string;
  salary: string;
  requirements: string;
  city_id: number;
  company_id: number;
  city_name?: string;
  company_siret?: string;
  departementId?: number;
};
