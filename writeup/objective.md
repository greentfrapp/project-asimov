## Objective

The objective of this project is to provide a freely accessible primer to AI ethics, specifically beginning with algorithmic bias. The guide is meant to communicate important concepts in a relatable manner and acts as a launchpad pointing readers to other detailed resources.

### Why AI Ethics?

Artificial intelligence (AI) technologies have seen widespread use in recent years, with applications that range from trivial to severe. Google Photos help to sort and label our photos automatically and Google Translate helps us communicate in foreign lands. On the other hand, AI systems are also used to provide advice for judges and juries in criminal sentencing and for doctors in diagnosing life-threatening diseases. What was once the fancy of science fiction authors has been made real enough to both save and endanger livelihoods and lives.

Specifically, AI differs from most technologies in three main aspects:

- Illusion of fairness
- Speed and scale
- Accessibility

#### Illusion of Fairness

With the advent of automation, documented experiences suggest a tendency to assume that machines are better at making decisions. The phenomenon has been termed as automation bias <dt-cite cite="citron2007technological,skitka2000automation"></dt-cite>. For instance, in Viriginia Eubanks' *Automating Inequality*, the author documents how child welfare officers working with a child abuse prediction model would choose to amend their own assessments in light of the model's predictions - "According to Vaithianathan and Putnam-Hornstein, intake screeners have asked for the ability to go back and change their risk assessments after they see the [Allegheny Family Screening Tool (AFST)] score, suggesting that they believe that the model is less fallible than human screeners." However, such assumptions neglect the unfortunate reality that machines and algorithmic systems often embed the flaws of their human designers. 

#### Speed and Scale

Many of today’s algorithmic systems function on an unprecedented speed and scale. Google Translate serves over 500 million users and translates over 100 billion words a day <dt-cite cite="turovsky2016ten"></dt-cite>. Amazon’s Rekognition claims to be able to perform "perform facial recognition against collections of up to tens of millions of faces" <dt-cite cite="amazon2019amazon"></dt-cite>. Previously expensive, slow, one-to-one functions can now be automated to become cheaper, faster and serve much larger audiences. But speed and scale are double-edged swords. More people will be affected by these services, whether for the better or worse.

#### Accessibility

The vast majority of researchers share their work freely on [arxiv.org](https://arxiv.org/) and [GitHub](https://github.com). Open-source software libraries (Tensorflow, Torch, Keras) and datasets (MNIST, ImageNet, Google News) are available to anyone with Internet access. Furthermore, advances in hardware mean that consumer-grade computers are sufficient to run many state-of-the-art algorithms. More resource-intensive algorithms can always be trained on the cloud via services such as Amazon Web Services, Google Cloud and Microsoft Azure. The combination of accessible research, hardware, software and data means that many people have the ability to train and deploy their own AIS for personal use. But like speed and scale, this accessibility is also a double-edged sword. For example, students have used Tensorflow for detection of wildfires. At the same time, there are also open-source software such as DeepFakes and DeepNude, which generate realistic pornographic media of unwitting individuals.

In light of what is at stake, there is a growing need and a moral imperative for AI practitioners - researchers, engineers and hobbyists - to understand the ethical issues associated with the technology.

### Why Algorithmic Bias?

The study of algorithmic bias has a surprising long history, dating back at least to 1996 with Friedman and Nissenbaum's *Bias in Computer Systems* <dt-cite cite="friedman1996bias"></dt-cite>.



