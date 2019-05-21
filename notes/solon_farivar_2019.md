# Millions of people uploaded photos to the Ever app. Then the company used them to develop facial recognition tools. 

[Link to article](https://www.nbcnews.com/tech/security/millions-people-uploaded-photos-ever-app-then-company-used-them-n1003371)

[The AI Supply Chain Runs on Ignorance](https://www.theatlantic.com/technology/archive/2019/05/ever-strava-ai-human-ignorance/589306/)

[Facial recognition's 'dirty little secret': Millions of online photos scraped without consent](https://www.nbcnews.com/tech/internet/facial-recognition-s-dirty-little-secret-millions-online-photos-scraped-n981921)

[IBM's photo-scraping scandal shows what a weird bubble AI researchers live in](https://www.technologyreview.com/f/613131/ibms-photo-scraping-scandal-shows-what-a-weird-bubble-ai-researchers-live-in/)

This article describes how Ever used their customers' photos to train a facial recognition algorithm, which they proceeded to sell to third-party companies, law enforcement and the military.

Ever updated their privacy policy to account for this practice. However, I wonder how many people actually noticed the privacy policy update? Should there be a more explicit announcement with regards to such matters?

This is reminiscent of previous discussions on the terms and conditions that consumers generally agree to. See [this article](https://www.foxnews.com/tech/7500-online-shoppers-unknowingly-sold-their-souls) and [this South Park episode](https://techcrunch.com/2011/04/28/south-park-scares-you-into-reading-apples-terms-and-conditions/).

> Doug Aley, Ever's CEO, told NBC News that Ever AI does not share the photos or any identifying information about users with its facial recognition customers.

This reveals a fundamental misconception of how AI algorithms can leak privacy. Specifically, the trained model contains information about the training data that can be extracted. Unless care was taken to make the training process provably private, sharing the training model is akin to sharing the training data.

> When NBC News told Aley that some of Ever's customers did not understand that their photos were being used to develop facial recognition technology that eventually could wind up in the government's hands, he said he had never heard any complaints.

I must say that this is ridiculous. If customers are not aware of their data being used, why would they complain?

In the related MIT Tech Review article (see above), IBM released a dataset of annotated faces scraped from Flickr. This raises additional questions of the privacy of public internet content, as well as differing definitions of privacy and different tolerances for privacy violations between AI practitioners and the general public.

> Rather, this story highlights the need for the tech industry to adapt its cultural norms and standard practices to keep pace with the rapid evolution of the technology itself, as well as the public's awareness of how their data is used.

> Chowdhury's tip to those struggling to navigate the gray areas of data privacy? Think about whether the way you're using data is in the spirit in which it was originally generated and shared. If you are using it in a completely tangential way, it's time to pause and reconsider.
