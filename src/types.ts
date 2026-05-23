export type ThemeSettings = {
  fontSize: string;
  fontFamily: string;
  textColor: string;
  backgroundColor: string;
  highlightColor: string;
  highlightOutlineColor: string;
};

export type ThemePreset = {
  id: string;
  label: string;
  description: string;
  theme: Omit<ThemeSettings, "fontSize">;
  swatches: string[];
};

export type SampleSource = {
  id: string;
  label: string;
  description: string;
  url: string;
};

export type SampleCategory = {
  id: string;
  label: string;
  description: string;
  samples: SampleSource[];
};

export type ChapterOption = {
  id: string;
  label: string;
  text: string;
};

export type Screen = "reader" | "library" | "settings";
