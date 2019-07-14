---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/fairness/context_free/
---

## Context-Free Fairness

Computer scientists might often prefer general algorithms that is agnostic to context and application. The agnostic nature of unstructured deep learning is often cited as a huge advantage compared to labor-intensive feature engineering. So the importance of context in understanding fairness can be a bane to computer scientists, who might like to "[abstract] away the social context in which these systems will be deployed" <dt-cite cite="selbst2019fairness"></dt-cite>.

But as Selbst et al. write in their work on fairness in sociotechnical systems:

> Fairness and justice are properties of social and legal systems like employment and criminal justice, not properties of the technical tools within. **To treat fairness and justice as terms that have meaningful application to technology separate from a social context is therefore to make a category error, or as we posit here, an abstraction error.** [emphasis mine]

On a similar note, in Peter Westen's The Empty Idea of Equality <dt-cite cite="westen1982empty"></dt-cite>, he writes:

> For [equality] to have meaning, it must incorporate some external values that determine which persons and treatments are alike [...]

<span class="emph">In other words, the treatment of fairness, justice and equality *cannot* be separated from the specific context of the problem at hand.</span>

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

Hence we crowned the most important question in this entire guide as, "When is AI not the answer?" (mentioned [here](../about_ai/#when-is-ai-not-the-answer)). AI practitioners are naturally biased towards AI-driven solutions, which would be an impedement when the ideal solution might be far from AI-driven.

---

This piece by Selbst et al. is important because it highlights many obstacles to designing fair AIS, all of which are often deeply embedded in the psyche of an AI practitioner. Upon a close reading of the work, readers might realize that the five traps are essentially variants of each other and can be ultimately attributed to a lack of appreciation for the sociotechnical context. Perhaps the most important thing to pick up from this is that AI practitioners *have* to treat their application's subject matter with humility, rather than naively and arrogantly assuming that AIS can simply solve everything.

<span class="emph">TL;DR - Nope, there is no context-free theory of fairness yet and maybe there shouldn't be one.</span>

<tofro prevtext="The Impossibility Theorem" prevlink="../impossible/" nexttext="Algorithmic Bias" nextlink="../../bias/"></tofro>

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
