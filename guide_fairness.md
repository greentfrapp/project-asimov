---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/fairness/
---

# Fairness

*This is to set the stage for the next section on types of bias. See Narayanan's 21 Definitions and Verma & Rubin's Fairness Definitions Explained <dt-cite key="verma2018fairness"></dt-cite>. One important takeaway here is the Impossibility Theorem. Demos here!*

## Terms

TP, FP, TN, FN, PPV/Precision, FDR, FOR, NPV, TPR/Recall/Sensitivity, FPR, FNR, TNR.

Protected and unprotected groups. Maybe a better term is sensitive traits? Or non-relevant traits?

## Case Study 1

Fat Detector for Cats and Dogs

TP - Fat predicted as fat
FP - Thin predicted as fat
TN - Thin predicted as thin
FN - Fat predicted as thin

## Case Study 2

Credit Score Predictor for Men and Women

TP - Good credit predicted as good credit

## Types of Fairness

### Group fairness or statistical parity

<dt-cite key="dwork2012fairness"></dt-cite>

*aka equal acceptance rate <dt-cite key="zliobaite2015relation"></dt-cite> and benchmarking <dt-cite key="simoiu2017problem"></dt-cite>*

Equal positive prediction probability.

Both cats and dogs should have equal probability of being predicted fat.

Both men and women should have equal probability of being predicted as good credit.

### Conditional statistical parity

<dt-cite key="corbett2017algorithmic"></dt-cite>

Extends **statistical parity** with predefined conditions.

Both cats and dogs should have equal probability of being predicted fat, if they are the same age and same weight.

Both men and women should have equal probability of being predicted as good credit, if they have the same age and same job.

### Predictive parity

<dt-cite key="chouldechova2017fair"></dt-cite>

*aka outcome test <dt-cite key="simoiu2017problem"></dt-cite>*

Equal PPV. This also implies equal FDR.

For animals predicted to be fat, the probability of actually being fat should be equal regardless for cats or dogs.

For people predicted as good credit, the probability of actually being good credit should be equal regardless for men or women.

### False positive error rate balance

<dt-cite key="chouldechova2017fair"></dt-cite>

*aka predictive equality <dt-cite key="corbett2017algorithmic"></dt-cite>*

Equal FPR. This also implies equal TNR.

Can be seen as the opposite of predictive parity.

For animals predicted to be not fat, the probability of actually being not fat should be equal regardless for cats or dogs.

For people predicted as bad credit, the probability of actually being bad credit should be equal regardless for men or women.

### False negative error rate balance

<dt-cite key="chouldechova2017fair"></dt-cite>

*aka equal opportunity <dt-cite key="hardt2016equality,kusner2017counterfactual"></dt-cite>*

Equal FNR. This also implies equal TPR.

For animals predicted fat, the probability of actually being thin (i.e. wrong prediction) should be equal regardless for cats or dogs.

For people predicted as good credit, the probability of actually being good (i.e. wrong prediction) should be equal regardless for men or women.

### Equalised odds

<dt-cite key="hardt2016equality"></dt-cite>

*aka conditional procedure accuracy equality <dt-cite key="berk2018fairness"></dt-cite> and disparate mistreatment <dt-cite key="zafar2017fairness"></dt-cite>*

Combines false positive error rate balance and false negative error rate balance. Equal TPR and equal FPR.

Animals that are actually fat should have equal probability of being predicted fat, regardless for cats or dogs. Also, animals that are actually thin should have equal probability of being wrongly predicted fat, regardless for cats or dogs.

People with good credit should have equal probability of being predicted good credit, regardless of gender. Also, people with bad credit should have equal probability of being wrongly predicted good, regardless of gender.

### Conditional use accuracy equality

<dt-cite key="berk2018fairness"></dt-cite>

Equal PPV and NPV.

Whether predicted fat or not, the probability of the prediction being correct should be equal regardless for cats or dogs.

Whether predicted good or bad credit, the probability of the prediction being correct should be equal regardless for men or women.

### Overall accuracy equality

<dt-cite key="berk2018fairness"></dt-cite>

Equal accuracy - probability of any sample to be assigned its correct class.

Whether actually fat or not, the probability of the prediction being correct should be equal regardless for cats or dogs.

Whether actually good or bad credit, the probability of the prediction being correct should be equal regardless for men or women.

### Treatment equality

<dt-cite key="berk2018fairness"></dt-cite>

Equal ratio of FN to FP. The idea here is that wrong predictions lead to samples benefitting or losing disproportionately. So these effects of benefit and loss should be similar across classes.

The ratio of escaped fat animals and wrongly accused thin animals should be equal for cats and dogs.

The ratio of wrongly approved and wrongly rejected good credit scorers should be equal for men and women.

### Test-fairness or calibration

<dt-cite key="chouldechova2017fair"></dt-cite>

*aka matching conditional frequencies <dt-cite key="hardt2016equality"></dt-cite>*

For *any* predicted probability score, samples should have equal probability to be actually positive. Similar to predictive parity but applies for entire probability score spectrum instead of just positive predictions.

Regardless for cats or dogs, animals assigned the same score should have the same chance of actually being fat.

Regardless for men or woman, people assigned the same score should have the same chance of actually having good credit.

### Well calibration

<dt-cite key="kleinberg2016inherent"></dt-cite>

An extension of test-fairness. The probability score should be equal to the probability of the sample actually being positive.

Regardless for cats or dogs, animals assigned the same score should have that same score's probability of actually being fat.

Regardless for men or woman, people assigned the same score should have the same score's probability of actually having good credit.

### Balance for positive class

<dt-cite key="kleinberg2016inherent"></dt-cite>

Positive samples from different non-relevant traits should have equal average predicted probability scores.

Fat cats and fat dogs should have equal average scores.

Good credit men and good credit women should have equal average scores.

### Balance for negative class

<dt-cite key="kleinberg2016inherent"></dt-cite>

Opposite of balance for positive class. Negative samples from different non-relevant traits should have equal average predicted probability scores.

Thin cats and thin dogs should have equal average scores.

Bad credit men and bad credit women should have equal average scores.

### Causal discrimination

<dt-cite key="galhotra2017fairness"></dt-cite>

Samples that are the same except for non-relevant traits should be classified as the same class. This is a stricter form of conditional statistical parity.

Cats and dogs that have the same age and weight should receive the same predictions.

Men and women that have the same age and job should receive the same predictions.

### Fairness through unawareness

<dt-cite key="kusner2017counterfactual"></dt-cite>

Simply, non-relevant traits are not explicitly used in the model. This does not say anything about proxies or correlated traits.

*The testing for this does not seem to make sense in <dt-cite key="verma2018fairness"></dt-cite>.*

### Fairness through awareness

<dt-cite key="dwork2012fairness"></dt-cite>

Dwork's similar individuals should receive similar treatment.

This depends heavily on the distance metric used. See <dt-cite key="dwork2012fairness,verma2018fairness"></dt-cite> for examples.

### Counterfactual fairness

<dt-cite key="kusner2017counterfactual"></dt-cite>

After expressing the model used as a directed acyclic causal graph, the model is considered counterfactually fair if the prediction does not depend on any descendant of a non-relevant attribute.

In other words, the prediction should not depend on the non-relevant attribute or any attributes affected by it. See <dt-cite key="kusner2017counterfactual"></dt-cite> for examples. 

### No unresolved discrimination

<dt-cite key="kilbertus2017avoiding"></dt-cite>

Again using the causal graph, a model has no unresolved discrimination if there is no path from a non-relevant attribute to the prediction, except via resolving (non-discriminatory) variables. See <dt-cite key="kilbertus2017avoiding"></dt-cite> for examples. 

### No proxy discrimination

<dt-cite key="kilbertus2017avoiding"></dt-cite>

Referring to the causal graph, a model has no proxy discrimination if there is no path from a non-relevant attribute to the prediction that is blocked by a proxy variable.

In other words, no proxy variables are used in the prediction.

### Fair inference

<dt-cite key="nabi2018fair"></dt-cite>

> This definition classifies paths in a causal graph as legitimate or illegitimate.

Then fair inference is defined when a model does not use any illegitimate paths. A proxy variable can be legitimate.

## Impossibility Theorems

---

## References

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
