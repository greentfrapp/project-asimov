---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/fairness/disparate/
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

<tofro prevtext="Fairness" prevlink="../" nexttext="A Fair Fat Pet Predictor" nextlink="../fat_pet/"></tofro>

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
