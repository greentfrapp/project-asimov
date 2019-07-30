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
