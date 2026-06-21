import {
  CAPABILITIES,
  EXPERIENCE,
  PROFILE,
  SKILLS,
  SOCIALS,
  STATS,
} from "@/lib/data";
import { PROJECTS } from "@/lib/data/projects";

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

function getYearsExperience() {
  const years = STATS.find((stat) => stat.label === "years experience");
  return years ? `${years.value}${years.suffix}` : "4+";
}

function getSpecialization() {
  return CAPABILITIES.map((capability) => capability.title.toLowerCase()).join(
    ", ",
  );
}

export const terminalCommands: Record<
  TerminalCommandName,
  TerminalCommandDefinition
> = {
  help: {
    description: "List available commands.",
    run: () => ({
      type: "output",
      lines: getVisibleCommands().map(
        ([name, command]) => `${name.padEnd(11, " ")} ${command.description}`,
      ),
    }),
  },
  about: {
    description: "Show a short bio.",
    run: () => ({
      type: "output",
      lines: [
        `${PROFILE.name} | ${PROFILE.role}`,
        `${getYearsExperience()} of experience building scalable products.`,
        `Specialization: ${getSpecialization()}.`,
      ],
    }),
  },
  experience: {
    description: "List experience by company and date range.",
    run: () => ({
      type: "output",
      lines: EXPERIENCE.map(
        (item) => `${item.company} (${item.period}) — ${item.summary}`,
      ),
    }),
  },
  projects: {
    description: "List shipped projects and one-line summaries.",
    run: () => ({
      type: "output",
      lines: PROJECTS.map((project) => `${project.name} — ${project.oneLiner}`),
    }),
  },
  skills: {
    description: "Show skill categories and sample tools.",
    run: () => ({
      type: "output",
      lines: SKILLS.map(
        (group) =>
          `${group.category}: ${group.items.slice(0, 4).join(", ")}${
            group.items.length > 4 ? ", ..." : ""
          }`,
      ),
    }),
  },
  contact: {
    description: "Show contact details and profiles.",
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
    description: "Clear the terminal output.",
    run: () => ({ type: "clear" }),
  },
  whoami: {
    description: "Print the current shell user.",
    run: () => ({
      type: "output",
      lines: ["guest", "Browsing the portfolio shell with read-only vibes."],
    }),
  },
  sudo: {
    description: "Try elevated privileges.",
    hidden: true,
    run: () => ({
      type: "output",
      lines: ["Nice try. Permission denied."],
    }),
  },
};

export function getVisibleCommands() {
  return Object.entries(terminalCommands)
    .filter(([, command]) => !command.hidden)
    .sort(([a], [b]) => a.localeCompare(b)) as [
    TerminalCommandName,
    TerminalCommandDefinition,
  ][];
}

export function findCommand(input: string) {
  const normalized = input.trim().toLowerCase() as TerminalCommandName;
  return normalized in terminalCommands ? terminalCommands[normalized] : null;
}

export function autocompleteCommand(input: string) {
  const normalized = input.trim().toLowerCase();
  if (!normalized) return null;

  const matches = Object.keys(terminalCommands)
    .sort()
    .filter((name) => name.startsWith(normalized));

  return matches[0] ?? null;
}
