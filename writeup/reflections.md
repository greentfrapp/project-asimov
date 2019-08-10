## Reflections

In this section, we look at the limitations of the current guide and takeaways for future work. The current online primer focuses on algorithmic bias. Possible future work might extend the primer to other topics including black boxes, privacy violations, ghost work and misinformation.

### Limitations

The main limitations of the current primer include a lack of diversity in the source materials and a lack of practical examples. 

#### Diversity of Sources

In the *Understanding Bias II - Transfering Models and Datasets* section, we cited ImageNet as a popular image dataset that was Western-centric. This acts as a potential source of bias when we design AI systems for non-Western or international contexts. Ironically, the online primer also has a similar limitation, as the references and examples are mainly Western-centric.

One factor that contributed to this issue was the extensive online coverage of algorithmic bias set in the American context. This was compounded by our proficiency in researching American and European articles and the lack of proficiency in researching non-Western publications. A similar issue that characterizes the US-China AI divide is summarized by Jeffrey Ding in a MIT Technology Review article <dt-cite cite="ding2019what"></dt-cite>.

> "The Chinese- and English-speaking AI communities have an asymmetrical understanding of each other. Most Chinese researchers can read English, and nearly all major research developments in the Western world are immediately translated into Chinese, but the reverse is not true. Therefore, the Chinese research community has a much deeper understanding than the English-speaking one of what’s happening on both sides of the aisle."

In order to improve the relevance of the primer to an international audience, the lack of diverse sources and examples is a significant limitation that needs to be resolved. A possible solution is to enlist the help of other researchers and authors from diverse backgrounds, who might be more familiar with examples from their personal experiences.

#### Practical Examples

In the *Resources* section, we listed several tools that might be useful for the reader, including     IBM’s AI Fairness 360 Open Source Toolkit, Microsoft’s InterpretML and Tensorboard’s What If. However, we did not provide practical examples of how these tools could be used, such as coding samples and problem sets.

While detailed tutorials are often available in the respective toolkits' websites, it could be useful and convenient for the reader to look at relevant introductory tutorials and snippets when reading the primer. Practical examples can also add to the interactivity of the guide and help readers better understand how the tools can be used in their own work. For example, in conjunction with the explorable example in the *Understanding Fairness - A Fair Fat Pet Predictor* section, coding examples could be used to demonstrate how the fairness metrics are calculated.

In addition, practical examples can act as a quantitative counterpart to the qualitative examples that already exist within the guide. This can potentially help readers better relate to the concepts, since the target audience - AI practitioners - might be more at home with quantitative formulations and coding samples.

### Takeaways

There are two main takeaways from the design of the online primer. The first concerns the additional sensitivity towards accessibility and ethics-related issues that accompany the subject matter. The second takeaway is that there is indeed a desire for relatable material in this field.

#### A Need for Additional Sensitivity

When writing or publishing a research piece, the authors place themselves in a position of authority or expertise, in relation to their readers. In most cases, the authority or expertise can be justified through practical or academic experience. However, in the case of ethics-related topics, authority or expertise might be debatable since ethics can be a very personal matter. 

As authors writing on this touchy topic, we find ourselves proceeding with extra caution. For instance, the fat pet predictor example was designed to be politically and socially neutral. Also, we were conscientious about the use of gendered pronouns and strove to be respectful to all gender identities. This also goes beyond the written content and extends to the design of the online primer. For example, we observed the WCAG accessibility guidelines when considering the colors used and text-to-background contrast. In addition, we deliberately chose not to embed specialized code for measuring web traffic, in order to minimize the tracking of users through cookies.

We would advise a similar mindset to be adopted for future primers. As advocates of AI ethics, we would simply be "practicing what we preach". This further cements our roles as instructors of the subject. In contrast, a lack of sensitivity for such issues would be undermining our authority, as well as the integrity of the primers.

#### A Need for Relatable Material

Finally, in spite of the primer's shortcomings, we also received very encouraging responses. Several readers from Reddit gave favorable feedback, such as u/marcusklass who commented, "It was accessible, even to someone who really knew nothing about fairness and algorithmic bias." Twitter user @AlanZucconi also took the time to craft a Twitter thread promoting the primer. These positive comments and expressions of interest suggest a need for introductory material to AI ethics that is communicated in a relatable manner. 

As such, we would encourage future primers to be crafted in a similar manner, with a focus on communicating the subject matter in a relatable fashion. As described in the Design Process section, this refers to the use of simpler straightforward language, real-world examples, explorable explanations and interactive elements. We see these primers as fulfilling the roles of launching pads, getting readers up to speed with important concepts before directing them to more detailed resources.
