export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  release_date: string;
  runtime?: number;
  vote_average: number;
  revenue?: number;
}

export interface MovieVideo {
  id: string;
  key: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MovieVideosResponse {
  results: MovieVideo[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface MCUMovie {
  id: number;
  title: string;
}

export interface MCUMoviesByYear {
  [year: number]: MCUMovie[];
}
