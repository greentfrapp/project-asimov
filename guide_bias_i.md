---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/bias_i/
---

# Understanding Bias Part I

<div class="box-red">
<blockquote>
  <p>
    Accordingly, we use the term bias to refer to computer systems that <em>systematically</em> and <em>unfairly discriminate</em> against certain individuals or groups of individuals in favor of others.
  </p>
  <p>
    <em>Bias in Computer Systems - Friedman & Nissenbaum, 1996</em>
  </p>
</blockquote>
<p class="emph">
  What is so bad about algorithmic bias anyway? How has it affected the world? To figure out what algorithmic bias is, it can be useful to consider some real-world examples.
</p>
<p>
  In this chapter, we take a look at what some consequences of algorithmic bias look like.
</p>

<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How might we analyze the harm caused by algorithmic bias?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What are some examples of harms of allocation?
    </div>
  </div>
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        What are some examples of harms of representation?
    </div>
  </div>
</div>

</div>

---

## Two Types of Harms

AIS are increasingly used to help **allocate** resources. Credit scoring models that help banks filter loan applications "allocate" loans. Hiring models help companies to "allocate" jobs. Medical diagnosis models help to "allocate" appropriate treatment. The AIS in these examples help identify who to give what. We are affected by these systems because we are denied or given something as a result of an AIS decision.

On a more abstract level, AIS are also increasingly affecting the way we perceive or **represent** the world. Think Google Search, Facebook's News Feed and YouTube's Recommended feed. This is also known as "filtering" <dt-cite cite="susskind2018future"></dt-cite>. The modern person connected to the Internet has access to a vast amount of information but limited time and attention. These AIS prevent us from being overwhelmed and help us focus on the most relevant articles and news. We are affected by these systems because these filters shape our perceptions and thoughts about the world.

We can classify the consequences of algorithmic bias in the same way. This was proposed by Kate Crawford in her NIPS 2017 keynote The Trouble with Bias <dt-cite cite="crawford2017trouble"></dt-cite>. Crawford first defined algorithmic bias as "a skew that produces a type of harm". She then further classifies algorithmic biases into harms of **allocation** and harms of **representation**. Over the next two sections, we will use the same framework to look at some real-world examples of algorithmic bias.

<table style="font-size: 1.25rem;">
  <thead>
    <tr>
      <th>Harms of Allocation</th>
      <th>Harms of Representation</th>
    </tr>
  </thead>
  <tbody style="font-weight: 400;">
    <tr>
      <td>Immediate</td>
      <td>Long term</td>
    </tr>
    <tr>
      <td>Easily quantifiable</td>
      <td>Difficult to formalize</td>
    </tr>
    <tr>
      <td>Discrete</td>
      <td>Diffuse</td>
    </tr>
    <tr>
      <td>Transactional</td>
      <td>Cultural</td>
    </tr>
  </tbody>
</table>

*Comparison between the two types of harm, from Crawford's NIPS 2017 keynote <dt-cite cite="crawford2017trouble"></dt-cite>*

<div class="box-red">
<div class="ui list">
  <div class="item">
    <i class="check circle icon"></i>
    <div class="content">
        How might we analyze the harm caused by algorithmic bias? 
    </div>
  </div>
</div>
<div class="emph">
  <p>
    A framework proposed by Kate Crawford classifies algorithmic bias by the type of harm caused. Harms of allocation refers to unfairly assigned opportunities or resources due to algorithmic intervention. Harms of representation refers to algorithmically filtered depictions that are discriminatory.
  </p>
</div>
</div>

---

## Harms of Allocation

> An allocative harm is when a system allocates or withholds certain groups an opportunity or a resource.

*The Trouble with Bias, Kate Crawford at NIPS2017 <dt-cite cite="crawford2017trouble"></dt-cite>*

> Automated eligibility systems, ranking algorithms, and predictive risk models control which neighborhoods get policed, which families attain needed resources, who is short-listed for employment, and who is investigated for fraud.

*Automating Inequality - Virginia Eubanks <dt-cite cite="eubanks2018automating"></dt-cite>*

Harms of allocation arise from the unjust distribution of opportunities and resources, such as jobs, loans, insurance and education. An allocative harm can range from a small but significant and systematic difference in treatment, all the way to complete denial of a particular service.

### COMPAS

"Allocation" of freedom

### Example 2 - Redlining `WIP`

For more examples of allocative harms, check out Cathy O'Neil's Weapons of Math Destruction <dt-cite cite="o2016weapons"></dt-cite> and Viriginia Eubanks's Automating Inequality <dt-cite cite="eubanks2018automating"></dt-cite>.

---

## Harms of Representation

> [Representative harms] occur when systems reinforce the subordination of some groups along the lines of identity.

*The Trouble with Bias, Kate Crawford at NIPS2017 <dt-cite cite="crawford2017trouble"></dt-cite>*

> If you control the flow of information in a society, you can influence its shared sense of right and wrong, fair and unfair, clean and unclean, seemly and unseemly, real and fake, true and false, known and unknown.

*Future Politics - Jamie Susskind, 2018 <dt-cite cite="susskind2018future"></dt-cite>*

### Google Image Search

Studies have found that Google's Image Search perpetuated and exacerbated gender and racial stereotypes <dt-cite cite="otterbacher2017competent,kay2015unequal"></dt-cite>. Let's take the simple and vivid example of Google's Image Search for the term "CEO".  In April 2015, a Google Image search for the term "CEO" returned results dominated by white male figures. Although to Google's credit, current searches appear to be more diverse (see below).

<div>
<img src="{{ "/assets/guide/images/ceo_old.jpg" | relative_url }}" alt="Google Image Search for CEO in April 2015.">
</div>

*Results from Google Image Search for "CEO" in April 2015 (retrieved from [here](https://www.huffpost.com/entry/google-image-gender-bias_n_7036414) <dt-cite cite="cohn2015google"></dt-cite>) were dominated by photos of white males.*

<div>
<img src="{{ "/assets/guide/images/ceo_new.png" | relative_url }}" alt="Google Image Search for CEO in July 2019.">
</div>

*Results from Google Image Search for "CEO" in July 2019 show a more diverse distribution, in terms of race and gender.*

Harms of representation are dangerous because they shape how we see the world. And in turn, how we see the world shapes the world. A generation raised solely on fairy tales of damsels in distress might not recognize the existence of heroines and men in need of saving. A generation raised solely on image search results of white male CEOs may find it difficult to entertain the possibility of a non-male non-white CEO. By limiting our cognitive vocabulary, these harmful representations become additional psychological obstacles that must be overcome.

Furthermore, when these harmful representations manifest themselves as biased actions and decisions they become self-fulfilling prophecies. Fed on a diet of white male CEO images, non-male non-white individuals might never fight for that position. Fed on a diet of white male CEO images, we might never encourage non-male non-white individuals to take up the mantle. We might even discourage them from pursuing what seems like an unrealistic dream. This means fewer non-white non-male CEOs and the image search results turn out to be right after all.

<div>
<img class="comic" width="250px" src="{{ "/assets/guide/comics/harmsofrep_inverted.png" | relative_url }}" alt="The Reality-Representation Cycle.">
</div>

It is worth noting that there are two possible problems when looking at harms of representation. Inaccurate representations and unideal representations.

#### Inaccurate Representations

The Google Image results in April 2015 were entirely dominated by white males. Technically, in 2014, 4% of the 500 companies on the US S&P 1500 had female CEOs <dt-cite cite="ey2015women"></dt-cite>. Search results that do not observe this distribution would be **inaccurate representations**. For example, search results that have zero female images would be inaccurate and enforce false and exaggerated gender stereotypes. Subsequently, downstream applications that rely on these representations would perpetuate such errors. On the other hand, search results that follow the 4% female proportion would be an accurate representation.

#### Unideal Representations

In March 2015, the New York Times ran an article titled "Fewer Women Run Big Companies Than Men Named John" <dt-cite cite="wolfers2015fewer"></dt-cite>. This contributed to a growing literature on gender inequality, founded on the conviction that gender should not matter for most careers. Such literature describes an ideal world where the gender distribution of CEOs is equal, or at least similar to the gender distribution of the general population. Search results that stray from this would be **unideal representations**.

Representations both embed and influence unwritten norms and values. Following the cycle between representation and reality, we can make the world a better place by first *seeing* it as a better place. In our example, the presence of more gender- and race-diverse search results for "CEO" can encourage non-white non-male candidates to go from minority to mainstream.

<p class="emph">There is merit behind both an accurate representation and an ideal representation. But in an imperfect world, any representation cannot be both accurate and ideal. Decisions and compromises have to be made about what is important in the context of the application. And once again, these decisions and compromises should be shared with users of these systems.</p>

<!-- Since we are talking about Google, let's have a quick peek at another example of representative harm in Google Translate. Other examples of representative harms include stereotypes learned in word embedding models <dt-cite cite="caliskan2017semantics,zhao2018gender,garg2018word"></dt-cite> and image captioning models <dt-cite cite="zhao2017men,hendricks2018women"></dt-cite>. -->

### Example 2 - Gender Shades `WIP`

<tofro prevtext="Understanding Fairness" prevlink="../fairness" nexttext="Bias Part II" nextlink="../bias_ii/"></tofro>

## References

<dt-bibliography></dt-bibliography>

<script type="text/bibliography">

@inproceedings{crawford2017trouble,
  title={The trouble with bias},
  author={Crawford, Kate},
  booktitle={Conference on Neural Information Processing Systems, invited speaker},
  url={https://www.youtube.com/watch?v=fMym_BKWQzk},
  year={2017}
}

@book{susskind2018future,
  title={Future politics: Living together in a world transformed by tech},
  author={Susskind, Jamie},
  year={2018},
  publisher={Oxford University Press}
}

@inproceedings{otterbacher2017competent,
  title={Competent men and warm women: Gender stereotypes and backlash in image search results},
  author={Otterbacher, Jahna and Bates, Jo and Clough, Paul},
  booktitle={Proceedings of the 2017 CHI Conference on Human Factors in Computing Systems},
  pages={6620--6631},
  year={2017},
  organization={ACM}
}

@inproceedings{kay2015unequal,
  title={Unequal representation and gender stereotypes in image search results for occupations},
  author={Kay, Matthew and Matuszek, Cynthia and Munson, Sean A},
  booktitle={Proceedings of the 33rd Annual ACM Conference on Human Factors in Computing Systems},
  pages={3819--3828},
  year={2015},
  organization={ACM}
}

@misc{langston2015who,
  title = {Who's a CEO? Google image results can shift gender biases},
  author={Langston, Jennifer},
  url={https://www.washington.edu/news/2015/04/09/whos-a-ceo-google-image-results-can-shift-gender-biases/},
  year={2015},
  note = {Accessed: 2019-07-13},
  publisher={University of Washington}
}

@misc{cohn2015google,
  title = {Google Image Search Has A Gender Bias Problem},
  author={Cohn, Emily},
  url={https://www.huffpost.com/entry/google-image-gender-bias_n_7036414},
  year={2015},
  note = {Accessed: 2019-07-13},
  publisher={Huffpost}
}

@misc{wolfers2015fewer,
  title = {Fewer Women Run Big Companies Than Men Named John},
  author={Wolfers, Justin},
  url = {https://www.nytimes.com/2015/03/03/upshot/fewer-women-run-big-companies-than-men-named-john.html},
  year={2015},
  note = {Accessed: 2019-07-13},
  publisher={The New York Times}
}

@misc{ey2015women,
  title = {Women on US boards: what are we seeing?},
  author={Ernst & Young},
  url = {https://www.ey.com/Publication/vwLUAssets/EY_-_Women_on_US_boards:_what_are_we_seeing/$FILE/EY-women-on-us-boards-what-are-we-seeing.pdf},
  year={2015},
  note = {Accessed: 2019-07-13},
  publisher={Ernst & Young}
}

@book{o2016weapons,
  title={Weapons of math destruction: How big data increases inequality and threatens democracy},
  author={O'Neil, Cathy},
  year={2016},
  publisher={Broadway Books}
}

@article{caliskan2017semantics,
  title={Semantics derived automatically from language corpora contain human-like biases},
  author={Caliskan, Aylin and Bryson, Joanna J and Narayanan, Arvind},
  journal={Science},
  volume={356},
  number={6334},
  pages={183--186},
  year={2017},
  publisher={American Association for the Advancement of Science}
}

@article{zhao2017men,
  title={Men also like shopping: Reducing gender bias amplification using corpus-level constraints},
  author={Zhao, Jieyu and Wang, Tianlu and Yatskar, Mark and Ordonez, Vicente and Chang, Kai-Wei},
  journal={arXiv preprint arXiv:1707.09457},
  year={2017}
}

@article{zhao2018gender,
  title={Gender bias in coreference resolution: Evaluation and debiasing methods},
  author={Zhao, Jieyu and Wang, Tianlu and Yatskar, Mark and Ordonez, Vicente and Chang, Kai-Wei},
  journal={arXiv preprint arXiv:1804.06876},
  year={2018}
}

@article{garg2018word,
  title={Word embeddings quantify 100 years of gender and ethnic stereotypes},
  author={Garg, Nikhil and Schiebinger, Londa and Jurafsky, Dan and Zou, James},
  journal={Proceedings of the National Academy of Sciences},
  volume={115},
  number={16},
  pages={E3635--E3644},
  year={2018},
  publisher={National Acad Sciences}
}

@inproceedings{hendricks2018women,
  title={Women also snowboard: Overcoming bias in captioning models},
  author={Hendricks, Lisa Anne and Burns, Kaylee and Saenko, Kate and Darrell, Trevor and Rohrbach, Anna},
  booktitle={European Conference on Computer Vision},
  pages={793--811},
  year={2018},
  organization={Springer}
}

@book{eubanks2018automating,
  title={Automating inequality: How high-tech tools profile, police, and punish the poor},
  author={Eubanks, Virginia},
  year={2018},
  publisher={St. Martin's Press}
}


</script>
