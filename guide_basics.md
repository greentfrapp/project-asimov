---
layout: guide_default
title: Getting Started \| Machines Gone Wrong
permalink: /guide/basics/
---

# Getting Started

<div class="box-red">
<p class="emph">
  <span class="bit" v-if="showBit">Human-designed</span> AI ethics can be confusing. To practitioners, <span class="bit" v-if="showBit">human-designed</span> AI is kind of just clever mathematics. So how can a bunch of code and equations be ethical or unethical? Why are we so worried about <span class="bit" v-if="showBit">human-designed</span> AI ethics?
</p>
<p>
  This section tries to give a warm-up to <span class="bit" v-if="showBit">human-designed</span> AI ethics before we dive into the deep end. It will cover the following:
</p>

<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What do we mean by <span class="bit" v-if="showBit">human-designed</span> AI ethics?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What do we mean by <span class="bit" v-if="showBit">human-designed</span> AI systems?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How is <span class="bit" v-if="showBit">human-designed</span> AI different from other technologies?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What is the single most important question when implementing <span class="bit" v-if="showBit">human-designed</span> AI solutions?
    </div>
  </div>
</div>

</div>

---

<h2 id="ethics-of-artificial-intelligence-ai-ethics">Ethics of <span class="bit" v-if="showBit">Human-Designed</span> Artificial Intelligence<br/>(<span class="bit" v-if="showBit">Human-Designed</span> AI Ethics)</h2>

> On my view, *computer ethics* is the analysis of the nature and social impact of computer technology and the corresponding formulation and justification of policies for the ethical use of such technology.

*What is Computer Ethics? (Moor, 1985) <dt-cite cite="moor1985computer"></dt-cite>*

Discussions of <span class="bit" v-if="showBit">human-designed</span> AI ethics typically fall into two categories: how people treat <span class="bit" v-if="showBit">human-designed</span> AI (think Chappie and Bicentennial Man) and how <span class="bit" v-if="showBit">human-designed</span> AI treat people (think Terminator and HAL9000).

### Treatment of <span class="bit" v-if="showBit">human-designed</span> AI by Humans

<div>
<img class="comic" width="380px" src="{{ "/assets/guide/comics/andrew.png" | relative_url }}" title="I don’t know what he feels inside but I don’t know what you feel inside. When you talk to him you’ll find he reacts to the various abstractions as you and I do, and what else counts? If someone else’s reactions are like your own, what more can you ask for?" alt="Siri is not a tiny sprite living in an iPhone.">
</div>

Anyone who has been touched by Robin Williams's portrayal of Andrew in Bicentennial Man might have thought about the idea of granting rights to robots and <span class="bit" v-if="showBit">human-designed</span> AI systems. In Life 3.0, Max Tegmark recounted a heated discussion between Larry Page and Elon Musk on robot rights <dt-cite cite="tegmark2017life"></dt-cite>.

> At times, Larry accused Elon of being "specieist": treating certain life forms as inferior just because they were silicon-based rather than carbon-based.

Realistically though, <span class="bit" v-if="showBit">human-designed</span> AI systems that require us to rethink notions of humanity and consciousness still remain on the far-flung horizon. Instead, let's focus on the more urgent issue of how <span class="bit" v-if="showBit">human-designed</span> AI treat people.

### And Treatment of Humans by <span class="bit" v-if="showBit">human-designed</span> AI...

More urgently, we need to consider the effects of present <span class="bit" v-if="showBit">human-designed</span> AI systems on human moral ideals.

<span class="bit" v-if="showBit">human-designed</span> AI systems can promote human values. Low-cost automated medical diagnoses enable more accessible medical services. Fraud detection algorithms in banks help to prevent illegitimate transactions. Image recognition algorithms help to automatically detect images of child abuse and identify victims.

But <span class="bit" v-if="showBit">human-designed</span> AI can also violate human values. The use of generative models to create fake articles, videos and photos threatens our notion of truth. The use of facial recognition on public cameras disrupt our conventional understanding of privacy. The use of biased algorithms to hire workers and sentence criminals violate our values of fairness and justice.

The pervasive nature of <span class="bit" v-if="showBit">human-designed</span> AI systems means that these systems potentially affect millions and billions of lives. Many important institutions (political, judicial, financial) are increasingly augmented by <span class="bit" v-if="showBit">human-designed</span> AI systems. In short, it is critical to get things right before human civilization blows up in our faces. <span class="bit" v-if="showBit">human-designed</span> AI ethics goes beyond philosophical musings and thought experiments. It tries to fix the real problems cropping up from our new <span class="bit" v-if="showBit">human-designed</span> AI solutions.

### ... Which are also Designed by Humans

For now at least, the implementation of <span class="bit" v-if="showBit">human-designed</span> AI systems is a manual non-automated process. So we really shouldn't be thinking about how an *AI system* is violating human values. Keep in mind that the system was designed by humans and *its designers* are probably the ones who should be responsible for any ethical violations. In fact, all the instances of "AI" above should be replaced with "human-designed AI", try clicking on this little red button to the right! <span class="tidbit-holder"><i class="plus circle large icon tidbit-link" :class="{ closed: showBit }" v-on:click="showBit = !showBit"></i></span>

As such, <span class="bit" v-if="showBit">human-designed</span> AI ethics also consists of educating <span class="bit" v-if="showBit">human-designed</span> AI parents (aka human researchers and engineers) about how to bring up their <span class="bit" v-if="showBit">human-designed</span> AI babies. Because their <span class="bit" v-if="showBit">human-designed</span> AI babies grow up to become really influential <span class="bit" v-if="showBit">human-designed</span> AI adults. <span class="bit" v-if="showBit">human-designed</span> AI researchers and engineers *have* to understand the tremendous power and responsibility that they now possess.

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What do we mean by <span class="bit" v-if="showBit">human-designed</span> AI ethics?
    </div>
  </div>
</div>
<p class="emph">
  For the rest of this guide, <span class="bit" v-if="showBit">human-designed</span> AI ethics refers to the study of how <span class="bit" v-if="showBit">human-designed</span> AI systems promote and violate human values, including justice, autonomy and privacy. In particular, we note that current AI systems are still created, deployed and maintained by humans. And these humans need to start paying attention to how their systems are changing the world.
</p>
</div>

---

<h2 id="artificial-intelligence-systems-ais"><span class="bit" v-if="showBit">Human-Designed</span> Artificial Intelligence Systems<br/>(<span class="bit" v-if="showBit">Human-Designed</span> AIS)</h2>

> An [Artificial Intelligence System (AIS)] is any computing system using artificial intelligence algorithms, whether it’s software, a connected object or a robot.

*The Montréal Declaration, 2018 <dt-cite cite="montreal2018"></dt-cite>*

The Montréal Declaration is a set of <span class="bit" v-if="showBit">human-designed</span> AI ethics guidelines initiated by Université de Montréal. In the Declaration, its 10 principles refers extensively to "AIS" instead of "AI". This guide will do the same because the term "system" serves as a nice reminder that we are looking at a complex network of parts that work together to make a prediction.

<div>
<img class="comic" width="815px" src="{{ "/assets/guide/comics/siri.png" | relative_url }}" title="Before working at Apple, Siri acted at Studio Ghibli." alt="Siri is not a tiny sprite living in an iPhone.">
</div>

<p class="box-blue">
  Siri is not a tiny sprite that lives in iPhones. Siri is an entire digital supply chain from initial conception to data collection to model training to deployment to maintenance and finally retirement. 
</p>

The same is true for any other <span class="bit" v-if="showBit">human-designed</span> AIS, including Google Translate, Amazon Rekognition and Northpointe's COMPAS. This big-picture perspective is important. It reminds us that we have to look at the entire system and infrastructure when we talk about <span class="bit" v-if="showBit">human-designed</span> AI ethics.

In addition to a digital supply chain, <span class="bit" v-if="showBit">human-designed</span> AIS also have physical supply chains that comprise energy usage, resource extraction and hardware recycling or disposal. These physical supply chains can be due to cloud servers, physical devices or simply the electricity and hardware used to train and house the models. The AI Now Institute also has a fantastic illustration titled [Anatomy of an AI System](https://anatomyof.ai/) that considers <span class="bit" v-if="showBit">human-designed</span> AIS in terms of "material resources, human labor, and data".

Finally, the "system" also includes the sociotechnical context where the <span class="bit" v-if="showBit">human-designed</span> AIS is applied. This refers to the culture, norms and values of the application, the domain and the geography and society that the application lives in. These values can be formalized (e.g. laws) or informal (e.g. unwritten customs and traditions). This sociotechnical context becomes critical when we talk about concepts like fairness and justice.

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What do we mean by <span class="bit" v-if="showBit">human-designed</span> AI systems?
    </div>
  </div>
</div>
<p class="emph">
  The term Artificial Intelligence System (AIS) refer to the entirety of <span class="bit" v-if="showBit">human-designed</span> artificial intelligence applications or solutions, in terms of:
</p>
<ul class="emph">
    <li>Digital lifecycle (conceptualization to retirement),</li>
    <li>Physical lifecycle (resource extraction to hardware disposal), and</li>
    <li>Sociotechnical context (culture, norms and values).</li>
  </ul>
</div>

---

<h2 id="what-is-different-about-ai">What is different about <span class="bit" v-if="showBit">human-designed</span> AI?</h2>

There's been many articles talking about how <span class="bit" v-if="showBit">human-designed</span> AI is *the shit* and how it's better than every other technology we've had. Here we look at three aspects that make <span class="bit" v-if="showBit">human-designed</span> AI stand out in terms of its social impact - an illusion of fairness, tremendous speed and scale, and open accessibility.

### Illusion of Fairness

Since machines have no emotions, we often assume that they would be impartial and make decisions without fear or favor.

This assumption is flawed. For one, guns too, have no capacity for prejudice or bias. But we don't attribute impartiality to guns. "Guns don't kill people, people kill people." A gun wielded by different people can have vastly different moral embeddings. The same can be said for <span class="bit" v-if="showBit">human-designed</span> AIS.

Moreover, the data used to train machine learning models can be a tremendous source of bias. A hiring model trained with sexist employment records would obviously suggest similarly sexist decisions. A recidivism model trained on racist arrest histories would obviously give racist suggestions. Like produces like. Garbage in, garbage out.

Unfortunately, <span class="bit" v-if="showBit">human-designed</span> AIS marketed as impartial and unbiased seem really appealing for all sorts of important decisions. This illusion of fairness provides unwarranted justification for widespread deployment of <span class="bit" v-if="showBit">human-designed</span> AIS without adequate control. But fairness is not inherent in <span class="bit" v-if="showBit">human-designed</span> AIS. It is a quality that has to be carefully designed for and maintained.

### Speed and Scale

The shipping industry revolutionized trade, enabling it to be conducted on an international scale across maritime trade routes. Previously lengthy land detours had much quicker maritime alternatives. But this increase in speed and scale also facilitated the rapid spread of the Black Death.

Many of today's <span class="bit" v-if="showBit">human-designed</span> AIS function on an unprecedented speed and scale. Google Translate serves over 500 million queries a day. Amazon's Rekognition claims to be able to perform "real-time face recognition across tens of millions of faces". Previously expensive, slow, one-to-one functions can now be automated to become cheaper, faster and serve much larger audiences. This means more people can benefit from <span class="bit" v-if="showBit">human-designed</span> AIS.

But just like the Black Death supercharged by rats on merchant ships, this crazy speed and scale also applies to any inherent problems. A biased translation system could serve over 500 million biased queries a day. An insecure facial recognition system can leak tens of millions of faces and related personal details. Speed and scale is a double-edged sword and it's surprising how people often forget that a double-edged sword is double-edged.

<div>
<img class="comic" width="500px" src="{{ "/assets/guide/comics/scale.png" | relative_url }}" title="It's a Rock Fact!" alt="Speed and scale applies to both benefits and problems.">
</div>

### Accessibility

<span class="bit" v-if="showBit">Human-designed</span> AI research has largely been open. As a self-taught coder and <span class="bit" v-if="showBit">human-designed</span> AI researcher, I remain eternally grateful for the kindness and generosity of the <span class="bit" v-if="showBit">human-designed</span> AI community. The vast majority of researchers share their work freely on arxiv.org and GitHub. Open-source software libraries and datasets are available to anyone with Internet access. There are abundant tutorials for anyone keen to train their own image recognition or language model.

Furthermore, advances in hardware mean that consumer-grade computers are sufficient to run many state-of-the-art algorithms. More resource-intensive algorithms can always be trained on the cloud via services such as Amazon Web Services, Google Cloud and Microsoft Azure. 

The combination of accessible research, hardware, software and data means that many people have the ability to train and deploy their own <span class="bit" v-if="showBit">human-designed</span> AIS for personal use. A powerful technology is now openly accessible to unregulated individuals who may use it for any purpose they deem fit. There has been cool examples of students using Tensorflow to predict wildfires ([link](https://www.blog.google/technology/ai/fighting-fire-machine-learning-two-students-use-tensorflow-predict-wildfires/)) and tons of other nice stuff ([link](https://www.wired.com/story/diy-tinkerers-artificial-intelligence-smart-tech/)).

But like speed and scale, this accessibility is also a double-edged sword. Consider the examples of DeepFakes and DeepNude. These open-source programs use Generative Adversarial Networks and variants of the pix2pix algorithm to generate realistic pornographic media of unwitting individuals. Accessible and powerful technology can also be used by irresponsible or malicious actors.

<div>
<img class="comic" width="350px" src="{{ "/assets/guide/comics/accessibility.png" | relative_url }}" title="The axes are probably on logarithmic scales." alt="Accessibility versus Capacity for Harm.">
</div>

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How is <span class="bit" v-if="showBit">human-designed</span> AI different from other technologies? 
    </div>
  </div>
</div>
<div class="emph">
<p>
  <span class="bit" v-if="showBit">Human-designed</span> AI differs from most technologies in three aspects:
</p>
<ul>
  <li>We tend to think <span class="bit" v-if="showBit">human-designed</span> AI is like totally fair and better than people.</li>
  <li><span class="bit" v-if="showBit">Human-designed</span> AI can be crazy fast and deployed on a massive scale.</li>
  <li>Given how powerful it is, <span class="bit" v-if="showBit">human-designed</span> AI is also really accessible to everyone.</li>
</ul>
</div>
</div>

---

## The Most Important Question

*\*Cue drumroll\**

### "When is <span class="bit" v-if="showBit">human-designed</span> AI not the answer?"

<div>
<img class="comic" width="250px" src="{{ "/assets/guide/comics/notanswer_1.png" | relative_url }}" title='' alt="Is that a trick question?">
</div>

This is the most important question in this entire guide, and these days it can feel like the answer is, "Never."

<p class="emph box-red">
  This section here is to remind the reader that not using <span class="bit" v-if="showBit">human-designed</span> AIS <em>is</em> an option.
</p>

<span class="bit" v-if="showBit">Human-designed</span> AI technologies have been used for facial recognition, hiring, criminal sentencing, credit scoring. More unconventional applications include writing inspirational quotes ([link](http://inspirobot.me/)), coming up with Halloween costumes ([link](https://www.nytimes.com/interactive/2018/10/26/opinion/halloween-spooky-costumes-machine-learning-generator.html)), inventing new pizza recipes ([link](https://www.youtube.com/watch?v=WVvHCJls3yY)) and creating rap lyrics ([link](http://deepbeat.org/)).

<div>
<img class="comic" width="300px" src="{{ "/assets/guide/comics/notanswer_2.png" | relative_url }}" title="Linguine used Bind. It's super effective!" alt="Is that a trick question?">
</div>

But the superiority of <span class="bit" v-if="showBit">human-designed</span> AIS should not be taken for granted despite all the hype. For example, human professionals are often far better at explaining their decisions, as compared to <span class="bit" v-if="showBit">human-designed</span> AIS. Most humans also tend to make better jokes.

It is immensely important to consider the trade-offs when deploying <span class="bit" v-if="showBit">human-designed</span> AIS and look critically at both pros and cons. In some cases, <span class="bit" v-if="showBit">human-designed</span> AIS may not actually offer significant benefits despite all the hype. Common considerations include explainability and emotional and social qualities, where humans far outperform machines.

### <span class="bit" v-if="showBit">Human-designed</span> AI + Human = Best of Both Worlds?

<span class="bit" v-if="showBit">Human-designed</span> AI+Human systems are frequently perceived to be the best of both worlds. We have the empathy and explainability of humans augmented by the rigour and repeatability of <span class="bit" v-if="showBit">human-designed</span> AI systems. What could go wrong? Well, turns out documented experiences have shown that in such systems, humans might have a tendency to defer to suggestions made by the <span class="bit" v-if="showBit">human-designed</span> AIS. So rather than "<span class="bit" v-if="showBit">Human-Designed</span> AI+Human", these systems are more like "<span class="bit" v-if="showBit">Human-Designed</span> AI+AgreeableHuman".

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
    According to Vaithianathan and Putnam-Hornstein, <b>intake screeners have asked for the ability to go back and change their risk assessments after they see the AFST score</b>, suggesting that they believe that the model is less fallible than human screeners.
  </p>
</blockquote>

<p><em>Automating Inequality (Virginia Eubanks, 2018) <dt-cite cite="eubanks2018automating"></dt-cite></em></p>
</div>

Such observations are hardly surprising, given the daily exhortations of the reliability of machines. In fact, the human tendency to defer to automated decisions has been termed "automation bias" <dt-cite cite="skitka2000automation,citron2007technological"></dt-cite>. Unfortunately, this over-deference to machines potentially undermines the mutually complementary aspect of <span class="bit" v-if="showBit">human-designed</span> AI+Human models.

<div>
<img class="comic" width="300px" src="{{ "/assets/guide/comics/notanswer_3.png" | relative_url }}" title="The teller said she would be happy to help me reinstate my account if I can prove I am alive." alt="Over-deference to machines.">
</div>

### Neglected Ripples

More generally, when discussing the pros and cons of adopting <span class="bit" v-if="showBit">human-designed</span> AIS solutions, we often forget to consider how the <span class="bit" v-if="showBit">human-designed</span>  AIS might affect the humans interacting with the system i.e. cause "ripples" within the system. This is referred to the Ripple Effect Trap by Selbst et al. <dt-cite cite="selbst2019fairness"></dt-cite>. Examples of ripples include:

- Automation bias, as mentioned earlier. <tidbit content='This refers to an unwarranted bias towards automated decisions. This might occur when people lack confidence in their own decisions, such as new or untrained personnel. It might also occur when the decision has severe consequences. People afraid of taking the blame for a wrong decision might prefer to transfer responsibility to the <span class="bit" v-if="showBit">human-designed</span> AIS.'></tidbit>
- Automation aversion. <tidbit content='The opposite of automation bias, this refers to a preference to disagree with automated decisions. This can arise from a fear of being displaced - "They took our jobs!" It can also be due to a bad history with poorly designed <span class="bit" v-if="showBit">human-designed</span> AIS or general mistrust due to negative media portrayals.'></tidbit>
- Overconfidence in AIS-derived decisions. <tidbit content='While the well-known fallibility of humans remind us to double and triple check decisions, employing <span class="bit" v-if="showBit">human-designed</span> AIS might create a false sense of security. This can arise over long-term experience with a generally reliable <span class="bit" v-if="showBit">human-designed</span> AIS. People might gradually take for granted the reliability of the <span class="bit" v-if="showBit">human-designed</span> AIS. Consider the excruciating experiences of test drivers for self-driving cars, who have to be continuously alert despite a mostly safe ride.'></tidbit>

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What is the single most important question when implementing <span class="bit" v-if="showBit">human-designed</span> AI solutions?  
    </div>
  </div>
</div>
<div class="emph">
<p>
  "Is using <span class="bit" v-if="showBit">human-designed</span> AI for this <em>really</em> a good idea?"
</p>
<p>
  In other words, think hard about what using <span class="bit" v-if="showBit">human-designed</span> AI really means in the context of your problem. Like really hard. Not using <span class="bit" v-if="showBit">human-designed</span> AI is definitely an option.
</p>
<p>
  And don't assume that <span class="bit" v-if="showBit">human-designed</span> AI+Human systems are definitely better than <span class="bit" v-if="showBit">human-designed</span> AI or humans by themselves. Instead, consider how <span class="bit" v-if="showBit">human-designed</span> AI and people might interact within your problem in unexpected ways. Ask prospective users what they think about <span class="bit" v-if="showBit">human-designed</span> AIS and factor their responses into your mental models.
</p>
</div>
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
  organization={Université de Montréal},
  url={https://www.montrealdeclaration-responsibleai.com/}
}

@article{moor1985computer,
  title={What is computer ethics?},
  author={Moor, James H},
  journal={Metaphilosophy},
  volume={16},
  number={4},
  pages={266-275},
  year={1985},
  publisher={Wiley Online Library},
  url={https://doi.org/10.1111/j.1467-9973.1985.tb00173.x}
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
  publisher={HeinOnline},
  url={https://openscholarship.wustl.edu/cgi/viewcontent.cgi?article=1166&context=law_lawreview}
}

@article{skitka2000automation,
  title={Automation bias and errors: are crews better than individuals?},
  author={Skitka, Linda J and Mosier, Kathleen L and Burdick, Mark and Rosenblatt, Bonnie},
  journal={The International journal of aviation psychology},
  volume={10},
  number={1},
  pages={85-97},
  year={2000},
  publisher={Taylor & Francis},
  url={https://doi.org/10.1207/S15327108IJAP1001_5}
}

@inproceedings{selbst2019fairness,
  title={Fairness and abstraction in sociotechnical systems},
  author={Selbst, Andrew D and Boyd, Danah and Friedler, Sorelle A and Venkatasubramanian, Suresh and Vertesi, Janet},
  booktitle={Proceedings of the Conference on Fairness, Accountability, and Transparency},
  pages={59-68},
  year={2019},
  organization={ACM},
  url={http://sorelle.friedler.net/papers/sts_fat2019.pdf}
}
