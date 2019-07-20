# Summary Diagram

## Frames

- Algorithmic Frame
	- How do our input features relate to our sensitive traits?
	- One model or multiple models
	- Pre-trained concerns
- Data Frame
	- What is our population?
	- How does our sample distribution differ from our population distribution?
	- Are we measuring the features the same way for different groups?
	- How are our annotated labels different from the ideal labels?
- Sociotechnical Frame
	- Before
		- What is the true objective?
		- What are the pros and cons of an AIS versus other solutions?
		- What are the sensitive traits in this context?
		- What definitions of fairness are we using?
		- Who will interact with the AIS?
		- How will the AIS affect the current system?
	- After
		- How does our test distribution differ from our population distribution?
		- What can we say about the fairness of our final model?
		- How do we know the AIS has screwed up? 
		- What are alternative solutions in case of failure?

## Storyboard

- What is the true objective?

A: I want to use AI to recognize bunnies.
B: Okay. What do you *really* want to solve?
A: Well, I've got a ton of buns but sometimes I forget which one's which and I need to give them different food and medication.

- What are the pros and cons of an AIS versus other solutions?

B: Okay how about just putting collars on your buns?
A: You really shouldn't put collars on buns. The collars can get caught and hurt them.
B: How about just separating the ones that need special attention?
A: They *all* need special attention?

- What are the sensitive traits in this context?

B: What are the sensitive traits?
A: I've got brown, black and white buns and I don't want any buns to feel left out.
B: Okay, so color. Anything else?
A: Age too? I think we've got to be fair to both baby buns and adult buns.

- What definitions of fairness are we using?

B: I think we can start with accuracy equality. That means the system is equally accurate no matter what color or age a bun is.
A: That sounds good!

- Who will interact with the AIS?

B: Who's going to be using the system?
A: It's just me!
B: Great, that makes things simpler.

- How will the AIS affect the current system?

B: How are you currently differentiating your buns?
A: Now I just try to recognize them visually but it gets difficult because I already have 20 buns and I'm getting more buns all the time.
B: How are you thinking of using the system?
A: I was thinking of having the system on my phone and then

- What is our population?
- How does our sample distribution differ from our population distribution?
- How are our annotated labels different from the ideal labels?

- How do our input features relate to our sensitive traits?
- Do we use the same model or different models for different inputs?
- If we are importing a pre-trained model or external data, what are possible conflicts between these imports and our current context?

- How does our test distribution differ from our population distribution?
- What can we say about the fairness of our final model?
- How do we know the AIS has screwed up? 
- What are alternative solutions in case of failure?
