---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/basics/
---

# Basics

---

## Ethics of Artificial Intelligence (AI Ethics)

> On my view, *computer ethics* is the analysis of the nature and social impact of computer technology and the corresponding formulation and justification of policies for the ethical use of such technology.

*What is Computer Ethics? (Moor, 1985) <dt-cite cite="moor1985computer"></dt-cite>*

Discussions of AI ethics typically fall into two main categories: treatment of AIS by humans and treatment of humans by AIS.

### Treatment of AI Systems by Humans

<div>
<img class="comic" width="380px" src="{{ "/assets/guide/comics/andrew_inverted.png" | relative_url }}" title="I don’t know what he feels inside but I don’t know what you feel inside. When you talk to him you’ll find he reacts to the various abstractions as you and I do, and what else counts? If someone else’s reactions are like your own, what more can you ask for?" alt="Siri is not a tiny sprite living in an iPhone.">
</div>

Anyone who has been touched by Robin Williams's portrayal of Andrew in Bicentennial Man might have thought about the idea of granting rights to robots and AIS. In Life 3.0, author Max Tegmark recounts a heated discussion between Larry Page and Elon Musk on robot rights <dt-cite cite="tegmark2017life"></dt-cite>.

> At times, Larry accused Elon of being "specieist": treating certain life forms as inferior just because they were silicon-based rather than carbon-based.

Nevertheless, AIS that demand us to rethink notions of humanity and consciousness still remain on the far-flung horizon.

### Treatment of Humans by (Other Humans via) AI Systems

More urgently, we need to consider the effects of present AI systems on human moral ideals.

AI systems can promote human values. Low-cost automated medical diagnoses enable more accessible medical services. Fraud detection algorithms in banks help to prevent illegitimate transactions.

But AI can also violate human values. The use of generative models to create fake articles, videos and photos threatens our notion of truth. The use of facial recognition on public cameras disrupt our conventional understanding of privacy. The use of biased algorithms to hire workers and sentence criminals violate our values of fairness and justice.

The pervasive nature of AI systems means that these systems potentially affect millions and billions of lives. Many important institutions (political, judicial, financial) are increasingly augmented by AI systems. In short, it is critical to get things right before human civilization blows up in our faces.

AI ethics goes beyond philosophical musings and thought experiments. It tries to fix the real problems cropping up from so-called solutions. Most importantly, the human researchers and engineers behind AI systems have to understand the tremendous power and responsibility that they possess.

See the [AIEthics section](../about_ai/) for a more detailed look at what makes modern AI different from previous technologies.

<div class="box-red">
<p class="emph">
  TL;DR - For the remainder of this guide, ethics of artificial intelligence (AI ethics) refers to the study of how AIS affect, promote and violate human moral ideals, including justice, autonomy and privacy. In particular, we note that current AIS are still created, deployed and maintained by humans.
</p>
</div>

---

## Artificial Intelligence Systems (AIS)

> An AIS is any computing system using artificial intelligence algorithms, whether it’s software, a connected object or a robot.

*The Montréal Declaration, 2018 <dt-cite cite="montreal2018"></dt-cite>*

The Montréal Declaration's 10 principles refers extensively to "AIS" instead of "AI". This guide will do the same because the term "system" serves as a reminder that we are looking at a complex network of parts that work together to make a prediction.

<div>
<img class="comic" width="815px" src="{{ "/assets/guide/comics/siri_inverted.png" | relative_url }}" title="Before working at Apple, Siri acted at Studio Ghibli." alt="Siri is not a tiny sprite living in an iPhone.">
</div>

<p class="box-blue">
  Siri is not a tiny sprite that lives in iPhones. Siri is an entire digital supply chain from initial conception to data collection to model training to deployment to maintenance and finally retirement. The same is true for any other AIS, including Google Translate, Amazon Rekognition and Northpointe's COMPAS. This big-picture perspective is important. It reminds us that we have to look at the entire system and infrastructure when we talk about AI ethics.
</p>

In addition to a digital supply chain, AIS also have physical supply chains that comprise energy usage, resource extraction and hardware recycling or disposal. These physical supply chains can be due to cloud servers, physical devices or simply the electricity and hardware used to train and house the models.

The AI Now Institute also has a fantastic illustration titled [Anatomy of an AI System](https://anatomyof.ai/) that considers AIS in terms of "material resources, human labor, and data".

Finally, "system" also includes the sociotechnical context where the AIS is applied. This includes the culture, norms and values of the application, the domain and the geography and society. These values can be formalized (e.g. laws) or informal (e.g. unwritten customs and traditions). In particular, concepts such as justice and fairness are specific to context and differ from case to case.

<div class="box-red">
	<p class="emph">
		TL;DR - For the remainder of this guide, Artificial Intelligence Systems (AIS) refer to the entirety of an artificial intelligence application or solution, in terms of:
	</p>
	<ul class="emph">
		<li>Digital lifecycle (conceptualization to retirement),</li>
		<li>Physical lifecycle (resource extraction to hardware disposal), and</li>
    <li>Sociotechnical context (culture, norms and values).</li>
	</ul>
</div>

---

## What is different about AI?

### Illusion of Fairness

Since machines have no emotions, we often assume that they would be impartial and make decisions without fear or favor.

This assumption is flawed. For one, guns too, have no capacity for prejudice. But a gun wielded by different people can have vastly different moral embeddings. The same can be said for AIS. Moreover, the data used to train machine learning models can be a tremendous source of bias. A hiring model trained with sexist employment records would obviously suggest similarly sexist decisions.

<div>
<img class="comic" width="500px" src="{{ "/assets/guide/comics/illusion_inverted.png" | relative_url }}" title="Maybe you need to dress and walk more confidently." alt="Machine learning relies on datasets.">
</div>

This illusion of fairness provides unwarranted justification for widespread deployment of AIS without adequate control. But fairness is not a natural by-product of AIS. It is a quality that has to be carefully designed for.

### Speed and Scale

The shipping industry revolutionized trade, enabling it to be conducted on an international scale across maritime trade routes. Previously lengthy land detours had much quicker maritime alternatives. But this increase in speed and scale also facilitated the rapid spread of the Black Death.

Many of today's AIS function on an unprecedented speed and scale. Google Translate serves over 500 million queries a day. Amazon's Rekognition claims to be able to perform "real-time face recognition across tens of millions of faces". Previously expensive, slow, one-to-one functions can now be automated to become cheaper, faster and serve much larger audiences. This means more people can benefit from AIS. But just like the Black Death supercharged by rats on merchant ships, this crazy speed and scale also applies to any inherent problems (e.g. biases, privacy violations).

<div>
<img class="comic" width="500px" src="{{ "/assets/guide/comics/scale_inverted.png" | relative_url }}" title="It's a Rock Fact!" alt="Speed and scale applies to both benefits and problems.">
</div>

### Accessibility

AI research has largely been open. The vast majority of researchers share their work freely on arxiv.org and GitHub. Advances in hardware mean that consumer-grade computers are sufficient to execute many algorithms. More resource-intensive algorithms can be trained on the cloud via services such as Amazon Web Services, Google Cloud and Microsoft Azure. Open-source software libraries and datasets are available to anyone with Internet access.

<div>
<img class="comic" width="350px" src="{{ "/assets/guide/comics/accessibility_inverted.png" | relative_url }}" title="The axes are probably on logarithmic scales." alt="Accessibility versus Capacity for Harm.">
</div>

The combination of accessible research, hardware, software and data means that many people have the ability to train and deploy their own AIS for personal use. A powerful technology is now openly accessible to unregulated individuals who may use it for any purpose they deem fit. Consider the examples of DeepFakes and DeepNude. These open-source programs use Generative Adversarial Networks and variants of the pix2pix algorithm to generate realistic pornographic media of unwitting individuals.

<div class="box-red">
  <p>
    We need to dispel the myth of the neutral AI. We need to fix widespread AI systems before they can do more harm. We need to reach out to all potential practitioners who can deploy these systems, from professional engineers to casual hobbyists.
  </p>
  <p class="emph">
    All three points above point to an urgent need for public awareness about AI ethics.
  </p>
</div>

---

# The Most Important Question

## When is AI not the answer?

<div>
<img class="comic" width="250px" src="{{ "/assets/guide/comics/notanswer_1_inverted.png" | relative_url }}" title='When the Question is, "What do you get if you multiply six by nine?"' alt="Is that a trick question?">
</div>

This is the most important question in this entire guide, and these days it can feel like the answer is, "Never."

<p class="emph box-red">
  This section here is to remind the reader that not using AIS <em>is</em> an option.
</p>

AI technologies have been used for facial recognition, hiring, criminal sentencing, credit scoring. More unconventional applications include writing inspirational quotes ([link](http://inspirobot.me/)), coming up with Halloween costumes ([link](https://www.nytimes.com/interactive/2018/10/26/opinion/halloween-spooky-costumes-machine-learning-generator.html)), inventing new pizza recipes ([link](https://www.youtube.com/watch?v=WVvHCJls3yY)) and creating rap lyrics ([link](http://deepbeat.org/)).

<div>
<img class="comic" width="300px" src="{{ "/assets/guide/comics/notanswer_2_inverted.png" | relative_url }}" title="Linguine used Bind. It's super effective!" alt="Is that a trick question?">
</div>

But the superiority of AIS should not be taken for granted despite all the hype. For example, human professionals are often far better at explaining their decisions, as compared to AIS. It is immensely important to consider the trade-offs when deploying AIS and look critically at both pros and cons. In some cases, AIS may not actually offer significant benefits despite all the hype. Other common considerations include explainability and emotional and social qualities, where humans far outperform machines.

### AI + Human = Best of Both Worlds?

AI+Human systems are frequently perceived to be the best of both worlds. However, documented experiences have shown that in such systems, humans might have a tendency to defer to suggestions made by the AIS.

<div class="box-blue">

<p>
  In her book Automating Inequality, Virginia Eubanks notes that child welfare officers working with a child abuse prediction model would choose to amend their own assessments in light of the model's predictions.
</p>

<blockquote>
  <p>
    Though the screen that displays the [Allegheny Family Screening Tool (AFST)] score states clearly that the system "is not intended to make investigative or other child welfare decisions," an ethical review released in May 2016 by Tim Dare from the University of Auckland and Eileen Gambrill from University of California, Berkeley, cautions that the AFST risk score might be compelling enough to make intake workers question their own judgement.
  </p>
</blockquote>
<blockquote>
  <p>
    According to Vaithianathan and Putnam-Hornstein, intake screeners have asked for the ability to go back and change their risk assessments after they see the AFST score, suggesting that they believe that the model is less fallible than human screeners.
  </p>
</blockquote>

<p><em>Automating Inequality (Virginia Eubanks, 2018) <dt-cite cite="eubanks2018automating"></dt-cite></em></p>
</div>

Such observations are hardly surprising, given the daily exhortations of the reliability of machines. In fact, the human tendency to defer to automated decisions has been termed "automation bias" <dt-cite cite="skitka2000automation,citron2007technological"></dt-cite>. Unfortunately, this over-deference to machines potentially undermines the mutually complementary aspect of AI+Human models.

<div>
<img class="comic" width="300px" src="{{ "/assets/guide/comics/notanswer_3_inverted.png" | relative_url }}" title="The teller said she would be happy to help me reinstate my account if I can prove I am alive." alt="Over-deference to machines.">
</div>

### Neglected Ripples

More generally, when discussing the pros and cons of adopting an AIS solution, an oft-neglected consideration is how the AIS might change the behaviors of the humans interacting with the system i.e. cause ripples within the system. This is referred to the Ripple Effect Trap by Selbst et al. <dt-cite cite="selbst2019fairness"></dt-cite>. Examples of ripples include:

- Automation bias, as mentioned earlier. <tidbit content="This refers to an unwarranted bias towards automated decisions."></tidbit>
- Automation aversion. <tidbit content="The opposite of automation bias, this refers to a preference to disagree with automated decisions."></tidbit>
- Overconfidence in AIS-derived decisions. <tidbit content="While the well-known fallibility of humans remind us to double and triple check decisions, employing AIS might create a false sense of security."></tidbit>

<div class="box-red">
  <p class="emph">
    System designers need to be acutely aware of such nuances and unintended consequences of using AIS in a larger sociotechnical context, as opposed to just thinking of AIS in isolation.
  </p>
</div>

<tofro prevtext="Intro" prevlink="../" nexttext="What's Up with Fairness?" nextlink="../fairness/"></tofro>

## References

<dt-bibliography></dt-bibliography>

<script type="text/bibliography">

@inproceedings{montreal2018,
  title={The Montréal Declaration},
  author={Université de Montréal},
  booktitle={The Montréal Declaration for a Responsible Development of Artificial Intelligence},
  pages={1-308},
  year={2018},
  organization={Université de Montréal}
}

@article{moor1985computer,
  title={What is computer ethics?},
  author={Moor, James H},
  journal={Metaphilosophy},
  volume={16},
  number={4},
  pages={266--275},
  year={1985},
  publisher={Wiley Online Library}
}

@book{tegmark2017life,
  title={Life 3.0: Being human in the age of artificial intelligence},
  author={Tegmark, Max},
  year={2017},
  publisher={Knopf}
}

@book{eubanks2018automating,
  title={Automating inequality: How high-tech tools profile, police, and punish the poor},
  author={Eubanks, Virginia},
  year={2018},
  publisher={St. Martin's Press}
}

@article{citron2007technological,
  title={Technological due process},
  author={Citron, Danielle Keats},
  journal={Wash. UL Rev.},
  volume={85},
  pages={1249},
  year={2007},
  publisher={HeinOnline}
}

@article{skitka2000automation,
  title={Automation bias and errors: are crews better than individuals?},
  author={Skitka, Linda J and Mosier, Kathleen L and Burdick, Mark and Rosenblatt, Bonnie},
  journal={The International journal of aviation psychology},
  volume={10},
  number={1},
  pages={85--97},
  year={2000},
  publisher={Taylor \& Francis}
}

@inproceedings{selbst2019fairness,
  title={Fairness and abstraction in sociotechnical systems},
  author={Selbst, Andrew D and Boyd, Danah and Friedler, Sorelle A and Venkatasubramanian, Suresh and Vertesi, Janet},
  booktitle={Proceedings of the Conference on Fairness, Accountability, and Transparency},
  pages={59--68},
  year={2019},
  organization={ACM}
}
