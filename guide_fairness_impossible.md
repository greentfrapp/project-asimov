---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/fairness/impossible/
---

## The Impossibility Theorem

<div>
<img class="comic" width="450px" src="{{ "/assets/guide/comics/bongo_inverted.gif" | relative_url }}" title="Before working at Apple, Siri acted at Studio Ghibli." alt="Some fairness definitions are mutually exclusive.">
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
  In their article, ProPublica documented the "significant racial disparities" found in COMPAS's predictions. But in their response, Northpointe disputed ProPublica's claims. Later on, we would discover that NorthPointe and ProPublica had different ideas about what constituted *fairness*. Northpointe used Conditional Use Accuracy Equality, while ProPublica used Treatment Equality (see demo above for details).
</p>
</div>

Turns out, it is impossible to satisfy both definitions of fairness, given populations with different base rates of recidivism <dt-cite cite="kleinberg2016inherent,chouldechova2017fair"></dt-cite>. This is similar to our example above of fat pets. Now, different base rates of recidivism do not mean that certain individuals are more prone to re-offending by virtue of race. Instead of racial predisposition, such trends are more likely due to unequal treatment and circumstances from past and present biases. In our fat pets example, dogs might have a higher base rate for obesity not because dogs have fat genes but because dog owners tend to be overly enthusiastic about feeding their pets.

### So fairness is impossible?

The point of all these is not to show that fairness does not make sense. After all, notions of fairness are heavily based on context and culture. Different definitions that appear incompatible simply reflect this context-dependent nature.

But this also means that it is super critical to have a deliberate discussion about what constitutes fairness. This deliberate discussion must be nested in the context of how and where the AIS will be used. For each AIS, the AI practitioners, their clients and users of the AIS need to base their conversations on the same definition of fairness. <span class="emph">We cannot assume that everyone has the same idea of fairness.</span> While it could be ideal for everyone to have a say in what definition of fairness to use, sometimes this can be difficult.

<p class="box-red emph">At the very least, AI practitioners should be upfront with their users about fairness considerations in the design of the AIS. This includes what fairness definition was used and why, as well as potential shortcomings.</p>

<tofro prevtext="A Fair Fat Pet Predictor" prevlink="../fat_pet/" nexttext="Context-Free Fairness" nextlink="../context_free/"></tofro>

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
