---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/about_ai/
---

# Importance of AI Ethics

*This section discusses what makes AI different from other technologies. The important questions of "When is AI not the answer?" is raised. Next, we discuss the politics of algorithms and the responsibility of researchers and engineers. Finally we have an overview of AI ethics frameworks and a summary of key principles.*

---

## How is AI different from other technologies?

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

---

We need to dispel the myth of the neutral AI. We need to fix widespread AI systems before they can do more harm. We need to reach out to all potential practitioners who can deploy these systems, from professional engineers to casual hobbyists.

<span class="emph">
	All three points above point to an urgent need for public awareness about AI ethics.
</span>

---

## When is AI not the answer?

<div>
<img class="comic" width="250px" src="{{ "/assets/guide/comics/notanswer_1_inverted.png" | relative_url }}" title='When the Question is, "What do you get if you multiply six by nine?"' alt="Is that a trick question?">
</div>

This is the most important question in this entire guide, and these days it can feel like the answer is, "Never."

AI technologies have been used for facial recognition, hiring, criminal sentencing, credit scoring. More unconventional applications include writing inspirational quotes ([link](http://inspirobot.me/)), coming up with Halloween costumes ([link](https://www.nytimes.com/interactive/2018/10/26/opinion/halloween-spooky-costumes-machine-learning-generator.html)), inventing new pizza recipes ([link](https://www.youtube.com/watch?v=WVvHCJls3yY)) and creating rap lyrics ([link](http://deepbeat.org/)).

<div>
<img class="comic" width="300px" src="{{ "/assets/guide/comics/notanswer_2_inverted.png" | relative_url }}" title="Linguine used Bind. It's super effective!" alt="Is that a trick question?">
</div>

<span class="emph">
	This section here is to remind the reader that not using AIS is an option. Think carefully about whether AI should be used for a problem at hand.
</span>

The superiority of AIS should not be taken for granted despite all the hype. For example, human professionals are often far better at explaining their decisions, as compared to AIS. It is immensely important to consider the trade-offs when deploying AIS and look critically at both pros and cons. In some cases, AIS may not actually offer significant benefits despite all the hype. Other common considerations include explainability and emotional and social qualities, where humans far outperform machines.

### AI + Human = Best of Both Worlds?

AI+Human systems are frequently perceived to be the best of both worlds. However, documented experiences have shown that in such systems, humans might have a tendency to defer to suggestions made by the AIS.

In her book Automating Inequality, Virginia Eubanks notes that child welfare officers working with a child abuse prediction model would choose to amend their own assessments in light of the model's predictions.

> Though the screen that displays the [Allegheny Family Screening Tool (AFST)] score states clearly that the system "is not intended to make investigative or other child welfare decisions," an ethical review released in May 2016 by Tim Dare from the University of Auckland and Eileen Gambrill from University of California, Berkeley, cautions that the AFST risk score might be compelling enough to make intake workers question their own judgement.

> According to Vaithianathan and Putnam-Hornstein, intake screeners have asked for the ability to go back and change their risk assessments after they see the AFST score, suggesting that they believe that the model is less fallible than human screeners.

*Automating Inequality (Virginia Eubanks, 2018) <dt-cite cite="eubanks2018automating"></dt-cite>*

Such observations are hardly surprising, given the daily exhortations of the reliability of machines. In fact, the human tendency to defer to automated decisions has been termed "automation bias" <dt-cite cite="skitka2000automation,citron2007technological"></dt-cite>. Unfortunately, this over-deference to machines potentially undermines the mutually complementary aspect of AI+Human models.

<div>
<img class="comic" width="300px" src="{{ "/assets/guide/comics/notanswer_3_inverted.png" | relative_url }}" title="The teller said she would be happy to help me reinstate my account if I can prove I am alive." alt="Over-deference to machines.">
</div>

### Neglected Ripples

More generally, when discussing the pros and cons of adopting an AIS solution, an oft-neglected consideration is how the AIS might change the behaviors of the humans interacting with the system i.e. cause ripples within the system. This is referred to the Ripple Effect Trap by Selbst et al. <dt-cite cite="selbst2019fairness"></dt-cite>. Examples of ripples include:

- Automation bias, as mentioned earlier. <tidbit content="This refers to an unwarranted bias towards automated decisions."></tidbit>
- Automation aversion. <tidbit content="The opposite of automation bias, this refers to a preference to disagree with automated decisions."></tidbit>
- Overconfidence in AIS-derived decisions. <tidbit content="While the well-known fallibility of humans remind us to double and triple check decisions, employing AIS might create a false sense of security."></tidbit>

System designers need to be acutely aware of such nuances and unintended consequences of using AIS in a larger sociotechnical context, as opposed to just thinking of AIS in isolation.

---

## Do AIS have Politics? `WIP`

*This section is heavily inspired by Langdon Winner's* Do Artifacts have Politics? *published in 1980.*

- Recognizing the politics of artifacts
- Recognizing the roles of AI engineers and researchers
- Recognizing the trade-offs and options available (e.g. not to develop)
- Recognizing that adoption of algorithms over humans also means adoption of a perspective that the algorithm is better than humans at the specific task (cumulation of efficiency, effectiveness etc.)

---

## A Quick Overview of AI Ethics Principles `WIP`

*Brief overview of AI frameworks and common principles. Show framework demo.*

---

## References

<dt-bibliography></dt-bibliography>

<script type="text/bibliography">

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
