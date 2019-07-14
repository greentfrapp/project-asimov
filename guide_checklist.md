---
layout: guide_default
title: The Guide. \| Project Asimov
permalink: /guide/checklist/
---

# Checklist

---

Here is a checklist of questions to answer when implementing an AIS. While there is no strictly correct answer, a good rule of thumb is that we should be okay with publishing our answers publicly.

---

### Section 1 - Defining the Problem

1. What is the true objective? <tidbit content="<br/>What is the larger objective and what sub-goal are we focusing on? For example, for recidivism prediction, the true objective might be to make the society a safer place. As part of that, we want to identify individuals who might be prone to reoffending and offer them additional help to reduce future crime. Note the many implicit assumpations here. We assume that our sub-goal contributes to our objective. We also assume that reoffending is something that can be reliably predicted."></tidbit>
2. What are the pros and cons of an AIS versus other solutions? <tidbit content="<br/>What are other possible solutions? How is the sub-goal being achieved now? What are the pros and cons of each solution? The main point here is to first weigh all the possible solutions instead of just implementing an AIS immediately. This boils down to the most important question of 'When is AI not the solution?' and being aware of the Solutionism Trap."></tidbit>
3. What are the sensitive traits in this context?
4. What definitions of fairness are we using?
5. Who will interact with the AIS?
6. How will the AIS affect the current system?

---

### Section 2 - Preparing the Data

1. What is our population?
2. How does our sample distribution differ from our population distribution?
3. How are our annotated labels different from the ideal labels?

---

### Section 3 - Training the Model

1. What features are we using?
2. How do the features relate to our sensitive traits?
3. Do we use the same model or different models for different inputs?
4. If we are importing a pre-trained model or external data, wWhat are possible conflicts between these imports and our current context?

---

### Section 4 - Deploying the Solution

1. How does our test distribution differ from our population distribution?
2. What can we say about the fairness of our final model?
3. How do we know the AIS has screwed up? 
4. What are alternative solutions in case of failure?

<tofro prevtext="Sources of Bias" prevlink="../bias/sources/" nexttext="Tools" nextlink="../tools/"></tofro>