import {
  SKILLS,
  SOCIALS,
  STATS,
  getAllProjects,
  getCapabilityTitles,
  getExperience,
  getProfile,
  type Locale,
} from "@/lib/data";

export type TerminalCommandResult =
  | {
      type: "output";
      lines: string[];
    }
  | {
      type: "clear";
    };

export interface TerminalCommandDefinition {
  description: string;
  hidden?: boolean;
  run: () => TerminalCommandResult;
}

export type TerminalCommandName =
  | "help"
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "contact"
  | "clear"
  | "whoami"
  | "sudo";

const COMMAND_LABELS: Record<Locale, Record<TerminalCommandName, string>> = {
  en: {
    help: "help",
    about: "about",
    experience: "experience",
    projects: "projects",
    skills: "skills",
    contact: "contact",
    clear: "clear",
    whoami: "whoami",
    sudo: "sudo",
  },
  es: {
    help: "ayuda",
    about: "sobre",
    experience: "experiencia",
    projects: "proyectos",
    skills: "habilidades",
    contact: "contacto",
    clear: "limpiar",
    whoami: "quiensoy",
    sudo: "sudo",
  },
};

const SKILL_CATEGORY_LABELS: Record<Locale, Record<string, string>> = {
  en: {
    Languages: "Languages",
    Frontend: "Frontend",
    Architecture: "Architecture",
    Backend: "Backend",
    "Services & Payments": "Services & Payments",
    Databases: "Databases",
    Tools: "Tools",
  },
  es: {
    Languages: "Lenguajes",
    Frontend: "Frontend",
    Architecture: "Arquitectura",
    Backend: "Backend",
    "Services & Payments": "Servicios y pagos",
    Databases: "Bases de datos",
    Tools: "Herramientas",
  },
};

function getYearsExperience() {
  const years = STATS.find((stat) => stat.label === "years experience");
  return years ? `${years.value}${years.suffix}` : "4+";
}

function getCommandLabel(command: TerminalCommandName, locale: Locale) {
  return COMMAND_LABELS[locale][command];
}

function getLocalizedCommandName(
  input: string,
  locale: Locale,
): TerminalCommandName | null {
  const normalized = input.trim().toLowerCase();
  const entries = Object.entries(COMMAND_LABELS[locale]) as [
    TerminalCommandName,
    string,
  ][];
  const match = entries.find(([, label]) => label === normalized);
  return match?.[0] ?? null;
}

export function getTerminalCommands(locale: Locale): Record<
  TerminalCommandName,
  TerminalCommandDefinition
> {
  const projects = getAllProjects(locale);
  const profile = getProfile(locale);
  const experience = getExperience(locale);
  const specialization = getCapabilityTitles(locale).join(", ");
  const isSpanish = locale === "es";

  return {
    help: {
      description: isSpanish
        ? "Lista los comandos disponibles."
        : "List available commands.",
      run: () => ({
        type: "output",
        lines: getVisibleCommands(locale).map(
          ([name, command]) =>
            `${getCommandLabel(name, locale).padEnd(11, " ")} ${command.description}`,
        ),
      }),
    },
    about: {
      description: isSpanish ? "Muestra una bio corta." : "Show a short bio.",
      run: () => ({
        type: "output",
        lines: [
          `${profile.name} | ${profile.role}`,
          isSpanish
            ? `${getYearsExperience()} de experiencia construyendo productos escalables.`
            : `${getYearsExperience()} of experience building scalable products.`,
          isSpanish
            ? `Especialización: ${specialization}.`
            : `Specialization: ${specialization}.`,
        ],
      }),
    },
    experience: {
      description: isSpanish
        ? "Lista la experiencia por empresa y fecha."
        : "List experience by company and date range.",
      run: () => ({
        type: "output",
        lines: experience.map(
          (item) => `${item.company} (${item.period}) - ${item.summary}`,
        ),
      }),
    },
    projects: {
      description: isSpanish
        ? "Lista proyectos entregados y su resumen."
        : "List shipped projects and one-line summaries.",
      run: () => ({
        type: "output",
        lines: projects.map((project) => `${project.name} - ${project.oneLiner}`),
      }),
    },
    skills: {
      description: isSpanish
        ? "Muestra categorías y herramientas."
        : "Show skill categories and sample tools.",
      run: () => ({
        type: "output",
        lines: SKILLS.map(
          (group) =>
            `${SKILL_CATEGORY_LABELS[locale][group.category] ?? group.category}: ${group.items.slice(0, 4).join(", ")}${
              group.items.length > 4 ? ", ..." : ""
            }`,
        ),
      }),
    },
    contact: {
      description: isSpanish
        ? "Muestra contacto y perfiles."
        : "Show contact details and profiles.",
      run: () => ({
        type: "output",
        lines: [
          `Email: ${SOCIALS.email}`,
          `LinkedIn: ${SOCIALS.linkedin}`,
          `GitHub: ${SOCIALS.github}`,
        ],
      }),
    },
    clear: {
      description: isSpanish
        ? "Limpia la salida de la terminal."
        : "Clear the terminal output.",
      run: () => ({ type: "clear" }),
    },
    whoami: {
      description: isSpanish
        ? "Muestra el usuario actual."
        : "Print the current shell user.",
      run: () => ({
        type: "output",
        lines: isSpanish
          ? ["guest", "Explorando la shell del portfolio con vibes de solo lectura."]
          : ["guest", "Browsing the portfolio shell with read-only vibes."],
      }),
    },
    sudo: {
      description: isSpanish
        ? "Prueba privilegios elevados."
        : "Try elevated privileges.",
      hidden: true,
      run: () => ({
        type: "output",
        lines: isSpanish
          ? ["Buen intento. Permiso denegado."]
          : ["Nice try. Permission denied."],
      }),
    },
  };
}

export function getVisibleCommands(locale: Locale) {
  return Object.entries(getTerminalCommands(locale))
    .filter(([, command]) => !command.hidden)
    .sort(([a], [b]) => a.localeCompare(b)) as [
    TerminalCommandName,
    TerminalCommandDefinition,
  ][];
}

export function findCommand(input: string, locale: Locale) {
  const normalized = getLocalizedCommandName(input, locale);
  const commands = getTerminalCommands(locale);
  return normalized && normalized in commands ? commands[normalized] : null;
}

export function autocompleteCommand(input: string, locale: Locale) {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;

  const matches = Object.values(COMMAND_LABELS[locale]).filter((name) =>
    name.startsWith(normalized),
  );

  return matches[0] ?? null;
}
