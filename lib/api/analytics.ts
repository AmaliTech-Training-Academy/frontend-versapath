type TrendPoint = {
  readonly label: string;
  readonly career: number;
  readonly skills: number;
  readonly toolTipLabel: string;
};

type ScoreBucket = {
  readonly label: string;
  readonly count: number;
};

export const performanceData: TrendPoint[] = [
  { label: "Jan", career: 56, skills: 22, toolTipLabel: "January" },
  { label: "Feb", career: 54, skills: 21, toolTipLabel: "February" },
  { label: "Mar", career: 33, skills: 13, toolTipLabel: "March" },
  { label: "Apr", career: 56, skills: 22, toolTipLabel: "April" },
  { label: "May", career: 53, skills: 20, toolTipLabel: "May" },
  { label: "Jun", career: 40, skills: 18, toolTipLabel: "June" },
  { label: "Jul", career: 39, skills: 17, toolTipLabel: "July" },
  { label: "Aug", career: 41, skills: 19, toolTipLabel: "August" },
  { label: "Sep", career: 52, skills: 23, toolTipLabel: "September" },
  { label: "Oct", career: 59, skills: 25, toolTipLabel: "October" },
  { label: "Nov", career: 48, skills: 21, toolTipLabel: "November" },
  { label: "Dec", career: 32, skills: 12, toolTipLabel: "December" },
];

export const monthMapping: Record<string, string> = {
    "Jan": "January",
    "Feb": "February",
    "Mar": "March",
    "Apr": "April",
    "May": "May",
    "Jun": "June",
    "Jul": "July",
    "Aug": "August",
    "Sep": "September",
    "Oct": "October",
    "Nov": "November",
    "Dec": "December",
}

export const assessmentScoreData: ScoreBucket[] = [
  { label: "90-100", count: 73 },
  { label: "80-89", count: 46 },
  { label: "70-79", count: 38 },
  { label: "60-69", count: 58 },
  { label: "<60", count: 37 },
];

export const chartSelectData = {
    placeholder: "Talent",
    values: [
        {
            label: "Talent",
            val: "talent"
        },
        {
            label: "Growth",
            val: "growth"
        }
    ]
}