---
layout: guide_default
title: Summary Checklist \| Machines Gone Wrong
permalink: /guide/checklist/
---

# Summary Checklist

---

Here is a checklist of questions and prompts to ask when implementing an AIS. While there is no strictly correct answer, a good rule of thumb is that we should be okay with publishing our answers publicly.

Again, this checklist is best completed as a group exercise and with extensive inputs from users and people who might interact with the proposed AIS.

---

### Section 1 - Understanding the Context

#### General Context

1. What is the ultimate aim of the application? <tidbit content="<br/>For example, for recidivism prediction, the true objective might be to make the society a safer place. As part of that, we want to identify individuals who might be prone to reoffending and offer them additional help to reduce future crime. Note the many implicit assumpations here. We assume that our sub-goal contributes to our objective. We also assume that reoffending is something that can be reliably predicted."></tidbit>
2. What are the pros and cons of an AIS versus other solutions? <tidbit content="<br/>The main point here is to first weigh all the possible solutions instead of just implementing an AIS immediately."></tidbit>
3. How is the AIS supposed to be used? <tidbit content="<br/>By answering this question, we can begin to think of ways that we can 'nudge' users towards the desired usage, as well as ways that the AIS can be misused."></tidbit>
4. What is the current system that the AIS will be replacing? <tidbit content="<br/>How is the problem being solved at the moment? How is the proposed AIS better than this solution? How is it worse?"></tidbit>
5. Who will interact with the AIS? <tidbit content="<br/>This probably includes more than just the direct users that benefit from the AIS. Hiring models, for instance, interact with both employers (direct users) and job applicants."></tidbit>
6. Create a few user personas - the technophobe, the newbie etc. - and think about how they might react to the AIS across the short-term and long-term. <tidbit content="<br/>This question examines the 'ripples' that the AIS might cause when it is implemented, ranging from the short-term to the long-term."></tidbit>
7. Think of ways that the AIS can be misused by unknowning or malicious actors. <tidbit content="<br/>How can we design the AIS to prevent these misuses? If the potential harm is too great, we might want to reconsider adopting an AIS solution."></tidbit>

#### About Fairness

1. What do false positives and false negatives mean for different users? Under what circumstances might one be worse than the other? <tidbit content="<br/>In recidivism prediction models for instance, false positives mean innocent people were wrongly accused. When we step from theory to the real world, we need to see that these mathematical concepts have very real meanings."></tidbit>
2. Try listing out some examples of fair and unfair predictions. Why are they fair/unfair? <tidbit content="<br/>This is the first step towards trying to understand what are the protected traits in this context and how we should define fairness."></tidbit>
3. What are the relevant protected traits in this problem? <tidbit content="<br/>Common protected traits include gender, skin color, ethnicity, age and physical ability. But this really depends on the context and the culture that the application is situated in."></tidbit>
4. Which fairness metrics should we prioritize? <tidbit content="<br/>Prioritizing means that some metrics are invariably compromised or violated. These decisions and their resultant shortcomings should be made known to users."></tidbit>

---

### Section 2 - Preparing the Data

1. What is our population? <tidbit content="<br/>Note that this refers to the population that comprises all the possible inputs to the proposed AIS. This is important because it affects how we collect our data and evaluate our models later on. See <a href='../bias_ii#defining-the-population'>Understanding Bias II</a> for details."></tidbit>
2. How does our dataset distribution differ from our population distribution? <tidbit content="<br/>In most cases, the dataset collected is different from the population. This is okay, but we have to be clear about how it is different and be aware of possible problems that might arise from the mismatch. See <a href='../bias_ii#training-dataset-versus-population'>Understanding Bias II</a> for details."></tidbit>
3. Are we measuring the features/labels the same way for different groups? <tidbit content="<br/>Bias can creep in when we collect data differently for different groups. Check out <a href='../bias_i#proxy-labels'>Understanding Bias I</a> for an example."></tidbit>
4. How are our annotated labels different from the ideal labels? <tidbit content="<br/>Often, the labels that we really want is impossible or prohibitively expensive to obtain and we settle for proxy labels. Here, we ask, 'Are we using proxy labels?' and 'What are possible problems from using proxy labels?' See <a href='../bias_ii#the-target-variable'>Understanding Bias II</a> for details."></tidbit>

---

### Section 3 - Training the Model

1. How do our input features relate to our protected traits? <tidbit content="<br/>In cases where input features <em>are</em> protected traits, we need to justify their use in the model or remove them. We also need to check for correlations between protected traits and our input features, to identify proxies for the protected traits. These proxies can also be a source of algorithmic bias. See <a href='../bias_ii#input-features'>Understanding Bias II</a> for details."></tidbit>
2. Do we use the same model or different models for different inputs? <tidbit content="<br/>Using the same model assumes that the mapping between input samples and output prediction is the same for all groups, which might not be the case. On the other hand, training different models requires sufficient data for each model. See <a href='../bias_ii#aggregation'>Understanding Bias II</a> for details."></tidbit>
3. If we are importing a pre-trained model or external data, what are possible conflicts between these imports and our current context? <tidbit content="<br/>Using pre-trained models and external datasets is a common practice. But these imported models and data can potentially carry hidden biases. See <a href='../bias_ii#transfering-models-and-datasets'>Understanding Bias II</a> for details."></tidbit>

---

### Section 4 - Evaluating the Model

1. How does our test distribution differ from our population distribution? <tidbit content="<br/>Similar to Section 2 above, we need to think about the differences between our test dataset and our real population and possible problems that might occur."></tidbit>
2. What can we *say* about the fairness of our final model? <tidbit content="<br/>More than just accuracy and other performance metrics, results from fairness metric evaluations should also be documented and made available to users. See <a href='../bias_ii#evaluation'>Understanding Bias II</a> for details."></tidbit>
3. When we detect some unfairness with our metrics - is the disparity justified? <tidbit content="<br/>This lends some consideration for context to the quantification of fairness. Ultimately, how unjust a disparity is depends on the extent of disparity relative to its justification."></tidbit>

---

### Section 5 - Deploying the Solution

1. How do we detect errors from the AIS after deployment? <tidbit content="<br/>The job's not over when the model is deployed. After emerging from the laboratory, the model needs to be continuously evaluated based on real-world data, to identify unexpected problems or model failure. Importantly, the model should not be caught in a self-enforcing feedback loop. See <a href='../bias_ii#feedback'>Understanding Bias II</a> for details."></tidbit>
2. What are alternative solutions in case of failure? <tidbit content="<br/>Just like any other technology, the AIS can and will break down. How can we design for graceful degradation for all types of failures (e.g. wrong predictions, total failure)?"></tidbit>
3. How can we allow users to gracefully opt out of the AIS? <tidbit content="<br/>Presently, there are people who are uncomfortable with certain AIS due to privacy and other concerns. How can we design for 'graceful degradation' that allows these users to opt out with minimal hassle? See <a href='../bias_ii#graceful-degradation'>Understanding Bias II</a> for details."></tidbit>

<tofro prevtext="Sources of Bias" prevlink="../bias/sources/" nexttext="Resources" nextlink="../resources/"></tofro>
