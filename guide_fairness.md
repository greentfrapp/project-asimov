---
layout: guide_fairnessdemo
title: The Guide. \| Project Asimov
permalink: /guide/fairness/
---

# Fairness

> All human beings are born free and equal in dignity and rights. They are endowed with reason and conscience and should act towards one another in a spirit of brotherhood.  

*Article I in the Universal Declaration of Human Rights*

To lay the ground for algorithmic bias, we first ask, "What does fairness mean?"

## Disparate Treatment and Disparate Impact `WIP`

Let's begin with a not-so-mathematical idea. A common paradigm for thinking about fairness in US labor law is *disparate treatment and disparate impact*.

Both terms refer to practices that **disproportionately disadvantages** any group of people sharing **protected characteristics**. The phrase "disproportionately disadvantages" dismisses differences in treatment due to statistical randomness. <tidbit content='There is an interesting 80% rule presented by the State of California Fair Employment Practice Commission (FEPC) in 1971 to quantify what "disproportionately" means. Simply put, we compare the treatment/mistreatment rates between two groups and see if they differ by more than 20% (equal to 100%-80%). This somewhat arbitrary rule was augmented by a 2007 memorandum from the U.S. Equal Employment Opportunities Commission, which suggested a random baseline.'></tidbit> The phrase "protected characteristics" refers to traits such as race, gender, age, physical or mental disabilities, *where differences in such traits cannot be reasonably justified*. <tidbit content='The italicized disclaimer is important because in some cases, differences in treatment is justified. For instance, roller coaster rides often prohibit pregnant riders. This is generally deemed to be reasonable, since the ride poses a risk to the physical wellbeing of the pregnant person. Of course, this then raises the difficult question of how do we decide if a particular justification is reasonable.'></tidbit>

The difference between disparate treatment and disparate impact can be summarized as **explicit intent**. Disparate treatment is explicitly intentional, while disparate impact is implicit or unintentional.

## A Fair Fat Pet Predictor

<div>
<img class="comic" width="450px" src="{{ "/assets/guide/comics/cat_1_inverted.png" | relative_url }}" title="Or maybe he's pregnant." alt="Fat pet predictor.">
</div>

Suppose for a moment that our company organizes diet boot camps for overweight cats and dogs. We want to develop an AI system to help owners diagnose if a pet is overweight. Pets diagnosed as fat are then sent to our boot camps, which means less food and no treats boohoo. Furthermore, we know that dogs are more likely to be fat, as compared to cats. In fact, cats only have a 40% chance of being overweight, while dogs have a 60% chance of being overweight.

<div>
<img class="comic" width="200px" src="{{ "/assets/guide/comics/cat_2_inverted.png" | relative_url }}" title="That's what statistics means right?" alt="40% of cats are overweight.">
</div>

In the charts below, we can tune our AI system's accuracy for cats and dogs (if only it was so easy!). The charts on the left and right represent the resulting predictions for cats and dogs respectively. (Hover over yellow keywords to see the tooltips.)

<fairness-explorable></fairness-explorable>

## Many More Metrics

The experiment above introduced five fairness metrics:

- Group Fairness <dt-cite cite="dwork2012fairness"></dt-cite>
- Equalised Odds <dt-cite cite="hardt2016equality"></dt-cite>
- Conditional Use Accuracy Equality <dt-cite cite="berk2018fairness"></dt-cite>
- Overall Accuracy Equality <dt-cite cite="berk2018fairness"></dt-cite>
- Treatment Equality <dt-cite cite="berk2018fairness"></dt-cite>

In addition to these, there are plenty more fairness metrics enumerated by Verma and Rubin <dt-cite cite="verma2018fairness"></dt-cite> and Narayanan <dt-cite cite="narayanan2018translation"></dt-cite>. There are all sorts of ingenious ideas including calibration <dt-cite cite="kleinberg2016inherent,chouldechova2017fair"></dt-cite> and fairness through awareness <dt-cite cite="dwork2012fairness"></dt-cite>. <span class="emph">These metrics all have different priorities and justifications and they exemplify the importance of context when discussing fairness</span>.

<div>
<img class="comic" width="450px" src="{{ "/assets/guide/comics/manymetrics_inverted.png" | relative_url }}" title="Is the temperature in Kelvin, Celsius or Farenheit? Yes." alt="There are a ton of metrics to measure fairness.">
</div>

## The Impossibility Theorem of Fairness

For our fictional AI system above, we had complete control over the system's accuracy. Even so, you may have noticed that it was impossible to fulfill all five fairness metrics at the same time. Similar phenomena have been documented in the real world.

In ProPublica's well-known article [Machine Bias](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing) <dt-cite cite="angwin2016machine"></dt-cite>, the subtitle reads: 

> There’s software used across the country to predict future criminals. And it’s biased against blacks.

In their article, ProPublica documented the "significant racial disparities" found in COMPAS's predictions. But in their response, Northpointe disputed ProPublica's claims. Later on, we would discover that NorthPointe and ProPublica had different ideas about what constituted *fairness*. Northpointe used Conditional Use Accuracy Equality, while ProPublica used Treatment Equality (see demo above for details).

Turns out, it is impossible to satisfy both definitions of fairness, given populations with different base rates of recidivism <dt-cite cite="kleinberg2016inherent,chouldechova2017fair"></dt-cite>. This is similar to our example above of fat pets. Now, different base rates of recidivism do not mean that certain individuals are more prone to re-offending by virtue of race. Instead of racial predisposition, such trends are more likely due to unequal treatment and circumstances from past and present biases.

### So fairness is impossible?

The point of all these is not to show that fairness does not make sense. After all, notions of fairness are heavily based on context and culture. Different definitions that appear incompatible simply reflect this context-dependent nature.

But this also means that it is super critical to have a deliberate discussion about what constitutes fairness. For each AIS, the AI practitioners, their clients and the users of the AIS need to base their conversations on the same definition of fairness. <span class="emph">We cannot assume that everyone has the same idea of fairness.</span>

While it could be ideal for everyone to have a say in what definition of fairness to use, sometimes this can be difficult. <span class="emph">At the very least, AI practitioners should be upfront with their users about fairness considerations in the design of the AIS. This includes what fairness definition was used and why, as well as potential shortcomings.</span>

---

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
</script>
