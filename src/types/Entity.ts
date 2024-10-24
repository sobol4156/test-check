export interface Entity {
  id: number;
  title: string;
  description: string;
  published: boolean;
  published_from?: string | null;
}
