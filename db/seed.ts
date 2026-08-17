export const mandateSeed = [
  ["m1", "Prestige Lakeside Habitat", "Prestige Group", "Bengaluru", "2026-08-15", "New Launch", "Kavya R", "Arindom D"],
  ["m2", "Lodha Amara", "Lodha Group", "Thane, Mumbai", "2026-07-30", "New Launch", "Kavya R", "Rohit M"],
  ["m3", "Godrej Woodscape", "Godrej Properties", "Pune", "2026-08-22", "Launched", "Kavya R", "Arindom D"],
  ["m4", "Sobha Neopolis", "Sobha Ltd", "Bengaluru", "2026-10-05", "Sustenance", "Kavya R", "Rohit M"],
  ["m5", "DLF Privana", "DLF Ltd", "Gurugram", "2026-09-12", "Launched", "Kavya R", "Arindom D"],
  ["m6", "Brigade Cornerstone", "Brigade Group", "Bengaluru", "2026-11-20", "New Launch", "Kavya R", "Arindom D"],
  ["m7", "Mahindra Eden", "Mahindra Lifespaces", "Bengaluru", "2026-11-28", "New Launch", "Kavya R", "Arindom D"],
  ["m8", "Shapoorji Northern Lights", "Shapoorji Pallonji", "Pune", "2026-12-02", "New Launch", "Kavya R", "Rohit M"],
  ["m9", "Tata Carnatica", "Tata Housing", "Bengaluru", "2026-12-10", "New Launch", "Kavya R", "Arindom D"],
  ["m10", "Puravankara Purva Zenium", "Puravankara", "Bengaluru", "2026-12-15", "New Launch", "Kavya R", "Rohit M"],
  ["m11", "Kolte Patil 24K Espada", "Kolte-Patil", "Pune", "2026-12-20", "New Launch", "Kavya R", "Arindom D"],
  ["m12", "Mantri Serenity", "Mantri Developers", "Bengaluru", "2027-01-05", "New Launch", "Kavya R", "Rohit M"],
  ["m13", "Assetz Marq 3.0", "Assetz Property", "Bengaluru", "2027-01-12", "New Launch", "Kavya R", "Arindom D"],
  ["m14", "Kalpataru Immensa", "Kalpataru", "Thane, Mumbai", "2027-01-18", "New Launch", "Kavya R", "Rohit M"],
  ["m15", "Casagrand Zaltana", "Casagrand", "Chennai", "2027-01-25", "New Launch", "Kavya R", "Arindom D"],
  ["m16", "Provident Botanico", "Provident Housing", "Bengaluru", "2027-02-01", "New Launch", "Kavya R", "Rohit M"],
] as const;

export const standardTemplateTaskSeed = [
  ["standard-01", "Management", "Kickoff & governance setup", "internal"],
  ["standard-02", "Management", "Weekly governance cadence setup", "internal"],
  ["standard-03", "PR", "Press note draft", "internal"],
  ["standard-04", "PR", "Media list & embargo plan", "internal"],
  ["standard-05", "Digital Marketing", "Landing page go-live", "internal"],
  ["standard-06", "Digital Marketing", "Paid campaign setup", "internal"],
  ["standard-07", "Site Requirements", "Site branding installation", "external"],
  ["standard-08", "Site Requirements", "Sample flat readiness", "internal"],
  ["standard-09", "Marketing", "Brochure final cut", "internal"],
  ["standard-10", "Marketing", "Signage & hoarding plan", "external"],
  ["standard-11", "Post Sales", "CRM process mapping", "internal"],
  ["standard-12", "Manpower", "Sales team deployment", "internal"],
  ["standard-13", "Manpower", "Channel partner onboarding", "external"],
  ["standard-14", "Training & Pitch", "Pitch deck v1", "internal"],
] as const;

// Intentionally empty: tasks are created only after a user finishes onboarding.
export const mandateTaskSeed = [] as const;
