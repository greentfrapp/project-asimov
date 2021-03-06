let principlesSub = [
  {
    "id": "0",
    "report": "Three Laws of Robotics",
    "content": "First Law",
    "principle": "Well-being"
  },
  {
    "id": "1",
    "report": "Three Laws of Robotics",
    "content": "Zeroth Law",
    "principle": "Well-being"
  },
  {
    "id": "2",
    "report": "Three Laws of Robotics",
    "content": "First Law",
    "principle": "Autonomy"
  },
  {
    "id": "3",
    "report": "Three Laws of Robotics",
    "content": "First Law",
    "principle": "Privacy"
  },
  {
    "id": "4",
    "report": "Three Laws of Robotics",
    "content": "First Law",
    "principle": "Fairness"
  },
  {
    "id": "5",
    "report": "Three Laws of Robotics",
    "content": "Second Law",
    "principle": "Robustness"
  },
  {
    "id": "6",
    "report": "Three Laws of Robotics",
    "content": "Third Law",
    "principle": "Others"
  },
  {
    "id": "7",
    "report": "Singapore’s AI Governance Framework",
    "content": "AI solutions should be human-centric.",
    "principle": "Well-being"
  },
  {
    "id": "8",
    "report": "Singapore’s AI Governance Framework",
    "content": "Organisations should consider carefully when deciding whether to provide individuals the option to opt-out and whether this option should be offered by default or only upon request.",
    "principle": "Autonomy"
  },
  {
    "id": "9",
    "report": "Singapore’s AI Governance Framework",
    "content": "[…] consider other modes of providing recourse to the individual such as providing a channel for reviewing the decision.",
    "principle": "Autonomy"
  },
  {
    "id": "10",
    "report": "Singapore’s AI Governance Framework",
    "content": "Refers to other documents.",
    "principle": "Privacy"
  },
  {
    "id": "11",
    "report": "Singapore’s AI Governance Framework",
    "content": "Organisations using AI in decision-making should ensure that the decision-making process is explainable, transparent and fair.",
    "principle": "Fairness"
  },
  {
    "id": "12",
    "report": "Singapore’s AI Governance Framework",
    "content": "Using reasonable efforts to ensure that the datasets used for AI model training \u2028are adequate for the intended purpose, and to assess and manage the risks of inaccuracy or bias, as well as reviewing exceptions identified during model training.",
    "principle": "Fairness"
  },
  {
    "id": "13",
    "report": "Singapore’s AI Governance Framework",
    "content": "Organisations operating in multiple countries should consider the differences in societal norms and values, where possible.",
    "principle": "Fairness"
  },
  {
    "id": "14",
    "report": "Singapore’s AI Governance Framework",
    "content": "Ensuring relevant staff dealing with AI systems are trained in interpreting AI model output and decisions.",
    "principle": "Accountability"
  },
  {
    "id": "15",
    "report": "Singapore’s AI Governance Framework",
    "content": "[...] put in place good data accountability practices",
    "principle": "Accountability"
  },
  {
    "id": "16",
    "report": "Singapore’s AI Governance Framework",
    "content": "Organisations should consider measures to enhance the transparency of algorithms found in AI models through concepts of explainability, repeatability and traceability.",
    "principle": "Accountability"
  },
  {
    "id": "17",
    "report": "Singapore’s AI Governance Framework",
    "content": "Organisations using AI in decision-making should ensure that the decision-making process is explainable, transparent and fair.",
    "principle": "Transparency"
  },
  {
    "id": "18",
    "report": "Singapore’s AI Governance Framework",
    "content": "Reviewing communications channels and interactions with consumers and customers with a view to providing disclosure and effective feedback channels.",
    "principle": "Transparency"
  },
  {
    "id": "19",
    "report": "Singapore’s AI Governance Framework",
    "content": "AI systems can be designed to report on the confidence level of their predictions, and explainability features can focus on why the AI model had a certain level of confidence, rather than why a prediction was made.",
    "principle": "Transparency"
  },
  {
    "id": "20",
    "report": "Singapore’s AI Governance Framework",
    "content": "Organisations should consider measures to enhance the transparency of algorithms found in AI models through concepts of explainability, repeatability and traceability.",
    "principle": "Transparency"
  },
  {
    "id": "21",
    "report": "Singapore’s AI Governance Framework",
    "content": "It should be noted that technical explainability may not always be enlightening, especially to the man in the street.",
    "principle": "Transparency"
  },
  {
    "id": "22",
    "report": "Singapore’s AI Governance Framework",
    "content": "There could also be scenarios where it might not be practical or reasonable to provide information in relation to an algorithm.",
    "principle": "Transparency"
  },
  {
    "id": "23",
    "report": "Singapore’s AI Governance Framework",
    "content": "Using any existing risk management framework and applying risk control measures [...]",
    "principle": "Robustness"
  },
  {
    "id": "24",
    "report": "Singapore’s AI Governance Framework",
    "content": "Organisations should consider measures to enhance the transparency of algorithms found in AI models through concepts of explainability, repeatability and traceability.",
    "principle": "Robustness"
  },
  {
    "id": "25",
    "report": "Singapore’s AI Governance Framework",
    "content": "Where explainability cannot be practicably achieved (e.g. black box) given the current state of technology, organisations can consider documenting the repeatability of results produced by the AI model.",
    "principle": "Robustness"
  },
  {
    "id": "26",
    "report": "Singapore’s AI Governance Framework",
    "content": "Training and education",
    "principle": "Others"
  },
  {
    "id": "27",
    "report": "Tencent’s ARCC",
    "content": "Comprehensible 可知",
    "principle": "Autonomy"
  },
  {
    "id": "28",
    "report": "Tencent’s ARCC",
    "content": "Controllable 可控",
    "principle": "Autonomy"
  },
  {
    "id": "29",
    "report": "Tencent’s ARCC",
    "content": "Reliable 可靠",
    "principle": "Privacy"
  },
  {
    "id": "30",
    "report": "Tencent’s ARCC",
    "content": "Available 可用",
    "principle": "Fairness"
  },
  {
    "id": "31",
    "report": "Tencent’s ARCC",
    "content": "Controllable 可控",
    "principle": "Accountability"
  },
  {
    "id": "32",
    "report": "Tencent’s ARCC",
    "content": "Comprehensible 可知",
    "principle": "Transparency"
  },
  {
    "id": "33",
    "report": "Tencent’s ARCC",
    "content": "Reliable 可靠",
    "principle": "Robustness"
  },
  {
    "id": "34",
    "report": "OECD",
    "content": "Inclusive growth, sustainable development and well-being",
    "principle": "Well-being"
  },
  {
    "id": "35",
    "report": "OECD",
    "content": "Human-centred values and fairness",
    "principle": "Well-being"
  },
  {
    "id": "36",
    "report": "OECD",
    "content": "Human-centred values and fairness",
    "principle": "Autonomy"
  },
  {
    "id": "37",
    "report": "OECD",
    "content": "Transparency and explainability",
    "principle": "Autonomy"
  },
  {
    "id": "38",
    "report": "OECD",
    "content": "Human-centred values and fairness",
    "principle": "Privacy"
  },
  {
    "id": "39",
    "report": "OECD",
    "content": "Human-centred values and fairness",
    "principle": "Fairness"
  },
  {
    "id": "40",
    "report": "OECD",
    "content": "Accountability",
    "principle": "Accountability"
  },
  {
    "id": "41",
    "report": "OECD",
    "content": "Transparency and explainability",
    "principle": "Transparency"
  },
  {
    "id": "42",
    "report": "OECD",
    "content": "Sharing and cooperation",
    "principle": "Transparency"
  },
  {
    "id": "43",
    "report": "OECD",
    "content": "Robustness, security and safety",
    "principle": "Robustness"
  },
  {
    "id": "44",
    "report": "OECD",
    "content": "Training and education",
    "principle": "Others"
  },
  {
    "id": "45",
    "report": "Montreal",
    "content": "Well-being",
    "principle": "Well-being"
  },
  {
    "id": "46",
    "report": "Montreal",
    "content": "Solidarity",
    "principle": "Well-being"
  },
  {
    "id": "47",
    "report": "Montreal",
    "content": "Sustainable Development",
    "principle": "Well-being"
  },
  {
    "id": "48",
    "report": "Montreal",
    "content": "Respect for Autonomy",
    "principle": "Autonomy"
  },
  {
    "id": "49",
    "report": "Montreal",
    "content": "Democratic Participation",
    "principle": "Autonomy"
  },
  {
    "id": "50",
    "report": "Montreal",
    "content": "Protection of Privacy and Intimacy",
    "principle": "Privacy"
  },
  {
    "id": "51",
    "report": "Montreal",
    "content": "Caution / Prudence",
    "principle": "Privacy"
  },
  {
    "id": "52",
    "report": "Montreal",
    "content": "Democratic Participation",
    "principle": "Fairness"
  },
  {
    "id": "53",
    "report": "Montreal",
    "content": "Equity",
    "principle": "Fairness"
  },
  {
    "id": "54",
    "report": "Montreal",
    "content": "Diversity Inclusion",
    "principle": "Fairness"
  },
  {
    "id": "55",
    "report": "Montreal",
    "content": "Responsibility",
    "principle": "Accountability"
  },
  {
    "id": "56",
    "report": "Montreal",
    "content": "Caution / Prudence",
    "principle": "Transparency"
  },
  {
    "id": "57",
    "report": "Montreal",
    "content": "Caution / Prudence",
    "principle": "Robustness"
  },
  {
    "id": "58",
    "report": "Google",
    "content": "Be socially beneficial.",
    "principle": "Well-being"
  },
  {
    "id": "59",
    "report": "Google",
    "content": "Incorporate privacy design principles.",
    "principle": "Privacy"
  },
  {
    "id": "60",
    "report": "Google",
    "content": "Avoid creating or reinforcing unfair bias.",
    "principle": "Fairness"
  },
  {
    "id": "61",
    "report": "Google",
    "content": "Be accountable to people.",
    "principle": "Accountability"
  },
  {
    "id": "62",
    "report": "Google",
    "content": "Uphold high standards of scientific excellence.",
    "principle": "Transparency"
  },
  {
    "id": "63",
    "report": "Google",
    "content": "Be built and tested for safety.",
    "principle": "Robustness"
  },
  {
    "id": "64",
    "report": "Asilomar",
    "content": "Research Goal",
    "principle": "Well-being"
  },
  {
    "id": "65",
    "report": "Asilomar",
    "content": "Research Funding",
    "principle": "Well-being"
  },
  {
    "id": "66",
    "report": "Asilomar",
    "content": "Safety",
    "principle": "Well-being"
  },
  {
    "id": "67",
    "report": "Asilomar",
    "content": "Non-subversion",
    "principle": "Well-being"
  },
  {
    "id": "68",
    "report": "Asilomar",
    "content": "AI Arms Race",
    "principle": "Well-being"
  },
  {
    "id": "69",
    "report": "Asilomar",
    "content": "Value Alignment",
    "principle": "Autonomy"
  },
  {
    "id": "70",
    "report": "Asilomar",
    "content": "Human Values",
    "principle": "Autonomy"
  },
  {
    "id": "71",
    "report": "Asilomar",
    "content": "Human Control",
    "principle": "Autonomy"
  },
  {
    "id": "72",
    "report": "Asilomar",
    "content": "Non-subversion",
    "principle": "Autonomy"
  },
  {
    "id": "73",
    "report": "Asilomar",
    "content": "Personal Privacy",
    "principle": "Privacy"
  },
  {
    "id": "74",
    "report": "Asilomar",
    "content": "Liberty and Privacy",
    "principle": "Privacy"
  },
  {
    "id": "75",
    "report": "Asilomar",
    "content": "Shared Benefit",
    "principle": "Fairness"
  },
  {
    "id": "76",
    "report": "Asilomar",
    "content": "Shared Prosperity",
    "principle": "Fairness"
  },
  {
    "id": "77",
    "report": "Asilomar",
    "content": "Responsibility",
    "principle": "Accountability"
  },
  {
    "id": "78",
    "report": "Asilomar",
    "content": "Science-Policy Link",
    "principle": "Transparency"
  },
  {
    "id": "79",
    "report": "Asilomar",
    "content": "Research Culture",
    "principle": "Transparency"
  },
  {
    "id": "80",
    "report": "Asilomar",
    "content": "Race Avoidance",
    "principle": "Transparency"
  },
  {
    "id": "81",
    "report": "Asilomar",
    "content": "Failure Transparency",
    "principle": "Transparency"
  },
  {
    "id": "82",
    "report": "Asilomar",
    "content": "Judicial Transparency",
    "principle": "Transparency"
  },
  {
    "id": "83",
    "report": "Asilomar",
    "content": "Long-term issues",
    "principle": "Others"
  },
  {
    "id": "84",
    "report": "ERLC",
    "content": "War",
    "principle": "Well-being"
  },
  {
    "id": "85",
    "report": "ERLC",
    "content": "Dignity",
    "principle": "Autonomy"
  },
  {
    "id": "86",
    "report": "ERLC",
    "content": "Data & Privacy",
    "principle": "Privacy"
  },
  {
    "id": "87",
    "report": "ERLC",
    "content": "Bias",
    "principle": "Fairness"
  },
  {
    "id": "88",
    "report": "European Commission",
    "content": "Prevention of harm",
    "principle": "Well-being"
  },
  {
    "id": "89",
    "report": "European Commission",
    "content": "Societal and environmental wellbeing",
    "principle": "Well-being"
  },
  {
    "id": "90",
    "report": "European Commission",
    "content": "Respect for human autonomy",
    "principle": "Autonomy"
  },
  {
    "id": "91",
    "report": "European Commission",
    "content": "Human agency and oversight",
    "principle": "Autonomy"
  },
  {
    "id": "92",
    "report": "European Commission",
    "content": "Privacy and data governance",
    "principle": "Privacy"
  },
  {
    "id": "93",
    "report": "European Commission",
    "content": "Fairness",
    "principle": "Fairness"
  },
  {
    "id": "94",
    "report": "European Commission",
    "content": "Diversity, non-discrimination and fairness",
    "principle": "Fairness"
  },
  {
    "id": "95",
    "report": "European Commission",
    "content": "Accountability",
    "principle": "Accountability"
  },
  {
    "id": "96",
    "report": "European Commission",
    "content": "Explicability",
    "principle": "Transparency"
  },
  {
    "id": "97",
    "report": "European Commission",
    "content": "Transparency",
    "principle": "Transparency"
  },
  {
    "id": "98",
    "report": "European Commission",
    "content": "Robust",
    "principle": "Robustness"
  },
  {
    "id": "99",
    "report": "European Commission",
    "content": "Technical robustness and safety",
    "principle": "Robustness"
  },
  {
    "id": "100",
    "report": "European Commission",
    "content": "Lawful",
    "principle": "Others"
  },
  {
    "id": "101",
    "report": "Beijing AI Principles",
    "content": "Do good",
    "principle": "Well-being"
  },
  {
    "id": "102",
    "report": "Beijing AI Principles",
    "content": "For the service of humanity",
    "principle": "Well-being"
  },
  {
    "id": "103",
    "report": "Beijing AI Principles",
    "content": "Ethical",
    "principle": "Well-being"
  },
  {
    "id": "104",
    "report": "Beijing AI Principles",
    "content": "Harmony and cooperation",
    "principle": "Well-being"
  },
  {
    "id": "105",
    "report": "Beijing AI Principles",
    "content": "Using AI proficiently and wisely",
    "principle": "Autonomy"
  },
  {
    "id": "106",
    "report": "Beijing AI Principles",
    "content": "Awareness and consent",
    "principle": "Privacy"
  },
  {
    "id": "107",
    "report": "Beijing AI Principles",
    "content": "Diverse and Inclusive",
    "principle": "Fairness"
  },
  {
    "id": "108",
    "report": "Beijing AI Principles",
    "content": "Responsible",
    "principle": "Accountability"
  },
  {
    "id": "109",
    "report": "Beijing AI Principles",
    "content": "Open",
    "principle": "Transparency"
  },
  {
    "id": "110",
    "report": "Beijing AI Principles",
    "content": "Awareness and consent",
    "principle": "Transparency"
  },
  {
    "id": "111",
    "report": "Beijing AI Principles",
    "content": "Harmony and cooperation",
    "principle": "Transparency"
  },
  {
    "id": "112",
    "report": "Beijing AI Principles",
    "content": "Using AI proficiently and wisely",
    "principle": "Robustness"
  },
  {
    "id": "113",
    "report": "Beijing AI Principles",
    "content": "Education and training",
    "principle": "Others"
  },
  {
    "id": "114",
    "report": "Beijing AI Principles",
    "content": "Optimize employment",
    "principle": "Others"
  },
  {
    "id": "115",
    "report": "Beijing AI Principles",
    "content": "Adaptation and moderation",
    "principle": "Others"
  },
  {
    "id": "116",
    "report": "Beijing AI Principles",
    "content": "Detailed and practical",
    "principle": "Others"
  },
  {
    "id": "117",
    "report": "Beijing AI Principles",
    "content": "Long-term Planning",
    "principle": "Others"
  },
  {
    "id": "118",
    "report": "France",
    "content": "Data and Privacy Protection",
    "principle": "Privacy"
  },
  {
    "id": "119",
    "report": "France",
    "content": "Fairness and Diversity",
    "principle": "Fairness"
  },
  {
    "id": "120",
    "report": "France",
    "content": "Transparency and Auditability",
    "principle": "Accountability"
  },
  {
    "id": "121",
    "report": "France",
    "content": "Accountability",
    "principle": "Accountability"
  },
  {
    "id": "122",
    "report": "France",
    "content": "Transparency and Auditability",
    "principle": "Transparency"
  },
  {
    "id": "123",
    "report": "France",
    "content": "Political Action",
    "principle": "Others"
  }
]