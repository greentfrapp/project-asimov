---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/different/
---

# What is different about AI?

---


## Illusion of Fairness

Since machines have no emotions, we often assume that they would be impartial and make decisions without fear or favor.

This assumption is flawed. For one, guns too, have no capacity for prejudice. But a gun wielded by different people can have vastly different moral embeddings. The same can be said for AIS. Moreover, the data used to train machine learning models can be a tremendous source of bias. A hiring model trained with sexist employment records would obviously suggest similarly sexist decisions.

<div>
<img class="comic" width="500px" src="{{ "/assets/guide/comics/illusion_inverted.png" | relative_url }}" title="Maybe you need to dress and walk more confidently." alt="Machine learning relies on datasets.">
</div>

This illusion of fairness provides unwarranted justification for widespread deployment of AIS without adequate control. But fairness is not a natural by-product of AIS. It is a quality that has to be carefully designed for.

## Speed and Scale

The shipping industry revolutionized trade, enabling it to be conducted on an international scale across maritime trade routes. Previously lengthy land detours had much quicker maritime alternatives. But this increase in speed and scale also facilitated the rapid spread of the Black Death.

Many of today's AIS function on an unprecedented speed and scale. Google Translate serves over 500 million queries a day. Amazon's Rekognition claims to be able to perform "real-time face recognition across tens of millions of faces". Previously expensive, slow, one-to-one functions can now be automated to become cheaper, faster and serve much larger audiences. This means more people can benefit from AIS. But just like the Black Death supercharged by rats on merchant ships, this crazy speed and scale also applies to any inherent problems (e.g. biases, privacy violations).

<div>
<img class="comic" width="500px" src="{{ "/assets/guide/comics/scale_inverted.png" | relative_url }}" title="It's a Rock Fact!" alt="Speed and scale applies to both benefits and problems.">
</div>

## Accessibility

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

<tofro prevtext="Basics" prevlink="../basics/" nexttext="The Most Important Question" nextlink="../the_question/"></tofro>

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
