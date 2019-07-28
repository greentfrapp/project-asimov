---
layout: guide_default
title: Resources \| Machines Gone Wrong
permalink: /guide/resources/
---

# Resources

---

### Offline Guide

An offline copy of this guide. Interactive components, such as the [explorable](../fairness/#a-fair-fat-pet-predictor), are left out. But it has been nicely formatted for you to print on sheets of dead tree matter.

[Download the offline guide](../resources/MachinesGoneWrong.pdf)

### Other Websites and Guides

Useful or interesting links related to algorithmic bias.

- **[Survival of the Best Fit](https://www.survivalofthebestfit.com/)** - a game about algorithmic bias in hiring
- Google's **[People + AI Guidebook](https://pair.withgoogle.com/)** and **[Inclusive ML Guide](https://cloud.google.com/inclusive-ml/)**
- The **[Financial Modelers' Manifesto](http://www.uio.no/studier/emner/sv/oekonomi/ECON4135/h09/undervisningsmateriale/FinancialModelersManifesto.pdf)** written by Emanuel Derman and Paul Wilmott was written for quants and financial engineers amidst the fallout of the subprime mortgage crisis, but the lessons are very applicable to today's AI engineers <tidbit content="<blockquote><h4 style='margin-top:10px;'>The Modelers' Hippocratic Oath</h4><ul><li>I will remember that I didn't make the world, and it doesn't satisfy my equations.</li><li>Though I will use models boldly to estimate value, I will not be overly impressed by mathematics.</li><li>I will never sacrifice reality for elegance without explaining why I have done so.</li><li>Nor will I give the people who use my model false comfort about its accuracy. Instead, I will make explicit its assumptions and oversights.</li><li>I understand that my work may have enormous effects on society and the economy, many of them beyond my comprehension.</li></ul></blockquote>"></tidbit>

<!-- - Andreesen Horowitz's [AI Playbook](http://aiplaybook.a16z.com/) -->

### Organizations and Conferences

- The **[AI Now Institute](https://ainowinstitute.org/)** is working actively on AI ethics and has many great [publications](https://ainowinstitute.org/reports.html)
- **[FAT ML](https://www.fatml.org/)** and **[ACM FAT\*](https://fatconference.org/)** are two of the main conferences in AI ethics - check out the conference websites for related publications

### Datasets

Datasets for the more bias-aware.

- **Gapminder's [Dollar Street images](https://www.gapminder.org/dollar-street/matrix)**, which was used by DeVries et al. <dt-cite cite="devries2019does"></dt-cite> in *Does Object Recognition Work for Everyone?* and comprises over 16,000 images from 60 different countries across 138 categories - a downloadable set can be found via [my GitHub repository](https://github.com/greentfrapp/dollar-street-images/)
- **Google's [Open Images Extended - Crowdsourced](https://ai.google/tools/datasets/open-images-extended-crowdsourced/)**,  - Google has also provided some notes on possible biases in this dataset <tidbit content="- retrieved from the <a href='https://www.kaggle.com/c/inclusive-images-challenge/overview/inclusive-images-faq#stage1-biases'>Kaggle FAQ</a>: <br/><blockquote><p>While we have targeted specific geographical locations in the collection of the Challenge Stage 1 dataset, it does have some particular areas of over and under representation that we found in preliminary analysis and wish to describe briefly here. These include:</p><ul><li>Images of people tend to under-represent people who appear to be elderly.</li><li>Images tagged Child tend to be seen mostly in the context of play.</li><li>Some Person-related categories, including Bartender, Police Officer, and several sports related tags, appear to be predominantly (but by no means entirely) male.</li><li>Some Person-related categories, including Teacher, appear to be predominantly (but by no means entirely) female.</li><li>Some Person-related categories, including Teacher, appear to be predominantly (but by no means entirely) female.</li><li>Images with people seem to be taken predominantly in urban rather than rural areas.</li><li>Images of people in traditional locale-specific dress such as Sari’s in India are relatively under-represented in this Challenge Stage 1 data set.</li><li>In images tagged Wedding, there does not appear to be representation of same-sex marriages.</li></ul></blockquote>"></tidbit>
- Joy Buolamwini's **Gender Shades dataset** <dt-cite cite="buolamwini2018gender"></dt-cite> can be requested [here](https://www.ajlunited.org/gender-shades)

### Tools

Tools for diagnosing and mitigating algorithmic bias, complete with detailed tutorials.

- IBM’s **[AI Fairness 360 Open Source Toolkit](http://aif360.mybluemix.net/)**
- Microsoft’s **[InterpretML](https://github.com/microsoft/interpret)**
- Tensorboard’s **[What If](https://pair-code.github.io/what-if-tool/index.html)**

### Readings

Academic publications related to algorithmic bias that I found useful.

- **Do Artifacts have Politics?** (Winner, 1980) <dt-cite cite="winner1980artifacts"></dt-cite>
- **Bias in Computer Systems** (Friedman and Nissenbaum, 1996) <dt-cite cite="friedman1996bias"></dt-cite>
- **Technologies of Humility** (Jasanoff, 2007) <dt-cite cite="jasanoff2007technologies"></dt-cite>
- **Big Data's Disparate Impact** (Barocas and Selbst, 2016) <dt-cite cite="barocas2016big"></dt-cite>
- **Inherent Trade-offs in the Fair Determination of Risk Scores** (Kleinberg et al., 2016) <dt-cite cite="kleinberg2016inherent"></dt-cite>
- **Interventions over Predictions: Reframing the Ethical Debate for Actuarial Risk Assessment** (Barabas et al., 2017) <dt-cite cite="barabas2017interventions"></dt-cite>
- **Fairness Definitions Explained** (Verma et al., 2018) <dt-cite cite="verma2018fairness"></dt-cite>
- **Fairness and Abstraction in Sociotechnical Systems** (Selbst et al., 2019) <dt-cite cite="selbst2019fairness"></dt-cite>
- **A Framework for Understanding Unintended Consequences of Machine Learning** (Suresh and Guttag, 2019) <dt-cite cite="suresh2019framework"></dt-cite>

<tofro prevtext="Summary Checklist" prevlink="../checklist/" nexttext="About" nextlink="../about/"></tofro>

## References

<dt-bibliography></dt-bibliography>

<script type="text/bibliography">
  
@inproceedings{buolamwini2018gender,
  title={Gender shades: Intersectional accuracy disparities in commercial gender classification},
  author={Buolamwini, Joy and Gebru, Timnit},
  booktitle={Conference on fairness, accountability and transparency},
  pages={77-91},
  year={2018},
  url={http://proceedings.mlr.press/v81/buolamwini18a.html}
}

@article{devries2019does,
  title = {Does Object Recognition Work for Everyone?},
  author = {DeVries, Terrance and Misra, Ishan and Wang, Changhan and van der Maaten, Laurens},
  journal = {arXiv preprint arXiv:1906.02659},
  year = {2019},
  url = {https://arxiv.org/abs/1906.02659}
}

@article{friedman1996bias,
  title={Bias in computer systems},
  author={Friedman, Batya and Nissenbaum, Helen},
  journal={ACM Transactions on Information Systems (TOIS)},
  volume={14},
  number={3},
  pages={330-347},
  year={1996},
  publisher={ACM},
  url={https://dl.acm.org/citation.cfm?id=230561}
}

@article{winner1980artifacts,
  title={Do artifacts have politics?},
  author={Winner, Langdon},
  journal={Daedalus},
  pages={121-136},
  year={1980},
  publisher={JSTOR},
  url={https://www.jstor.org/stable/pdf/20024652.pdf}
}

@article{jasanoff2007technologies,
  title={Technologies of humility},
  author={Jasanoff, Sheila},
  journal={Nature},
  volume={450},
  number={7166},
  pages={33},
  year={2007},
  publisher={Nature Publishing Group},
  url={http://www.imgwf.uni-luebeck.de/fileadmin/oeffentlich/JASANOFF_2007_Technologies_of_humility_Nature.pdf}
}

@article{barocas2016big,
  title={Big data's disparate impact},
  author={Barocas, Solon and Selbst, Andrew D},
  journal={Calif. L. Rev.},
  volume={104},
  pages={671},
  year={2016},
  publisher={HeinOnline},
  url={http://www.cs.yale.edu/homes/jf/BarocasSelbst.pdf}
}

@article{kleinberg2016inherent,
  title={Inherent trade-offs in the fair determination of risk scores},
  author={Kleinberg, Jon and Mullainathan, Sendhil and Raghavan, Manish},
  journal={arXiv preprint arXiv:1609.05807},
  year={2016},
  url = {https://arxiv.org/abs/1609.05807}
}

@article{barabas2017interventions,
  title={Interventions over predictions: Reframing the ethical debate for actuarial risk assessment},
  author={Barabas, Chelsea and Dinakar, Karthik and Ito, Joichi and Virza, Madars and Zittrain, Jonathan},
  journal={arXiv preprint arXiv:1712.08238},
  year={2017},
  url={https://arxiv.org/abs/1712.08238}
}

@inproceedings{verma2018fairness,
  title={Fairness definitions explained},
  author={Verma, Sahil and Rubin, Julia},
  booktitle={2018 IEEE/ACM International Workshop on Software Fairness (FairWare)},
  pages={1-7},
  year={2018},
  organization={IEEE},
  url={https://dl.acm.org/citation.cfm?id=3194776}
}

@inproceedings{selbst2019fairness,
  title={Fairness and abstraction in sociotechnical systems},
  author={Selbst, Andrew D and Boyd, Danah and Friedler, Sorelle A and Venkatasubramanian, Suresh and Vertesi, Janet},
  booktitle={Proceedings of the Conference on Fairness, Accountability, and Transparency},
  pages={59-68},
  year={2019},
  organization={ACM},
  url={http://friedler.net/papers/sts_fat2019.pdf}
}

@article{suresh2019framework,
  title={A Framework for Understanding Unintended Consequences of Machine Learning},
  author={Suresh, Harini and Guttag, John V},
  journal={arXiv preprint arXiv:1901.10002},
  year={2019},
  url={https://arxiv.org/abs/1901.10002}
}

</script>
