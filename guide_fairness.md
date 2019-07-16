---
layout: guide_fairnessdemo
title: The Guide. \| Project Asimov
permalink: /guide/fairness/
---

# Understanding Fairness

<div class="box-red">
<blockquote>
  <p>
    All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.
  </p>
  <p>
    <em>Article I in the Universal Declaration of Human Rights</em>
  </p>
</blockquote>
<p class="emph">
  To lay the ground for algorithmic bias, we first ask, "What does fairness mean?" And boy is this a big one. With dozens of definitions, how do we know which one to pick? Why can't we all just agree on one?
</p>
<p>
  This section acts as a primer to fairness, covering a few key concepts. It tries to answer the following questions:
</p>

<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What is a widely used definition of fairness?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How can we quantify fairness?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        Can't we just combine <em>all</em> of the fairness definitions?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How do we design for fairness without context?
    </div>
  </div>
</div>

</div>

---

## Disparate Treatment, Disparate Impact

Let's begin with a not-so-mathematical idea. A common paradigm for thinking about fairness in US labor law is *disparate treatment and disparate impact*.

Both terms refer to practices that cause any group of people sharing **protected characteristics** to be  **disproportionately disadvantaged**. The phrase "protected characteristics" refers to traits such as race, gender, age, physical or mental disabilities, *where differences due to such traits cannot be reasonably justified*. <tidbit content='<span>The italicized disclaimer is important because in some cases, differences in treatment is justified. For instance, roller coaster rides often prohibit pregnant riders. This is generally deemed to be reasonable, since the ride poses a risk to the physical wellbeing of the pregnant person. Of course, this then raises the difficult question of how do we decide if a particular justification is reasonable.</span>'></tidbit> Ideally, we should have a set of sensitive traits that we can check against. <span class="emph">But in reality, what constitutes "protected characteristics" varies by context, culture and country.</span> The phrase "disproportionately disadvantaged" dismisses differences in treatment due to statistical randomness. <tidbit content='<span>There is an interesting 80% rule presented by the State of California Fair Employment Practice Commission (FEPC) in 1971 to quantify what "disproportionately" means. Simply put, we compare the treatment/mistreatment rates between two groups and see if they differ by more than 20% (equal to 100%-80%). This somewhat arbitrary rule was augmented by a 2007 memorandum from the U.S. Equal Employment Opportunities Commission, which suggested a uniform random baseline instead.</span>'></tidbit> 

The difference between disparate treatment and disparate impact can be summarized as **explicit intent**. Disparate treatment is explicitly intentional, while disparate impact is implicit or unintentional.

<div>
<img class="comic" width="400px" src="{{ "/assets/guide/comics/disparate_inverted.png" | relative_url }}" title="I also heard animals that begin with 'C' need more food." alt="Disparate treatment vs disparate impact.">
</div>

### What does this mean for AIS?

<p class="box-blue">
  We can use Amazon's Prime Free Same-Day service as an example <dt-cite cite="ingold2016amazon"></dt-cite>. Suppose Amazon has a model that decides which neighborhoods should get the Prime Free Same-Day service.
</p>

#### Disparate Treatment

Using race to decide who should get this service is certainly unjustified. So if Amazon had explicitly used racial composition of neighborhoods as an input feature for the model, that would be **disparate treatment**. In other words, disparate treatment occurs when protected characteristics are used as input features.

Obviously, disparate treatment is relatively easy to spot and resolve once we determine the set of protected characteristics. We just have to make sure none of protected characteristics is explicitly used as an input feature.

#### Disparate Impact

On the other hand, Amazon might have deliberately excluded racial features for their model. However, the resulting model might still make recommendations that disproportionately exclude predominantly black ZIP codes. This would be **disparate impact**. In general, disparate impact occurs when protected characteristics are not used as input features but the resulting outcome still exhibits disproportional disadvantages.

Disparate impact is more difficult to fix since it can come from multiple sources, such as:

- A non-representative dataset <tidbit content='<span>E.g. using a training set that contains only white male faces but applying the trained model to everyone regardless of race or gender.</span>'></tidbit>
- A dataset that already encodes unfair decisions <tidbit content='<span>E.g. a credit scoring dataset with labels that underreports the credit score for black individuals.</span>'></tidbit>
- Input features that are proxies for protected characteristics <tidbit content='<span>E.g. Postal code might be a proxy feature for race since the two are often correlated.</span>'></tidbit>

In addition, we have to review what we mean by "disproportionately disadvantaged" in the context of AIS. Let's say an insurance company uses an AIS that predicts whether an insuree will get into an accident within the next year. Insurees predicted as accident-prone could be charged higher premiums.

- If the model predicts a certain gender as accident-prone, is this gender disproportionately disadvantaged?
- If the accuracies are different between age groups, are the age groups with worse accuracies disproportionately disadvantaged?
- If the model overestimates accident-likelihood for certain races and underestimates it for other races. This means the first group pays higher premiums than they should, while the second group underpays. Then do we say the former group is disproportionately worse off and the latter is disproportionately better off?

The next section is a more detailed look at the different ways to look at fairness and the term "disproportionately disadvantaged".

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What is a widely used definition of fairness?  
    </div>
  </div>
</div>
<div class="emph">
<p>
  The terms "disparate treatment" and "disparate impact" are used in US labor law, dividing discrimination into intentional and "oops I didn't mean it". But in reality, even these legalistic definitions are subject to a lot of contention. Fairness really really depends on context.
</p>
</div>
</div>

---

## A Fair Fat Pet Predictor

<div>
<img class="comic" width="450px" src="{{ "/assets/guide/comics/cat_1_inverted.png" | relative_url }}" title="Or maybe he's pregnant." alt="Fat pet predictor.">
</div>

Suppose for a moment that our company organizes diet boot camps for overweight cats and dogs. We want to develop an AI system to help owners diagnose if a pet is overweight. Pets diagnosed as fat are then sent to our boot camps, which means less food and no treats boohoo. Furthermore, we know that dogs are more likely to be fat, as compared to cats. In fact, cats only have a 40% chance of being overweight, while dogs have a 60% chance of being overweight.

<div>
<img class="comic" width="200px" src="{{ "/assets/guide/comics/cat_2_inverted.png" | relative_url }}" title="That's what statistics means right?" alt="40% of cats are overweight.">
</div>

### Some Basics Before We Start

You can skip this section if you understand what are TP, FP, TN and FN. Otherwise, click on this nifty button on the right. <tidbit content="<span>(If these explanations are too long for comfort, try hovering over different sectors in the charts below to see which corresponding statistic lights up.)</span><ul><li><strong>Positive</strong> - What the model is predicting for. In our case, the model is predicting if a pet is fat. So a positive prediction is one that predicts a pet is fat. Despite this being super important for later definitions of fairness, this is unfortunately arbitrary because we can also say that the same model is predicting if a pet is not fat. In that case, a positive prediction is one that predicts a pet is not fat. But in general, this is clearly defined at the beginning when analyzing any model. TL;DR - for this demo, positive refers to fat.</li><li><strong>Negative</strong> - Opposite of positive. In this case, negative refers to not fat.</li><li><strong>Real Positives/Negatives</strong> - The samples grouped by their actual labels. In this case, real positives refer to pets that are actually fat. Real negatives refer to pets that are actually not fat.</li><li><strong>Predicted Positives/Negatives</strong> - The samples grouped by their predictions. So predicted positives refer to pets that are predicted fat and predicted negatives refer to pets that are predicted not fat.</li><li><strong>True Positives (TP)</strong> - Predicted positives that are also real positives i.e. predicted positives that are correct. In our case, TP refers to fat pets correctly predicted fat.</li><li><strong>True Negatives (TN)</strong> - Predicted negatives that are also real negatives i.e. predicted negatives that are correct. Here, TN refers to pets that are not fat and correctly predicted as not fat.</li><li><strong>False Positives (FP)</strong> - Predicted positives that are actually real negatives i.e. predicted positives that are wrong. In our case, FP refers to pets that are not fat but misclassified as fat.</li><li><strong>False Negatives (FN)</strong> - Predicted negatives that are actually real positives i.e. predicted negatives that are wrong. Here, FN refers to fat pets wrongly predicted as not fat.</li></ul>"></tidbit>

### Tuning Our Model for Fairness

In the charts below, we can tune our AI system's accuracy for cats and dogs (if only it was so easy!). The charts on the left and right represent the resulting predictions for cats and dogs respectively. (Hover over yellow keywords to see the tooltips on the charts.)

<fairness-explorable></fairness-explorable>

### Many More Metrics

The experiment above introduced five fairness metrics:

- Group Fairness <dt-cite cite="dwork2012fairness"></dt-cite>
- Equalised Odds <dt-cite cite="hardt2016equality"></dt-cite>
- Conditional Use Accuracy Equality <dt-cite cite="berk2018fairness"></dt-cite>
- Overall Accuracy Equality <dt-cite cite="berk2018fairness"></dt-cite>
- Treatment Equality <dt-cite cite="berk2018fairness"></dt-cite>

In addition to these, there are plenty more fairness metrics enumerated by Verma and Rubin <dt-cite cite="verma2018fairness"></dt-cite> and Narayanan <dt-cite cite="narayanan2018translation"></dt-cite>. There are all sorts of ingenious ideas including calibration <dt-cite cite="kleinberg2016inherent,chouldechova2017fair"></dt-cite> and fairness through awareness <dt-cite cite="dwork2012fairness"></dt-cite>. <span class="emph">These metrics all have different priorities and they exemplify the importance of context when discussing fairness</span>.

<div>
<img class="comic" width="450px" src="{{ "/assets/guide/comics/manymetrics_inverted.png" | relative_url }}" title="Is the temperature in Kelvin, Celsius or Farenheit? Yes." alt="There are a ton of metrics to measure fairness.">
</div>

### Is it Justified?

The awesome thing about these metrics is that they can be put into a loss function. Then we can train a model to optimize the function and voilà we have a fair model. Except no it doesn't work like that.

A major issue with these metrics (besides the question of how to pick one) is that they neglect the larger context. In the previous section, we explained:

> The phrase “protected characteristics” refers to traits such as race, gender, age, physical or mental disabilities, where differences due to such traits cannot be **reasonably justified**.

Measuring fairness using true-false-positive-negative rates neglects "reasonable justification". Suppose an Olympics selection trial requires applicants to run 10km in 40 minutes. The ability to run that fast is probably negatively correlated with age so we might see a bias against very elderly applicants. But this selection criterion is *reasonably justified*. In short, any notion of fairness that abstracts away the larger context is incomplete.

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How can we quantify fairness?   
    </div>
  </div>
</div>
<div class="emph">
<p>
  Most of the fairness metrics focus on equality in the rates of true positives, true negatives, false positives, false negatives, or some combination of these. But really, these metrics are insufficient when they exclude the larger context of the AIS. 
</p>
<p>
  For more comprehensive reviews of existing metrics, check out Narayanan <dt-cite cite="narayanan2018translation"></dt-cite> and Verma et al. <dt-cite cite="verma2018fairness"></dt-cite>.
</p>
</div>
</div>

---

## The Impossibility Theorem

<div>
<img class="comic" width="450px" src="{{ "/assets/guide/comics/bongo_inverted.gif" | relative_url }}" title="" alt="Some fairness definitions are mutually exclusive.">
</div>

For our fictional fat pet predictor, we had complete control over the system's accuracy. Even so, you may have noticed that it was impossible to fulfill all five fairness metrics at the same time. This is sometimes known as the impossibility theorem of fairness.

<div class="box-blue">

<p>
  In ProPublica's well-known article <a href="https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing">Machine Bias</a> <dt-cite cite="angwin2016machine"></dt-cite>, the subtitle reads:
</p>
<blockquote>
  <p>
    There’s software used across the country to predict future criminals. And it’s biased against blacks.
  </p>
</blockquote>
<p>
  ProPublica's article documented the "significant racial disparities" found in COMPAS, a recidivism prediction model sold by NorthPointe. But in their response, Northpointe disputed ProPublica's claims. Later on, we would discover that NorthPointe and ProPublica had different ideas about what constituted <em>fairness</em>. Northpointe used Conditional Use Accuracy Equality, while ProPublica used Treatment Equality (see previous <a href="../fat_pet/">demo</a> for details).
</p>
</div>

Turns out, it is impossible to satisfy both definitions of fairness, given populations with different base rates of recidivism <dt-cite cite="kleinberg2016inherent,chouldechova2017fair"></dt-cite>. This is similar to our previous example of fat pets. Now, different base rates of recidivism do not mean that certain individuals are more prone to re-offending by virtue of race. Instead of racial predisposition, such trends are more likely due to unequal treatment and circumstances from past and present biases. In our fat pets example, dogs might have a higher base rate for obesity not because dogs have fat genes but because dog owners tend to be overly enthusiastic about feeding their pets.

### So fairness is impossible?

The point of all these is not to show that fairness does not make sense. After all, notions of fairness are heavily based on context and culture. Different definitions that appear incompatible simply reflect this context-dependent nature.

But this also means that it is super critical to have a deliberate discussion about what constitutes fairness. This deliberate discussion must be nested in the context of how and where the AIS will be used. For each AIS, the AI practitioners, their clients and users of the AIS need to base their conversations on the same definition of fairness. <span class="emph">We cannot assume that everyone has the same idea of fairness.</span> While it could be ideal for everyone to have a say in what definition of fairness to use, sometimes this can be difficult. At the very least, AI practitioners should be upfront with their users about fairness considerations in the design of the AIS. This includes what fairness definition was used and why, as well as potential shortcomings.

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        Can't we just combine all of the fairness definitions?   
    </div>
  </div>
</div>
<div class="emph">
<p>
  Nope, sorry. In some cases, certain fairness metrics are actually mutually exclusive. AI practitioners have to be careful about which one they use. There is no easy answer since it all depends on the context. Finally, because it is so important and subjective, be open about which metric was used and how it was chosen!
</p>
</div>
</div>

---

## Context-Free Fairness

Computer scientists might often prefer general algorithms that is agnostic to context and application. The agnostic nature of unstructured deep learning is often cited as a huge advantage compared to labor-intensive feature engineering. So the importance of context in understanding fairness can be a bane to computer scientists, who might like to "[abstract] away the social context in which these systems will be deployed" <dt-cite cite="selbst2019fairness"></dt-cite>.

But as Selbst et al. write in their work on fairness in sociotechnical systems:

> Fairness and justice are properties of social and legal systems like employment and criminal justice, not properties of the technical tools within. **To treat fairness and justice as terms that have meaningful application to technology separate from a social context is therefore to make a category error, or as we posit here, an abstraction error.** [emphasis mine]

On a similar note, in Peter Westen's The Empty Idea of Equality <dt-cite cite="westen1982empty"></dt-cite>, he writes:

> For [equality] to have meaning, it must incorporate some external values that determine which persons and treatments are alike [...]

<p class="emph">
  In other words, the treatment of fairness, justice and equality <em>cannot</em> be separated from the specific context of the problem at hand.
</p>

### Five Failure Modes

In their work, Selbst et al. identify what they term "five failure modes" or "traps" that might ensnare the AI practitioner trying to build a fair AIS. What follows is a summary of the failure modes. We strongly encourage all readers to conduct a close reading of Selbst et al.'s original work. A copy can be found on co-author Sorelle Friedler's website [here](http://sorelle.friedler.net/papers/sts_fat2019.pdf).

#### Framing Trap

> Failure to model the entire system over which a social criterion, such as fairness, will be enforced

A fair AIS must take into account the larger sociotechnical context in which the AIS might be used, otherwise it is meaningless. For example, an AIS to filter job applicants should also consider how its suggestions would be used by the hiring manager. The AIS might be "fair" in isolation but subsequent "post-processing" by the hiring manager might distort and undo the "fairness".

#### Portability Trap

> Failure to understand how repurposing algorithmic solutions designed for one social context may be misleading, inaccurate, or otherwise do harm when applied to a different context

This refers to our earlier observation that computer scientists often prefer general algorithms agnostic to context and application, which Selbst et al. refer to as "portability". The authors contend that the quality of portability must sacrifice aspects of fairness because fairness *is* unique to time and space, unique to cultures and communities, and not readily transferable.

#### Formalism Trap

> Failure to account for the full meaning of social concepts such as fairness, which can be procedural, contextual, and contestable, and cannot be resolved through mathematical formalisms

This trap stems from the computer science field's preference for mathematical definitions, such as the many definitions of fairness that we have seen earlier. The authors suggest that such mathematical formulations fail to capture the intrinsically complex and abstract nature of fairness, which is, again, nested deeply in the context of the application.

#### Ripple Effect Trap

> Failure to understand how the insertion of technology into an existing social system changes the behaviors and embedded values of the pre-existing system

This is related to the Framing Trap in that the AI practitioner fails to properly account for "the entire system", which in this case includes how existing actors might be affected by the AIS. For instance, decision-makers might be biased towards agreeing with the AIS's suggestions (a phenomenon known as automation bias) or the opposite might be true and decision-makers might be prone to disagreeing with the AIS's suggestions. Again, this stems from designing an AIS in isolation without caring enough about the context.

#### Solutionism Trap

> Failure to recognize the possibility that the best solution to a problem may not involve technology

Hence we crowned the most important question in this entire guide as, "When is AI not the answer?" (mentioned [here](../basics/#the-most-important-question)). AI practitioners are naturally biased towards AI-driven solutions, which could be an impedement when the ideal solution might be far from AI-driven.

<!-- ### Technologies of Humility

This piece by Selbst et al. is important because it highlights many obstacles to designing fair AIS, all of which are often deeply embedded in the psyche of an AI practitioner. Upon a close reading of the work, readers might realize that the five traps are essentially variants of each other and can be ultimately attributed to a lack of appreciation for the sociotechnical context. -->

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How do we design for fairness without context?
    </div>
  </div>
</div>
<div class="emph">
  <p>
    Nope we can't, that was a trick question. The same decision can be both fair and unfair depending on the larger context, so context absolutely matters. Questions that can help us understand the context:
  </p>
  <ul>
    <li>What are the relevant protected traits?</li>
    <li>What does fairness mean in this domain? What does unfairness mean?</li>
    <li>How is the AIS supposed to be used?</li>
    <li>How might the AIS be misused?</li>
    <li>How might the AIS change people's behaviors?</li>
  </ul>
</div>
</div>

<tofro prevtext="Basics" prevlink="../basics/" nexttext="What's up with Bias?" nextlink="../bias_i/"></tofro>

## References

<dt-bibliography></dt-bibliography>

<script type="text/bibliography">
@inproceedings{verma2018fairness,
  title={Fairness definitions explained},
  author={Verma, Sahil and Rubin, Julia},
  booktitle={2018 IEEE/ACM International Workshop on Software Fairness (FairWare)},
  pages={1--7},
  year={2018},
  organization={IEEE}
}

@inproceedings{dwork2012fairness,
  title={Fairness through awareness},
  author={Dwork, Cynthia and Hardt, Moritz and Pitassi, Toniann and Reingold, Omer and Zemel, Richard},
  booktitle={Proceedings of the 3rd innovations in theoretical computer science conference},
  pages={214--226},
  year={2012},
  organization={ACM}
}

@article{zliobaite2015relation,
  title={On the relation between accuracy and fairness in binary classification},
  author={Zliobaite, Indre},
  journal={arXiv preprint arXiv:1505.05723},
  year={2015}
}

@article{simoiu2017problem,
  title={The problem of infra-marginality in outcome tests for discrimination},
  author={Simoiu, Camelia and Corbett-Davies, Sam and Goel, Sharad and others},
  journal={The Annals of Applied Statistics},
  volume={11},
  number={3},
  pages={1193--1216},
  year={2017},
  publisher={Institute of Mathematical Statistics}
}

@inproceedings{corbett2017algorithmic,
  title={Algorithmic decision making and the cost of fairness},
  author={Corbett-Davies, Sam and Pierson, Emma and Feller, Avi and Goel, Sharad and Huq, Aziz},
  booktitle={Proceedings of the 23rd ACM SIGKDD International Conference on Knowledge Discovery and Data Mining},
  pages={797--806},
  year={2017},
  organization={ACM}
}

@article{chouldechova2017fair,
  title={Fair prediction with disparate impact: A study of bias in recidivism prediction instruments},
  author={Chouldechova, Alexandra},
  journal={Big data},
  volume={5},
  number={2},
  pages={153--163},
  year={2017},
  publisher={Mary Ann Liebert, Inc. 140 Huguenot Street, 3rd Floor New Rochelle, NY 10801 USA}
}

@inproceedings{hardt2016equality,
  title={Equality of opportunity in supervised learning},
  author={Hardt, Moritz and Price, Eric and Srebro, Nati and others},
  booktitle={Advances in neural information processing systems},
  pages={3315--3323},
  year={2016}
}

@inproceedings{kusner2017counterfactual,
  title={Counterfactual fairness},
  author={Kusner, Matt J and Loftus, Joshua and Russell, Chris and Silva, Ricardo},
  booktitle={Advances in Neural Information Processing Systems},
  pages={4066--4076},
  year={2017}
}

@article{berk2018fairness,
  title={Fairness in criminal justice risk assessments: The state of the art},
  author={Berk, Richard and Heidari, Hoda and Jabbari, Shahin and Kearns, Michael and Roth, Aaron},
  journal={Sociological Methods \& Research},
  pages={0049124118782533},
  year={2018},
  publisher={Sage Publications Sage CA: Los Angeles, CA}
}

@inproceedings{zafar2017fairness,
  title={Fairness beyond disparate treatment \& disparate impact: Learning classification without disparate mistreatment},
  author={Zafar, Muhammad Bilal and Valera, Isabel and Gomez Rodriguez, Manuel and Gummadi, Krishna P},
  booktitle={Proceedings of the 26th International Conference on World Wide Web},
  pages={1171--1180},
  year={2017},
  organization={International World Wide Web Conferences Steering Committee}
}

@article{kleinberg2016inherent,
  title={Inherent trade-offs in the fair determination of risk scores},
  author={Kleinberg, Jon and Mullainathan, Sendhil and Raghavan, Manish},
  journal={arXiv preprint arXiv:1609.05807},
  year={2016}
}

@inproceedings{galhotra2017fairness,
  title={Fairness testing: testing software for discrimination},
  author={Galhotra, Sainyam and Brun, Yuriy and Meliou, Alexandra},
  booktitle={Proceedings of the 2017 11th Joint Meeting on Foundations of Software Engineering},
  pages={498--510},
  year={2017},
  organization={ACM}
}

@inproceedings{kilbertus2017avoiding,
  title={Avoiding discrimination through causal reasoning},
  author={Kilbertus, Niki and Carulla, Mateo Rojas and Parascandolo, Giambattista and Hardt, Moritz and Janzing, Dominik and Sch{\"o}lkopf, Bernhard},
  booktitle={Advances in Neural Information Processing Systems},
  pages={656--666},
  year={2017}
}

@inproceedings{nabi2018fair,
  title={Fair inference on outcomes},
  author={Nabi, Razieh and Shpitser, Ilya},
  booktitle={Thirty-Second AAAI Conference on Artificial Intelligence},
  year={2018}
}

@inproceedings{narayanan2018translation,
  title={Translation tutorial: 21 fairness definitions and their politics},
  author={Narayanan, Arvind},
  booktitle={Proc. Conf. Fairness Accountability Transp., New York, USA},
  year={2018}
}

@article{brennan2009evaluating,
  title={Evaluating the predictive validity of the COMPAS risk and needs assessment system},
  author={Brennan, Tim and Dieterich, William and Ehret, Beate},
  journal={Criminal Justice and Behavior},
  volume={36},
  number={1},
  pages={21--40},
  year={2009},
  publisher={Sage Publications Sage CA: Los Angeles, CA}
}

@article{angwin2016machine,
  title={Machine bias},
  author={Angwin, Julia and Larson, Jeff and Mattu, Surya and Kirchner, Lauren},
  journal={ProPublica, May},
  volume={23},
  year={2016}
}

@article{ingold2016amazon,
  title={Amazon doesn’t consider the race of its customers. Should It},
  author={Ingold, David and Soper, Spencer},
  journal={Bloomberg News},
  year={2016}
}

@inproceedings{selbst2019fairness,
  title={Fairness and abstraction in sociotechnical systems},
  author={Selbst, Andrew D and Boyd, Danah and Friedler, Sorelle A and Venkatasubramanian, Suresh and Vertesi, Janet},
  booktitle={Proceedings of the Conference on Fairness, Accountability, and Transparency},
  pages={59--68},
  year={2019},
  organization={ACM}
}

@article{westen1982empty,
  title={The empty idea of equality},
  author={Westen, Peter},
  journal={Harvard Law Review},
  pages={537--596},
  year={1982},
  publisher={JSTOR}
}

</script>