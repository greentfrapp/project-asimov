<!-- ---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/basics/
--- -->

# Basics

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

## Ethics of Artificial Intelligence (AI Ethics)

> On my view, *computer ethics* is the analysis of the nature and social impact of computer technology and the corresponding formulation and justification of policies for the ethical use of such technology.

*What is Computer Ethics? (Moor, 1985) <dt-cite cite="moor1985computer"></dt-cite>*

Discussions of AI ethics typically fall into two main categories: treatment of AIS by humans and treatment of humans by AIS.

### Treatment of AIS by Humans

<div>
<img class="comic" width="380px" src="{{ "/assets/guide/comics/andrew_inverted.png" | relative_url }}" title="I don’t know what he feels inside but I don’t know what you feel inside. When you talk to him you’ll find he reacts to the various abstractions as you and I do, and what else counts? If someone else’s reactions are like your own, what more can you ask for?" alt="Siri is not a tiny sprite living in an iPhone.">
</div>

Anyone who has been touched by Robin Williams's portrayal of Andrew in Bicentennial Man might have thought about the idea of granting rights to robots and AIS. In Life 3.0, author Max Tegmark recounts a heated discussion between Larry Page and Elon Musk on robot rights <dt-cite cite="tegmark2017life"></dt-cite>.

> At times, Larry accused Elon of being "specieist": treating certain life forms as inferior just because they were silicon-based rather than carbon-based.

Nevertheless, AIS that demand us to rethink notions of humanity and consciousness still remain on the far-flung horizon.

### Treatment of Humans by (Other Humans via) AIS

More urgently, we need to consider the effects of present AIS on human moral ideals.

AIS can promote human values. Low-cost automated medical diagnoses enable more accessible medical services. Fraud detection algorithms in banks help to prevent illegitimate transactions.

But AIS can also violate human values. The use of generative models to create fake articles, videos and photos threatens our notion of truth. The use of facial recognition on public cameras disrupt our conventional understanding of privacy. The use of biased algorithms to hire workers and sentence criminals violate our values of fairness and justice.

The pervasive nature of AIS means that these systems potentially affect millions and billions of lives. Many important institutions (political, judicial, financial) are increasingly augmented by AIS. In short, it is critical to get things right before human civilization blows up in our faces.

AI ethics goes beyond philosophical musings and thought experiments. It tries to fix the real problems cropping up from so-called solutions. Most importantly, the human researchers and engineers behind AIS have to understand the tremendous power and responsibility that they possess.

See the [AIEthics section](../about_ai/) for a more detailed look at what makes modern AI different from previous technologies.

<div class="box-red">
<p class="emph">
	TL;DR - For the remainder of this guide, ethics of artificial intelligence (AI ethics) refers to the study of how AIS affect, promote and violate human moral ideals, including justice, autonomy and privacy. In particular, we note that current AIS are still created, deployed and maintained by humans.
</p>
</div>

<div style="margin-left: auto; margin-right: auto; width:500px;">
<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Fair point that can just as easily, and more urgently, be inverted: why don&#39;t those building AI for $subject actually engage with the foundational $subject literature? Including the histories of ethics, discrimination, etc in $subject domain... <a href="https://t.co/SPkSBCxWzz">https://t.co/SPkSBCxWzz</a></p>&mdash; Meredith Whittaker (@mer__edith) <a href="https://twitter.com/mer__edith/status/998211595879833602?ref_src=twsrc%5Etfw">May 20, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>

<tofro prevtext="Intro" prevlink="../" nexttext="What is different about AI?" nextlink="../different/"></tofro>

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
