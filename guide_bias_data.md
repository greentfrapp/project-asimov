---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/bias/data/
---

## Bias from Data

---

In this section, we look at sources of bias across the data preparation process. We assume that we already have a well-defined problem and a rough idea of how the AIS will be deployed. We should also have an initial list of sensitive traits to evaluate sources of bias.

---

### Defining the Population

The "population" refers our AIS's target audience or all the possible inputs to our AIS. For example, our earlier fat pet predictor is targeted at all cats and dogs. So the population would be all present and future cats and dogs. A simple baseline is to document the distributions of sensitive traits in the population.

<p class="box-blue">
  Facial recognition is currently being used for passenger boarding for certain airlines and airports <dt-cite cite="funk2019i"></dt-cite>. Privacy concerns aside, suppose we define the population as white folks aged 18 to 60. Then we should be prepared for the disaster when we realize our AIS fails for non-white, juvenile or elderly passengers. Instead, we might want to document the population along the sensitive traits of race, gender, age and face-related anomalies.
</p>

Defining the population is critical because this has downstream effects on how we collect data and design the model. An AIS based on an ill-defined population is likely to fail for the actual target audience.

Historical bias <dt-cite cite="suresh2019framework"></dt-cite> can make it difficult to accurately define the population. Effort must be put into understanding the sociotechnical context of the problem. In the example above, it is intuitive to use past passenger records to characterize our population. But imagine if the records only document the purchaser's information. We might then miss out on young passengers who are unlikely to be buying their own tickets.

<p class="box-red emph">
  Bias can crop up when the <em>defined</em> population is not the <em>actual</em> population. Be wary of unintended historical bias when defining the population.
</p>

---

### Dataset versus Population

Assuming we have a correctly defined population, we need to collect a dataset that is representative of this population. Again, a simple baseline references our list of sensitive traits. We need to check that the distributions of sensitive traits are similar for both the dataset and the population.

An alternative is to check that the dataset has equal proportions of all the different subgroups in each trait. This might be useful when certain subgroups are a small minority, so as to ensure sufficient training samples.

*Figure here to illustrate difference between representative sample and parity sample.*

<p class="box-blue">
  Using our facial recognition for boarding example again, the proportion of individuals with face-related anomalies might be very small. A dataset that is representative of the population might contain insufficient instances of these passengers and the trained model might fail to perform well for them.
</p>

Another solution that we will touch on in the next section is to train separate models for subgroups. This can prevent a dominant group from overwhelming a model in cases of class imbalance.

<p class="box-red emph">
  Bias can crop up when the diversity in the population is not well-represented in the dataset. 
</p>

---

### The Target Variable

How do we label our dataset? Sometimes this is simple and our objective translates to a clear label. A dataset for a fat pet predictor just has to label overweight pets. A dataset for a spam filter just has to label... well... spam. But sometimes, the objective is more abstract or difficult to formalize <dt-cite cite="barocas2016big"></dt-cite>.

#### Substitutes / Proxies

When the target variable cannot be easily or accurately measured, we might employ substitutes or proxies.

<p class="box-blue">
  A common example is collecting data for a recidivism prediction algorithm. Ideally, the label should be whether an individual has committed a crime again. But lacking omniscience, we have to make do with whether an individual has been <em>arrested</em> again. This is obviously an imperfect substitute. A crafty criminal might be able to escape a second arrest. An unlucky individual might be wrongly arrested and convicted.
</p>

In such cases, we have to be acutely aware that we are using an **imperfect substitute**. This should also be communicated to users of the AIS.

#### Subjective Objectives

In some cases, the target variable is actually a subjective judgement. This increases the chances of bias creeping into the dataset via subjective labels.

<p class="box-blue">
  For example, an AIS for filtering job applicants will require a dataset with labels of "good" and "bad" applicants. This can be very subjective, differing from employer to employer. Past employment history could have embedded biases along gender, race, age and other attributes.
</p>

Where possible, subjective labels should be replaced with clearly defined and well-justified criteria. Otherwise, datasets with subjective labels should be inspected for biases along the sensitive traits identified earlier.

<tofro prevtext="Sources of Bias" prevlink="../sources/"></tofro>

## References

<dt-bibliography></dt-bibliography>

<script type="text/bibliography">

@misc{funk2019i,
  title = {I Opted Out of Facial Recognition at the Airport — It Wasn't Easy},
  author={Funk, Allie},
  url={https://www.wired.com/story/opt-out-of-facial-recognition-at-the-airport/},
  year={2019},
  note = {Accessed: 2019-07-15},
  publisher={Wired}
}

@article{suresh2019framework,
  title={A Framework for Understanding Unintended Consequences of Machine Learning},
  author={Suresh, Harini and Guttag, John V},
  journal={arXiv preprint arXiv:1901.10002},
  year={2019}
}

@article{barocas2016big,
  title={Big data's disparate impact},
  author={Barocas, Solon and Selbst, Andrew D},
  journal={Calif. L. Rev.},
  volume={104},
  pages={671},
  year={2016},
  publisher={HeinOnline}
}

</script>
