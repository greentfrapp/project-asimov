## Literature Review

<!--
- Structural Biases
- Systematic Oversight
 -->

Artificial intelligence (AI) technologies have seen widespread use in recent years. These applications range from trivial to severe. Google Photos help to sort and label our photos automatically and Google Translate helps us communicate in foreign lands. On the other hand, AI systems are also used to provide advice for judges and juries in criminal sentencing and for doctors in diagnosing life-threatening diseases. What was once the fancy of science fiction authors has been made real enough to both save and endanger livelihoods and lives. In light of what is at stake, there is a growing need and a moral imperative for AI researchers, engineers and practitioners to understand the ethical issues associated with the technology. Amidst recent concerns about the ethics of AI systems (AIS), many articles and writings have been published in the interdisciplinary field of AI ethics. These range from official ethics guidelines to more mainstream non-fiction books, from academic publications and journal articles to online visualizations and "explorables".

Under the larger umbrella of AI ethics, algorithmic bias has been repeatedly cited as a pressing problem afflicting currently deployed systems. The term "algorithmic bias" can be defined as systematic unequal treatment by automated systems or machines. In Verma and Rubin's work (Verma & Rubin, 2018), the authors collated a list of twenty different fairness definitions used to evaluate algorithmic bias. O'Neil's popular book Weapons of Math Destruction (O'Neil, 2016) discusses the hidden biases present in algorithmic systems, or what she terms "weapons of math destruction". Urgently, many of the systems that O'Neil describes had been widely deployed and still remain so. In the 208-page behemoth Montréal Declaration (Montréal Declaration, 2018), the sixth principle of Equity states, "AIS must be designed and trained so as not to create, reinforce, or reproduce discrimination based on — among other things — social, sexual, ethnic, cultural, or religious differences." 

In this review, we look at four main types of literature in AI ethics and examine algorithmic bias in the context of these works.

### Ethical Guidelines and Principles

In the context of this project, AI ethics principles refer to official publications of ethical guidelines. Such guidelines are typically published by key organizations, which can be divided into five main categories <dt-cite cite="fjeld2019principled"></dt-cite>:

- Civil society (e.g. Amnesty International, Access Now)
- Government (e.g. USA, China, Japan, Singapore)
- Multistakeholder (e.g. University of Montréal, Future of Life Institute)
- Inter-governmental organizations (e.g. Council of Europe, Organisation for Economic Co-operation and Development (OECD), United Nations (UN))
- Private sector (e.g. Google, Microsoft, Tencent)

Examples of AI ethics principles include the Amnesty International and Access Now’s Toronto Declaration (Amnesty International, 2018), USA’s Preparing for the Future of Artificial Intelligence (NSTC, 2016), University of Montréal’s Montréal Declaration, OECD’s Recommendation of the Council on Artificial Intelligence (OECD, 2019), and Microsoft’s Microsoft AI Principles (Microsoft, 2018). More recently, the Berkman Klein Center for Internet and Society at Harvard University launched the “Principled Artificial Intelligence Project” (Fjeld et al., 2019), which maps 32 sets of principles across eight themes of Privacy, Accountability, Safety and Security, Transparency and Explainability, Fairness and Non-discrimination, Human Control of Technology, Professional Responsibility, and Promotion of Human Values.

### Academic Publications

In the realm of computer science, the FAT (Fairness, Accountability, Transparency) movement has been gaining momentum in recent years. The seminal conferences Fairness, Accountability, and Transparency in Machine Learning (FATML) and Association for Computing Machinery's Conference on Fairness, Accountability, and Transparency (ACM FAT\*) were started in 2014 and 2018 respectively. However, concerns about algorithmic bias and computer ethics actually date as far back as 1985, in a paper aptly titled, "What is Computer Ethics?" by James H. Moor <dt-cite cite="moor1985computer"></dt-cite>. Moor defines computer ethics as "the analysis of the nature and social impact of computer technology and the corresponding formulation and justification of policies for the ethical use of such technology". Friedman and Nissenbaum's work on bias in computer systems in the 1990s also set the stage for modern discussions of algorithmic bias <dt-cite cite="friedman1996bias"></dt-cite>.

In his 1985 essay, Moor observed a "policy vacuum" and a "conceptual vacuum" in computer ethics. Fastforward more than 30 years, Moor might be pleased to learn that there has been a proliferation of publications related to computer ethics. In the domain of algorithmic bias, publications can largely be organized into three categories:

- Documentation or exposé of bias in certain algorithms or tools
- Formalization of fairness definitions for quantifying bias
- Algorithms and tools to discover or remedy bias

#### Exposing Bias

Several works have been published exposing algorithmic bias in popular tools. Kay et al. <dt-cite cite="kay2015unequal"></dt-cite> and Otterbacher et al. <dt-cite cite="otterbacher2017competent"></dt-cite> documented gender biases in image search results across search terms of different occupations and adjectives respectively. For example, a Google Image search result for "CEO" had returned images dominated by white men.

#### Formalizing Bias

Verma and Rubin <dt-cite cite="verma2018fairness"></dt-cite> reviewed twenty different fairness definitions applied to algorithmic systems. Similarly, Narayanan <dt-cite cite="narayanan2018translation"></dt-cite> gave a tutorial titled "21 Fairness Definitions and Their Politics" in the 2018 ACM FAT* conference. These fairness definitions stemmed from multiple papers that sought to define fairness in mathematical terms - a language familiar to computer scientists. Such reviews indicate the start of a consolidation phase for the field of computer ethics. This distillation of diverse research threads into a cohesive fabric is critical for translating theory to applied best practices and laying the foundation for future work.

#### Remedying Bias

Beyond formalizing fairness into quantitative metrics, many researchers have also looked at algorithms that can detect or remedy bias. These works have often been implemented as useable tools for AI practitioners. Examples include IBM’s AI Fairness 360 Open Source Toolkit, Microsoft’s InterpretML and Tensorboard’s What If. 
