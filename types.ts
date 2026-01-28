
export interface NavItem {
  id: string;
  label: string;
}

export interface BlogPost {
  id: number;
  date: string;
  title: string;
  excerpt: string;
}

export interface BandMember {
  name: string;
  role: string;
  bio: string;
}

export enum ViewMode {
  STRATEGY = 'strategy',
  DEMO = 'demo'
}
