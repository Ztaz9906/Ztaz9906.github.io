export type SkillData = {
  name: string;
  level: string;
  years: number;
};

export type PlanetData = {
  category: string;
  color: string;       // Planet glow color
  orbitRadius: number; // Distance from sun
  orbitSpeed: number;  // Radians/sec
  size: number;        // Planet sphere size
  skills: SkillData[];
};
