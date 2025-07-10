export type AboutHeroProps = {
  scrollToSection?: (index: number) => void;
};

export type AboutFullpageLayoutProps = {
  children: React.ReactNode[];
};

export type Mission = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type Expertise = {
  id: string;
  title: string;
  details: string;
  icon: string;
};

export type Stat = {
  id: string;
  value: string;
  label: string;
};

export type Offer = {
  id: number;
  jobTitle: string;
  city_name: string;
};
