---
title: Parent Scheme
---

## What is Parent Scheme ?

Parent Scheme is a UK-based start-up that works globally with organisations to help them support working parents. It offers livestreams, resources, articles, videos and coaching through an interactive platform. Parent Scheme is wholly inclusive and makes no assumptions about the gender, age, ethnicity and family circumstances of their users to allow them to find the right approach and solutions for their context. This is reflected in the graphic-based design. Parent Scheme also completely preserves users' privacy enabling them to customise the platform, favourite articles and save notes and coaching answers without having to worry their employer may see. All content on the platform is current and based on expert advice, covering topical challenges for every stage of the working parent lifecycle, from pregnancy and parental leave, through childcare options and the school years, to teens and young people starting university. There are sections for managers and HR as well.

2020 has been a challenging year for everyone, but it created unique challenges for working parents with schools and childcare settings closing, leaving them having to juggle remote working and helping their kids with homeschooling. As a company, Parent Scheme had to respond quickly to provide users with relevant support in constantly changing circumstances. We had to update and adapt content on an ongoing basis as the pandemic progressed. We were able to work together with experts in healthcare, psychology, education and HR to create a livestream programme addressing some of the most pressing questions for working parents and those that manage them.

Our team has worked incredibly hard this year. And even though we've had to close our offices and move entirely to remote working, we've really thrived as a company. One of the things we're proud of is that within three days of the first UK lockdown being announced, we were able to release a completely new, fully branded, free site with huge amounts of functionality and topical articles to answer some of the most immediate questions for working parents. Within the first 24 hours the site received 15.000 visitors - just through organic sharing - and was then recommended by UK government departments.

## How did you discover Nuxt?

My initial involvement with Parent Scheme was running the creative agency asked to build the MVP (minimum viable product). We were asked to build it in WordPress but we refused. We believed in the project and said this is something that is going to be big and you don't want an MVP in Wordpress. We asked, 'how are you going to manage changing this as it becomes big? You are not going to be able to scale that.'

The client had no idea what Nuxt was so we described it to them as the kind of web technologies that companies like Google and Facebook use to build interactive apps, because talking to them about JavaScript frameworks would have been a step too far.

So we managed to persuade them to choose Nuxt from the beginning and we have never looked back. We then went on to acquire them and have now shut down our design agency.

With Nuxt we were able to build a mobile app just by using the same codebase because it was a progressive web app and we were able to seamlessly turn that into something that could be installed on the Google play store. That would never have been possible if we had built this on something like Wordpress. It is really good to have something solid as a foundation for the tech stack.

For our content we initially used a markdown based CMS, Netlify CMS, which we self hosted and stored all content in a git repository. That was great, it was simple and easy to use and we ended up building a Jest test suite just for the content. We needed to ensure things like links weren't broken, external links were valid and adherence to our style guide especially for certain phrases that weren't our style.

That worked really well for us but recently we transitioned to using Sanity as our headless CMS, which has been fantastic. Sanity allows us to put our validation in at the editing level so that when someone is actually editing a file it will tell them right as they are typing something. If it doesn't meet our style guide it tells the user and advises them what to use instead, which is something our editors love.

## Are you using dynamic or static rendering? Why?

We have a number of different sites all running in Nuxt, our public client facing website, an account dashboard micro site that lets people manage their billing which is integrated with stripe, a type form clone which allows people answer surveys and our actual app. Our main enterprise app is server rendered and runs a Vercel serverless function which works really well for us. For us the dynamic side of things is really important because authentication is important and all of our content is gated so we can't pre-render that content and if were to pre-render it on the users browser it could potentially take longer to render with lots of API calls having to be made at that point.

Having a server rendered framework is a huge plus for user experience, which is a massive deal for us and therefore time to interaction and being able to serve fully rendered HTML to the browser so that from the first moment there is something visually interesting on the screen is really important for us. If we were doing entirely client side rendering we would lose seconds of users ability to see the information requested on first load.

We use server side rendering for our main app, although there are very interesting developments happening with regards to Nuxt and serverless, so we may actually end up slightly changing how we do that. For all our other sites we use static. We use the Nuxt Fetch hook, which is phenomenal, and allows us to do really useful thinks like for example, getting our payment plan details from Stripe at generate time without then embedding that private key in our build files.

## What is your favorite feature?
