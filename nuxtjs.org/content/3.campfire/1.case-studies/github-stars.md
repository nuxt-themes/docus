---
title: GitHub Stars
---

## What is GitHub ?

[GitHub](https://github.com/) is the home for millions of developers. We have over 56 million developers and essentially it's a place where developers can go and create, share and make their best code possible. We try and make it easy for developers to meet developers, work together, solve challenging problems and create the world's most important technologies. Our community is made up from a diverse set of people from students to hobbyists, enterprise professionals, partners and executives, and the list goes on. GitHub is not just code, it is much more than code, it's the home of open source collaboration. It's where new developers can come and get started. It's where experienced developers can expand their knowledge with developers solving the unsolvable and testing the limits of what software can do.

## Is GitHub open sourced?

It is an idea that is worth considering and there are parts of GitHub across infrastructure tooling that are already open source. At [github.com/github](https://github.com/github) you will be able to see all of the open source projects that we have there. Two notable examples are:

The [GitHub load balancer](https://github.blog/2018-08-08-glb-director-open-source-load-balancer/) which we open sourced back in 2018. It is our scalable load balancer solution for the bare metal data centres and it powers the majority of GitHub's web and git traffic as well as it is fronting some of the principal intel systems.

[GitHub Docs](https://github.blog/2020-10-14-how-we-open-sourced-docs-github-com/) which we open sourced in mid October 2020. With this effort, we're able to source new ideas from a broader and diverse set of individuals, especially from those who are experts in the community and GitHub.

## What is GitHub Stars?

[GitHub Stars](http://stars.github.com/) recognises those folks who are going above and beyond in helping others in the developer world. These exceptional folks are not only maintaining projects but they are going out there to educate. They are inspiring people and influencing people, both online and offline in everyday things that they do. It's for this purpose that we created the [GitHub Stars program](http://stars.github.com/).

It's our way to say thank you to these amazing people. It gives Stars a platform to showcase their work, enable them to reach more people and help everyone benefit from the vast amount of knowledge and excitement and expertise that they have. A lot of these folks are doing what they are doing because they love it and it's all without an expectation of a reward. So they do things like podcasts, videos, blogs, meetups etc, to share their stories and best practices, their work arounds and their learnings around GitHub.

We [officially launched the program in September 2020](https://github.blog/2020-09-03-introducing-the-github-stars-program/), and have already seen more than 8k nominations. It has been very exciting to see the sheer amount of nominations, which is a good problem to have, but it is a lot of nominations that we need to go through and review with strict criteria. We want to make sure we are rewarding these folks by giving them a platform so they can continue doing what they are doing and go out to help others. It has been a fantastic journey, difficult but very exciting, and we could not have done it without the help from Josep Jaume Rey and his team at [Codegram](https://www.codegram.com/). It has been great to put the website together and everything that has gone around that has really put the cherry on the top of the cake.

## How is the GitHub Stars website built?

At the very beginning we were planning on having a fully static website. The idea was to replicate what we did on the [GitHub Hackaton](https://githubhackathon.com/) website. The way people contributed to it was to send a pull request and when the pull request got merged the website would get re-generated. This was the initial idea to have it full static and rely on the GitHub repository but we figured that there were some interactions that were not that straight forward to do, such as nominating. This could be potentially a little bit risky to do it on the GitHub repo because we didn't know how many nominations there would be and it turns out it was a good call. Instead, we created a full static website with some refinements around the nomination part. For nominations, this hits an API which then talks to a GraphQL API that is built on top of an Apollo server and [Prisma](https://www.prisma.io/), which all synchronises with [Airtable](https://airtable.com/) as an admin interface.

## Why did you choose Nuxt as your frontend framework?

Nuxt was the perfect candidate because of the fact that it can play well as a full static website but you can progressively change it to a fully dynamic website. We thought that maybe in the future, we might not be happy about having a bit of a delay due to having to regenerate the site when changes are made in the admin dashboard. We already loved Vue and Nuxt but this feature in particular was very helpful. We had the assurance that at any particular moment we could change the approach.

## Are you using dynamic or static rendering? Why?

GitHub Stars is a statically generated website hosted on GitHub Pages and it gets redeployed and regenerated every 15 minutes. The nominations are sent to a Postgres database which gets stored there until the next redeploy. We don't need it in real-time as the nominations are not shown anywhere on the public website, so everything goes to the nominations database that gets synchronised to Airtable. From there, the GitHub team decides who gets awarded as a GitHub Star, which is then published on the website.

## What is your favorite feature?

The full static mode and the way URLs are automatically crawled so you don't have to manually list them anymore. It was a really cool idea to solve that particular problem and things are faster now because of the pre-loading. We were able to remove a lot of code we had for generating URLs. We love that feature.

Another great feature is the folder structure because for non developers it makes it easier as they know exactly where to go and understand where to find things. I think the folder structure is genius.

And the fact that Nuxt is open source, and at GitHub we love open source, is definitely one of the things we love about Nuxt. As one of our top 100 open source projects, we work closely with Nuxt and take feedback to understand how we can improve GitHub.

## Would you recommend Nuxt?

Absolutely. We would recommend it and are trying to get more people to turn to Vue because of the awesomeness of Nuxt. For me, it's a selling point with the Vue ecosystem. With Nuxt, things just work. It's conceptually simple. With other frameworks, it can be more difficult to work with teams that are not tech savvy. With Nuxt, we are able to bring in some designers who know only HTML and CSS. Nuxt is simple yet powerful in what it can do, and that is what we absolutely love about it. There are a lot of things that are being done behind the scenes and we appreciate the efforts that the Nuxt team have put in to making the developers' work easier and more approachable.
