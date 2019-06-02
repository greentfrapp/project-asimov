---
layout: outline
title: outline 1. \| Project Asimov
permalink: /outline_part1/
---

<h1 id="title">Outline 1</h1>

## Draft outline for deliverable to Part I targetting programmers and AI practitioners.

<a href="https://greentfrapp.github.io/project-asimov/" target="_self">Project Asimov</a>

<dt-byline></dt-byline>

#### Contents

- [Introduction](#introduction)
- [Definitions](#definitions)
- [What's Up with AI?](#whats-up-with-ai)
- [Bias - A Pressing Problem](#bias-a-pressing-problem)
- [Useful Tools](#useful-tools)
- [Other Short-term Issues](#other-short-term-issues)
- [Long-term Considerations](#long-term-considerations)
- [td;dr](#tldr)

---

## Introduction

Highlight the need for a relatable guide to artificial intelligence and its problems. 

Focus on short-term problems, specifically **bias**.

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Definitions

Some references to official definitions here - but we should go with a more layperson one with examples.

### Artificial Intelligence (AI)

> The best policy research on AI should use the word artificial intelligence in an abstract sense as few times as possible. AI has become too prone to hype and it’s too broad of a concept to be analytically coherent or useful, encompassing anything from subfields of fuzzy mathematics to research on decentralized drone warfare. Analysts should rigorously force themselves to specify what claims they are making about “AI” in terms of the domain and technological layer they are talking about.

*ChinAI #50 ([Ding, 2019](https://chinai.substack.com/p/chinai-50-ft-follow-up-chinese-americans))*

> “Artificial Intelligence (AI)” refers to a set of technologies that seek to simulate human traits such as knowledge, reasoning, problem solving, perception, learning and planning. AI technologies rely on AI algorithms to generate models. The most appropriate model(s) is/are selected and deployed in a production system. 

*Singapore's AI Governance Framework ([PDPC, 2019](https://www.pdpc.gov.sg/-/media/Files/PDPC/PDF-Files/Resource-for-Organisation/AI/A-Proposed-Model-AI-Governance-Framework-January-2019.pdf))*

> Artificial intelligence (AI) refers to systems that display intelligent behaviour by analysing their environment and taking actions – with  some  degree  of autonomy – to achieve  specific  goals.AI-basedsystems  can  be  purely  software-based,  acting  in  the  virtual  world  (e.g.  voice  assistants,  image  analysis software,  search  engines,  speech  and  face  recognition  systems)  or  AI  can  be  embedded  in  hardware  devices  (e.g. advanced robots,  autonomous  cars,  drones or Internet of Things applications)

*European Commission's  Communication on AI ([European Commission, 2019](https://ec.europa.eu/transparency/regdoc/rep/1/2018/EN/COM-2018-237-F1-EN-MAIN-PART-1.PDF))*

> An AI system is a machine-based system that can, for a given set of human-defined objectives, make predictions, recommendations, or decisions influencing real or virtual environments. AI systems are designed to operate with varying levels of autonomy.

*OECD's Recommendation of the Council on Artificial Intelligence ([OECD, 2019](https://legalinstruments.oecd.org/en/instruments/OECD-LEGAL-0449#_ga=2.226001754.1981916758.1559405727-1571659269.1558615432))*

### Bias

See Article 2 of the Universal Declaration of Human Rights (below).

### Fairness

> We capture fairness by the principle that any two individuals who are similar with respect to a particular taskshould be classified similarly. 

*Fairness Through Awareness ([Dwork, 2011](https://arxiv.org/pdf/1104.3913.pdf))*

### Human Rights

#### On Fairness

> Everyone is entitled to all the rights and freedoms set forth in this Declaration, without distinction of any kind, such as race, colour, sex, language, religion, political or other opinion, national or social origin, property, birth or other status.  Furthermore, no distinction shall be made on the basis of the political, jurisdictional or international status of the country or territory to which a person belongs, whether it be independent, trust, non-self-governing or under any other limitation of sovereignty.

*Article 2 in the Universal Declaration of Human Rights ([UN General Assembly, 1948](https://www.un.org/en/universal-declaration-human-rights/))*

#### On Privacy

> No one shall be subjected to arbitrary interference with his privacy, family, home or correspondence, nor to attacks upon his honour and reputation. Everyone has the right to the protection of the law against such interference or attacks.

*Article 12 in the Universal Declaration of Human Rights ([UN General Assembly, 1948](https://www.un.org/en/universal-declaration-human-rights/))*

> The  Constitution  of  the  Republic  of  Singapore  does  not  include  a  right to privacy.

*The Right to Privacy in Singapore: Stakeholder Report Universal Periodic Review 24th Session ([Privacy International, 2015](https://uprdoc.ohchr.org/uprweb/downloadfile.aspx?filename=2354&file=EnglishTranslation))*

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## What's Up with AI?

Here we explore what makes AI different from past technologies.

#### Illusion of omnipotence

Product of decades of science fiction, many hopeful scientists and a ton of marketing hype.

#### Speed and scale

Often able to make decisions orders of magnitude faster than any manual system. Note that this says nothing about the quality of decisions.

#### Complexity and opacity

Dense mathematics making it difficult for non-practitioners to understand what is under the hood, even intuitively. Worsened by the **illusion of omnipotence**, where marketers help consumers believe in magically conscious robots, as well as exaggerated media reporting.

#### Trust(?)

<div class='note note-left'>
	<p>
		I am not sure if I agree with the use of the term "trustworthy" by the European Commission, which might be taken to mean that the AI is a conscious entity capable of earning trust. We don't think about <i>trustworthy cars</i> or <i>trustworthy guns</i>, partly because we recognize that the attribute lies with the human operator rather than the tool - so why <i>trustworthy AI</i>?
	</p>
</div>

> Trustworthyiness is a prerequisite for people and societies to develop, deploy and use AI systems. Without AI systems – and the human beings behind them – being demonstrably worthy of trust, unwanted consequences may ensue and their uptake might be hindered, preventing the realisation of the potentially vast  social and economic benefits that they can bring.

*Ethics Guidelines for Trustworthy AI ([European Commission, 2019](https://ec.europa.eu/digital-single-market/en/news/ethics-guidelines-trustworthy-ai))*

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Bias - A Pressing Problem

Each subsection here probably deserves a separate section of its own.

#### The Illusion of Neutrality

Highlight that algorithms inherit the biases of the human designers and the human-collected data. Unlike with mathematical equations, there is often no provably correct solution in the real world.

#### Types of Bias

- The technology being unavailable to certain demographics
	- Amazon's Prime Free Same-Day Delivery service was only offered to certain districts - often the richer and whiter ones ([link](https://www.bloomberg.com/graphics/2016-amazon-same-day/))
- The technology working better for certain demographics
	- *In this case, the accuracy (or other related measure) of the algorithm differs depending on the demographic*
	- Facial recognition algorithms are notorious for working better on certain skin colors and genders - see Joy Buolamwini's [Gender Shades project](http://gendershades.org/overview.html)
	- Sometimes, this is inevitable and a tradeoff must be considered - see this [ProPublica piece](https://www.propublica.org/article/bias-in-criminal-risk-scores-is-mathematically-inevitable-researchers-say)
- The technology (dis)advantaging certain demographics
	- *In this case, the algorithm might be "accurate" but causes harm to certain demographics*
	- See [this piece](https://www.wired.com/story/ideas-joi-ito-insurance-algorithms/) by Joi Ito
	- Examples include the use of algorithms for [predicting recividism](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing), [credit scoring](https://www.demos.org/research/discredited-how-employment-credit-checks-keep-qualified-workers-out-job) and [hiring](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08G)

#### Hidden bias (correlations)
#### Feedback loops
#### No corrective samples
#### Favoring / harming / works better / worse for certain demographics
#### Only available to certain demographics
#### When is bias not bias?
#### Explainability vs transparency and what these concepts mean for bias

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Useful Tools

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Other Short-term Issues

- Privacy
	- Online and public spaces
	- The right to be forgotten
- Explainability
- Transparency
- Accountability
- Robustness
- Fabrication and misinformation

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Long-term Considerations

- Consciousness and rights
- Human-AI alignment
- Singularity

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## tl;dr

<div class="return-to-top"><a href="#title">[Return to top]</a></div>
