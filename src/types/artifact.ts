export interface Artifact {
  id: number;
  created_at: string;
  name: string;
  description: string;
  is_active: boolean;
  image_url?: string | null;
  production_center: string;
}

export interface ArtifactFilters {
  is_active?: boolean;
  production_center?: string;
  query?: string;
}