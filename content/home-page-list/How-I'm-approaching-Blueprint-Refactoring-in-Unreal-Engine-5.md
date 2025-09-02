---
author: ["Octavian Tocan"]

title: "How I'm Approaching Blueprint Refactoring in Unreal Engine 5"

slug: "How-I'm-approaching-Blueprint-Refactoring-in-Unreal-Engine-5"

date: "2025-09-02"

description: "In this post, I share the system I’ve been developing for refactoring Blueprints in Unreal Engine 5. Instead of wrestling with sprawling graphs and scattered logic, I’ve started documenting every function, variable, and event in Markdown to get a clear picture of how things actually fit together. From there, I plan out changes, separate responsibilities, and decide which parts belong in data assets, libraries, or entirely different Blueprints."

summary: "In this post, I share the system I’ve been developing for refactoring Blueprints in Unreal Engine 5. Instead of wrestling with sprawling graphs and scattered logic, I’ve started documenting every function, variable, and event in Markdown to get a clear picture of how things actually fit together. From there, I plan out changes, separate responsibilities, and decide which parts belong in data assets, libraries, or entirely different Blueprints."

tags:
  [
    "Unreal Engine",
    "Infima Games",
    "Blueprints",
    "Refactoring",
    "Game Development",
  ]

categories:
  - "Unreal Engine"
  - "Infima Games"
  - "Blueprints"
  - "Refactoring"
  - "Game Development"

series: ["Blueprint Refactoring in UE5"]

ShowToc: true

TocOpen: true

editPost:

  URL: "https://github.com/OctavianTocan/blog.octaviantocan.com/content"

  Text: "Suggest Changes" # edit text

  appendFilePath: true # to append file path to Edit link
---

In programming, we often discuss the importance of writing code that is clean, modular, and reusable, whether that be in C++ or a visual scripting language like Blueprints for Unreal Engine 5.

What we don't often talk about is how to actually do that. So, I've been thinking about it a lot recently, and I've come up with a process to ensure your blueprints and your overall project structure stay logical, modular, and easy to read.

### The Problem

Before I dive into the solution, I would like to explain the problem I'm trying to solve here. To put you in context, we're currently close to releasing a new update for the Realistic Assault Rifle Template at Infima Games. Therefore, I'm in the process of reviewing all the content we've added and ensuring that everything is in good order. As well as refactoring the Blueprints.

The issue with that is that it takes a considerable amount of time to do. And, honestly, I don't really have the attention span for it. In other words, I can do it, but I get bored very quickly.

Naturally, if I'm bored, I don't do a great job at it. And I don't do it very efficiently, either. Therefore, our refactoring process takes a considerable amount of time to complete, and the end result is often not as optimal as it could be.

All this happens due to two crucial reasons:

1. There's a lot of content to go through. Oftentimes, it's difficult for me to keep track of everything that's changed.
2. Sometimes the content we've worked on for an update wasn't thought through in the moment due to time constraints. Thus, it may not align with the structure of other parts. This makes it all the more difficult to fix.

My new refactoring process needs to address both the time it takes me to refactor the updated blueprints into maintainable pieces and produce a better result by the end. And it can only do that if it helps solve these two issues.

### Enter My New Refactoring Process

Thus, here's what I'm trying out for this upcoming update: For every Blueprint that I want to refactor, I create a new Markdown file. This file will contain information about its contents. Meaning, details of what functions, variables, and events it has.

Right now, my process for it looks like this:

1. Look through the Blueprint.
2. List its functions, and what they do.
3. Lists its variables and what they do.
4. List its events, and what they do.

(I know it sounds like a long process, but it's nowhere near as bad as it sounds.)

The point here is to refresh my understanding of what the Blueprint does in the project, and what it doesn't (or shouldn't) do. This also gives me a much better perspective of how its functionality fits together, as well as with other parts of the project.

Another benefit of this process is that it gives me a text description of what the Blueprint does. (Which is much easier to read than looking at a bunch of spaghetti code.)

And finally, it paints a picture of how all the Blueprints in the project fit together. Because when I do this for every Blueprint that I've worked on for the update, I can see how they all connect together. It's this that lets me identify the flaws in my logic and where things don't fit together as well as they should. Once I'm able to see all that, I can start thinking about how to address the issues.

### Planning the Refactor

It's only now that I create a new document for each of these blueprints in the same folder. This time with "\_refactor_process" at the end of it. This is where I'll detail the exact process to follow to address all the flaws I identified in the previous step.

It's also now that I get to think about what role I want each blueprint to have, as opposed to what it's currently doing, which sometimes isn't exactly ideal.

I review all the functions, variables, and event implementations that I've previously written down to determine if they still fit within it. If not, I consider moving them to a more suitable location, like a function library, a macro library, or a different blueprint.

For variables, I check to see if any of them should be inside a data asset or a data table (as opposed to inside the Blueprint itself). The idea is to make the editing as convenient as possible.

While doing this, I also consider the connections between all the other Blueprints that I've written refactoring processes for, as well as any that were already in the asset. (Often, functionality that I've put in new Blueprints actually fits in old ones or completely different systems that I haven't even touched for this update, which I will now have to look into in order to ensure that the entire project is properly structured.)

One trick I've found useful is to write down the responsibilities that each Blueprint has within the documentation files I create at the start. Then, I can easily view if multiple Blueprints share responsibilities, and if so, I can migrate content from one to another. Here's an example of what that might look like:

```
# Responsibilities
- Handle player input
- Manage player state
- Communicate with game manager
- Update UI elements
```

This also makes it really easy to identify problems in your logic. For instance:

- Blueprints with way too many responsibilities are usually a sign of something having gone wrong.
- One Blueprint handling a ton of very different responsibilities is also not a great sign, at least not in my mental map of how Blueprints should work.

### The Implementation

When I finish planning out the refactor for all the Blueprints I've worked on for the update, I take a break. I give it a day or so to sit. I want my subconscious to process the entire thing in the background. Just in case I've missed anything.

Then, I go back to the documents and read through them again. If I find any issues with my logic, I fix them. Once everything is ready, it's finally time to implement all those changes.

Implementing is usually the easiest part of the process. I've already done all the thinking and planning, so I know exactly what I need to do. There's no guesswork involved. In fact, it's almost like following a recipe for cooking. You don't need to be a chef to know what to do; you just follow the steps.

But just like any good recipe, sometimes during the process, new problems arise that I hadn't predicted. Fortunately, to fix them, it's as simple as going back to the refactoring documents and rewriting the portions of the refactoring plan that have to do with them. And yet again, once I'm done, I go back to implementing.

One thing to note here is that if you do a (albeit simplified) version of this process while you're developing whatever thing you're developing, you probably won't need to do this for a lot of blueprints, and you won't come across many issues because your project will already be consistent and logically structured. But even if you don't, this process will ensure that everything is squeaky clean by the end, and you can ship with confidence.

### Conclusion

Whatever the outcome may be, it's important to remember that for me, this is just an experiment. It's extremely important to me that I constantly iterate on both my actual project and the processes I follow when working on them.

This new refactoring process seems to have considerable potential to help me achieve a higher-quality result. Not to mention ensuring everything fits together cohesively as your project grows.

That’s why I’ll continue refining it in the near future. There's still a ton of improvements I can make to it. But even in its current state, I think it's valuable enough to share.

(I'm also really obsessed with the idea of adding AI somewhere in all this, but I don't want to talk about that just yet. I'll keep that for another post!)

---

Octavian Tocan  
CTO & Co-Founder @ Infima Games
