---
layout: guide_fairnessdemo
title: The Guide. \| Project Asimov
permalink: /guide/fairness/fat_pet/
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

---

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

<tofro prevtext="Disparate Treatment and Disparate Impact" prevlink="../disparate/" nexttext="The Impossibility Theorem" nextlink="../impossible/"></tofro>

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
