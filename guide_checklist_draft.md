# Checklist

1. **Do you need an AIS solution?**

*Consider possible pros and cons*

*Barocas - Masking*

*Solutionism Trap*

## Section 1 - Defining the Problem

*Framing the problem, consider the larger aim of the solution* 

1. What is the true problem?
2. Do you *really* need an AIS solution? What are the pros and cons?
3. What definition of fairness are we using?
4. What are the sensitive traits?
5. Who will interact with the AIS?
6. How will the AIS change the current system?

- Suresh & Guttag - Historical Bias
- Barocas & Selbst - Masking, Defining the Target Variable and Class Labels
- Selbst et al. - Solutionism Trap, Framing Trap, Ripple Effect Trap

## Section 2 - Preparing the Data

*Understanding what are social constructs, cite Durkheim?; focus on collecting data, labeling data, based on problem frame defined earlier*

1. What is our population?
2. How does our sample distribution differ from our population distribution?
3. What do we really want to predict? Are our labels an accurate measure of that?

- Suresh & Guttag - Historical Bias, Representation Bias, Measurement Bias
Training Data
- Selbst et al. - Portability Trap

## Section 3 - Training the Model

*Focus on feature selection, type of model, bias-accuracy tradeoff, and tools*

1. What features are we using?
2. How do these features relate to our sensitive traits?
3. Do we use the same model or different models for different of inputs? (Both have inherent assumptions)
4. Are we importing a pre-trained model or external data? What are possible conflicts between these imports and our current context?

- Suresh & Guttag - Aggregation Bias
- Barocas & Selbst - Feature Selection, Proxies
- Selbst et al. - Portability Trap, Formalism Trap

## Section 4 - Deploying the Solution

*Focus on evaluating, online training*

1. How does our test distribution differ from our population distribution?
2. What can we say about the fairness of our final model?
3. If the model will continue online training, what checks are in place to prevent degradation?

- Suresh & Guttag - Evaluation Bias
- Selbst et al. - Portability Trap, Ripple Effect Trap
