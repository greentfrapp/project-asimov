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
	- [Illusion of Omnipotence](#illusion-of-omnipotence)
	- [Speed and Scale](#speed-and-scale)
	- [Complexity and Opacity](#complexity-and-opacity)
	- [Trust(?)](#trust)
- [Bias - A Pressing Problem](#bias-a-pressing-problem)
	- [The Illusion of Neutrality](#the-illusion-of-neutrality)
	- [Types of Bias](#types-of-bias)
	- [Hidden Bias](#hidden-bias-correlations)
	- [Feedback Loops / No Correction](#feedback-loops--no-correction)
	- [When is Bias Not Bias?](#when-is-bias-not-bias)
	- [Transparency vs Explainability](#transparency-vs-explainability-and-what-these-concepts-mean-for-bias)
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

### Accuracy and Other Metrics

#### Accuracy

#### False Positives and False Negatives

#### Recall and Precision

### Algorithm vs Model

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

Dedicated to understanding the nature of algorithmic bias. Each subsection here probably deserves a separate section of its own.

#### The Illusion of Neutrality

Highlight that algorithms inherit the biases of the human designers and the human-collected data. Unlike with mathematical equations, there is often no provably correct solution in the real world. In fact, in some cases, all solutions are "wrong" and we have to decide what type of wrong do we want (see second point in **Types of Bias**)

#### Types of Bias

- The technology being unavailable to certain demographics
	- Amazon's Prime Free Same-Day Delivery service was only offered to certain districts - often the richer and whiter ones ([link](https://www.bloomberg.com/graphics/2016-amazon-same-day/))
- The technology working better for certain demographics
	- *In this case, the accuracy (or other related measure) of the algorithm differs depending on the demographic*
	- Facial recognition algorithms are notorious for working better on certain skin colors and genders - see Joy Buolamwini's [Gender Shades project](http://gendershades.org/overview.html) **[Possible Demo]**
	- Sometimes, this is inevitable and a tradeoff is required - see this [ProPublica piece](https://www.propublica.org/article/bias-in-criminal-risk-scores-is-mathematically-inevitable-researchers-say) **[Possible Demo]**
- The technology (dis)advantaging certain demographics
	- *In this case, the algorithm might be "accurate" but causes harm to certain demographics*
	- See [this piece](https://www.wired.com/story/ideas-joi-ito-insurance-algorithms/) by Joi Ito
	- Examples include the use of algorithms for [predicting recividism](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing), [credit scoring](https://www.demos.org/research/discredited-how-employment-credit-checks-keep-qualified-workers-out-job) and [hiring](https://www.reuters.com/article/us-amazon-com-jobs-automation-insight/amazon-scraps-secret-ai-recruiting-tool-that-showed-bias-against-women-idUSKCN1MK08G)

#### Hidden Bias (correlations)

**[Possible Demo]**

This refers to when certain sensitive features (e.g. race) are removed from training data, but the resulting model still shows bias. For instance, the districts with Amazon's Prime Free Same-Day Delivery were apparently chosen without considering racial composition. However, the chosen districts showed obvious racial differences.

This happens primarily because other features in the dataset are correlated with the sensitive features or share confounding factors. This needs to be highlighted because naively removing sensitive features might give practitioners a false sense of security about fairness.

In fact, in some cases, sensitive features *should* be included in the dataset so that it is easier to spot when the algorithm is biased. See [this paper](https://arxiv.org/abs/1104.3913) by Dwork et al. (2011) for more details.

#### Feedback Loops / No Correction

**[Possible Demo]**

This refers to when the algorithms perpetuate feedback loops. 

For example, suppose the police uses a model to predict high-crime areas to patrol. The police then increases patrols at these areas. Because there are more patrols, more crime is reported and recorded. These reports are submitted and confirm and reinforce the algorithm's predictions.

But suppose the model was wrong in the first place and it missed out a certain high-crime area? This area gets less attention and there are less arrests, which again reinforces the model's predictions.

In other words, sometimes, the system is set up such that it does not matter whether the model is correct or wrong - the model will be apparently correct. In such cases, irrational biases may appear to be statistically significant.

#### When is bias not bias?

**[Possible Demo]**

In an era of social justice warriors and South Park's PC Bros, it has become difficult to distinguish bias from legit correlation and causation.

In Chapter 6 of Cathy O'Neill's *Weapons of Math Destruction*, the author describes how employers might discriminate against certain demographics (along aspects of race, gender, age, health) via a variety of mechanisms. The author also raises the possibility of a future where employers have access to an individual's predisposition to certain illnesses and estimated mortality and avoid hiring individuals who might be racking up on sick leaves and healthcare expenditures.

But this is a tricky issue. In most cases, more confident and outspoken candidates stand a better chance of getting a job. Should we consider this as discriminating individuals who are less confident and afraid of speaking up? What is the difference between *level of confidence* and *race*? Why is it okay to use one factor as a job criteria but taboo to use the other?

We don’t say that the Olympics are biased against physically unfit people. So when does a legitimate factor become a cause for bias?

#### Transparency vs Explainability and What These Concepts Mean for Bias

**[Possible Demo]**

In essence, a neural network can be made *transparent* by simply making the weights publicly available. However, this does not make the neural network's decisions anymore *explainable* in human terms.

In the context of bias, lack of transparency and explainability of algorithms result in hidden biases, which could be mistakenly justified.

But also consider the possibility of the algorithms being *gamed* if they are made completely transparent and explainable. There's a reason why exam papers and interview questions are kept confidential.

<div class="return-to-top"><a href="#title">[Return to top]</a></div>

---

## Useful Tools

Tools for mitigating and catching algorithm bias and how to use them.

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
