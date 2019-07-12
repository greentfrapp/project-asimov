---
layout: general
title: literature review. \| Project Asimov
permalink: /literature_review/
---

<h1 id="title">Literature Review</h1>

## A review of related literature for [Project Asimov](https://greentfrapp.github.io/project-asimov/) and to illustrate the need for the project.

<dt-byline></dt-byline>

#### Contents

- [Introduction](#introduction)
- [AI Ethics Principles](#ai-ethics-principles)
- [Academic Publications](#academic-publications)
- [Popular Non-fiction](#popular-non-fiction)
- [Visualizations and Explorables](#visualizations-and-explorables)
- [Conclusion](#conclusion)
- [References](#references)

---

## Introduction

Artificial intelligence (AI) technologies have seen widespread use in recent years. These applications range from trivial to severe. Google Photos help to sort and label our photos automatically and Google Translate helps us communicate in foreign lands. On the other hand, AI systems are also used to provide advice for judges and juries in criminal sentencing and for doctors in diagnosing life-threatening diseases. What was once the fancy of science fiction authors has been made real enough to both save and endanger livelihoods and lives. In light of what is at stake, there is a growing need and a moral imperative for AI researchers, engineers and practitioners to understand the ethical issues associated with the technology. Amidst recent concerns about the ethics of AI systems (AIS), many articles and writings have been published in the interdisciplinary field of AI ethics. These range from official ethics guidelines to more mainstream non-fiction books, from academic publications and journal articles to online visualizations and "explorables".

Under the larger umbrella of AI ethics, algorithmic bias has been repeatedly cited as a pressing problem afflicting currently deployed systems. The term "algorithmic bias" can be defined as systematic unequal treatment by automated systems or machines. In Verma and Rubin's work (Verma & Rubin, 2018), the authors collated a list of twenty different fairness definitions used to evaluate algorithmic bias. O'Neil's popular book Weapons of Math Destruction (O'Neil, 2016) discusses the hidden biases present in algorithmic systems, or what she terms "weapons of math destruction". Urgently, many of the systems that O'Neil describes had been widely deployed and still remain so. In the 208-page behemoth Montréal Declaration (Montréal Declaration, 2018), the sixth principle of Equity states, "AIS must be designed and trained so as not to create, reinforce, or reproduce discrimination based on — among other things — social, sexual, ethnic, cultural, or religious differences." 

In this review, we look at four main types of literature in AI ethics and examine algorithmic bias in the context of these works.

---

## AI Ethics Principles

In the context of this review, AI ethics principles refer to official publications of ethical guidelines. Such guidelines are typically published by key organizations, which can be divided into five main categories (Fjeld et al., 2019):
- Civil society (e.g. Amnesty International, Access Now)
- Government (e.g. USA, China, Japan, Singapore)
- Multistakeholder (e.g. University of Montréal, Future of Life Institute)
- Inter-governmental organizations (e.g. Council of Europe, Organisation for Economic Co-operation and Development (OECD), United Nations (UN))
- Private sector (e.g. Google, Microsoft, Tencent)

Examples of AI ethics principles include the Amnesty International and Access Now’s Toronto Declaration (Amnesty International, 2018), USA’s Preparing for the Future of Artificial Intelligence (NSTC, 2016), University of Montréal’s Montréal Declaration, OECD’s Recommendation of the Council on Artificial Intelligence (OECD, 2019), and Microsoft’s Microsoft AI Principles (Microsoft, 2018). More recently, the Berkman Klein Center for Internet and Society at Harvard University launched the “Principled Artificial Intelligence Project” (Fjeld et al., 2019), which maps 32 sets of principles across eight themes of Privacy, Accountability, Safety and Security, Transparency and Explainability, Fairness and Non-discrimination, Human Control of Technology, Professional Responsibility, and Promotion of Human Values.

### A Growing Concern

The recent proliferation of these guidelines are a sign of growing concerns with AI ethics. In a piece discussing the governance of AI, Corinne Cath writes, “At the same time, AI may be misused or behave in unpredicted and potentially harmful ways. Questions on the role of the law, ethics and technology in governing AI systems are thus more relevant than ever before.” (Cath, 2018:2) This concern and alarm is also mentioned explicitly in many of these guidelines. The preamble of the Montréal Declaration states that “the development of artificial intelligence does pose major ethical challenges and social risks” (University of Montréal, 2018:7). The preamble of Singapore’s AI Governance Framework mentions that “AI also introduces new ethical, legal and governance challenges” (PDPC, 2019:2). Most importantly, the European Commission’s Ethics Guidelines for Trustworthy AI proclaims, “While offering great opportunities, AI systems also give rise to certain risks that must be handled appropriately and proportionately. We now have an important window of opportunity to shape their development. [emphasis mine]” (European Commission, 2019:4). The phrase “window of opportunity” suggests that we are at a critical juncture for the discussion and implementation of ethical AI.

### Communicating Ethical Guidelines

In light of the ethical AI emergency, these principles establish the foundations for future political and legislative policies. However, they are often dry and frequently lack illustrative examples. Policymakers may be used to the nature of such formal texts, but they can be unpalatable for many AI practitioners and general consumers. Given the pervasive nature of AI technologies, it is critical for both AI practitioners and general users to be aware of related ethical problems. AI practitioners need to understand that their responsibility extends beyond optimizing for efficiency and accuracy. As creators and enablers of AI technologies, practitioners are also gatekeepers for the ethical use of their creations. On the other hand, general consumers need to know enough to protect themselves from harmful AI technologies. This can be by making informed purchasing choices or exercising their power as political citizens. But all these can only happen with public education and awareness of AI ethics.

In an article criticizing the illegibility of privacy policies, Litman-Navarro (2019) used the Lexile test (MetaMetrics, 2019) to analyze 150 privacy policies. The Lexile test “measures a text’s complexity based on factors like sentence length and the difficulty of vocabulary” (Litman-Navarro, 2019), with higher scores for more complex texts. The author found that the vast majority of privacy policies scored over 1300 on the Lexile test, which approximates to a college-level reading ability. To put things in perspective, Litman-Navarro also reported Lexile scores for classic texts such as Jane Austen’s Pride and Prejudice (1060), Charles Dickens’s Great Expectations (1150) and Stephen Hawking’s A Brief History of Time (1300).

In a similar manner, we can analyze the ethical guidelines for their readability. For instance, the Toronto Declaration (Amnesty International, 2018) and USA’s Preparing for the Future of Artificial Intelligence (NSTC, 2016) have Lexile scores of 1400 to 1500. This means that the language used in these guidelines are more complex than privacy policies when measured by the Lexile test. [Need to substantiate with more metrics.] The complexity of these texts, coupled with the urgency of their message, indicates the need for alternatives that can better communicate AI ethics.

### Conclusion

In summary, the proliferation of ethical guidelines demonstrate the urgency of embedding appropriate ethics into AI systems. In addition to policymakers, AI practitioners and public consumers are important stakeholders who have to be aware of pertinent issues in AI ethics. However, the nature of these guidelines prevent them from effectively communicating to AI practitioners and the general public. This suggests a need for more relatable alternatives, targeted at these audiences.

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Academic Publications

In the realm of computer science, the FAT (Fairness, Accountability, Transparency) movement has been gaining momentum in recent years. The seminal conferences Fairness, Accountability, and Transparency in Machine Learning (FATML) and Association for Computing Machinery's Conference on Fairness, Accountability, and Transparency (ACM FAT\*) were started in 2014 and 2018 respectively. However, concerns about algorithmic bias actually date as far back as 1985, in a paper aptly titled, "What is Computer Ethics?" by James H. Moor (1985). Moor defines computer ethics as "the analysis of the nature and social impact of computer technology and the corresponding formulation and justification of policies for the ethical use of such technology". Friedman and Nissenbaum's work on bias in computer systems in the 1990s also set the stage for modern discussions of algorithmic bias (Friedman & Nissenbaum, 1996).

In his 1985 essay, Moor observed a "policy vacuum" and a "conceptual vacuum" in computer ethics. Fastforward more than 30 years, Moor might be pleased to learn that there has been a proliferation of publications related to computer ethics. For example, Verma and Rubin (2018) reviewed twenty different fairness definitions applied to algorithmic systems. Similarly, Narayanan (2018) gave a tutorial titled "21 Fairness Definitions and Their Politics" in the 2018 ACM FAT* conference. These fairness definitions stemmed from multiple papers that sought to define fairness in mathematical terms - a language familiar to computer scientists. Such reviews indicate the start of a consolidation phase for the field of computer ethics. This distillation of diverse research threads into a cohesive fabric is critical for translating theory to applied best practices and laying the foundation for future work.

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Popular Non-fiction

O'Neil's Weapons of Math Destruction (2016) remains one of the most popular mainstream publications about algorithmic bias. Other related publications include Eubank's Automating Inequality (2018) and Broussard's Artificial Unintelligence (2018). Contrary to the more neutral tone of official ethical guidelines, these authors often adopt harshly critical attitudes against the neglectful use of algorithms. These books often pit the authors against tech companies and the tech industry in general. For example, chapter 6 of Broussard's Artificial Unintelligence is an unabashedly scathing take on gender and racial politics in computer science and the tech industry. To quote Broussard's concluding remarks:

> To recap: we have a small, elite group of men who tend to overestimate their mathematical abilities, who have systematically excluded women and people of color in favor of machines for centuries, who tend to want to make science fiction real, who have little regard for social convention, who don’t believe that social norms or rules apply to them, who have unused piles of government money sitting around, and who have adopted the ideological rhetoric of far-right libertarian anarcho-capitalists.

Academic researchers may object to such emotional writing. However, these pieces serve as important reminders that AI ethics is not simply about observing guidelines, optimizing fairness metrics and updating terms and conditions. Fairness and justice are powerful ideals that have ignited the hearts of revolutionaries and abolitionists. It would be a shame to reduce them to equations and rules. Instead, AI ethics needs to be a deliberate dialogue between the emotional and the logical.

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Visualizations and Explorables

`WIP`

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Conclusion

`WIP`

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## References

Amnesty International & Access Now. (2018). Toronto Declaration. Retrieved from [https://www.accessnow.org/the-toronto-declaration-protecting-the-rights-to-equality-and-non-discrimination-in-machine-learning-systems/](https://www.accessnow.org/the-toronto-declaration-protecting-the-rights-to-equality-and-non-discrimination-in-machine-learning-systems/)

Beijing Academy of Artificial Intelligence (BAAI). (2019). Beijing AI Principles (人工智能北京共识). Retrieved from [https://www.baai.ac.cn/blog/beijing-ai-principles](https://www.baai.ac.cn/blog/beijing-ai-principles)

Broussard, M. (2018). *Artificial unintelligence: How computers misunderstand the world*. MIT Press.

Eubanks, V. (2018). *Automating inequality: How high-tech tools profile, police, and punish the poor*. St. Martin’s Press.

European Commission. (2019). Ethics Guidelines for Trustworthy AI. Retrieved from [https://ec.europa.eu/digital-single-market/en/news/ethics-guidelines-trustworthy-ai](https://ec.europa.eu/digital-single-market/en/news/ethics-guidelines-trustworthy-ai)

Fjeld, J., Hilligoss, H., Achten, N., Daniel, M. L., Feldman, J., Kagay, S. and Singh, A. (2019) Principled Artificial Intelligence. Retrieved from [https://ai-hr.cyber.harvard.edu/primp-viz.html](https://ai-hr.cyber.harvard.edu/primp-viz.html)

Friedman, B., & Nissenbaum, H. (1996). Bias in computer systems. ACM Transactions on Information Systems (TOIS), 14(3), 330-347.

Litman-Navarro, K. (2019). We Read 150 Privacy Policies. They Were an Incomprehensible Disaster. New York Times. Retrieved from [https://www.nytimes.com/interactive/2019/06/12/opinion/facebook-google-privacy-policies.html](https://www.nytimes.com/interactive/2019/06/12/opinion/facebook-google-privacy-policies.html)

University of Montréal. (2018). Montréal Declaration for a Responsible Development of Artificial Intelligence. Retrieved from [https://www.montrealdeclaration-responsibleai.com/](https://www.montrealdeclaration-responsibleai.com/)

Moor, J. H. (1985). What is computer ethics?. Metaphilosophy, 16(4), 266-275.

Narayanan, A. (2018, February). Translation tutorial: 21 fairness definitions and their politics. In Proc. Conf. Fairness Accountability Transp., New York, USA.

National Science and Technology Council (NSTC). (2016). Preparing for the Future of Artificial Intelligence. Retrieved from [https://obamawhitehouse.archives.gov/sites/default/files/whitehouse_files/microsites/ostp/NSTC/preparing_for_the_future_of_ai.pdf](https://obamawhitehouse.archives.gov/sites/default/files/whitehouse_files/microsites/ostp/NSTC/preparing_for_the_future_of_ai.pdf)

O’Neil, C. (2016). *Weapons of math destruction: How big data increases inequality and threatens democracy*. Broadway Books.

Organisation for Economic Co-operation and Development (OECD). (2019). Recommendation of the Council on Artificial Intelligence. Retrieved from [https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449](https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449)

Personal Data Protection Commission (PDPC). (2019). A Proposed Model Artificial Intelligence Governance Framework. Retrieved from [https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Resource-for-Organisation/AI/A-Proposed-Model-AI-Governance-Framework-January-2019.pdf](https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Resource-for-Organisation/AI/A-Proposed-Model-AI-Governance-Framework-January-2019.pdf)

Verma, S., & Rubin, J. (2018, May). Fairness definitions explained. In 2018 IEEE/ACM International Workshop on Software Fairness (FairWare) (pp. 1-7). IEEE.
