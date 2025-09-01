---
author: ["Octavian Tocan"]
title: "Helping AI help me make games"
date: "2025-07-20"
description: "Helping AI help me make games"
summary: "Helping AI help me make games"
tags: ["AI", "Unreal Engine"]
categories: ["AI", "Unreal Engine"]
series: ["Helping AI help me make games"]
ShowToc: true
TocOpen: true
editPost:
  URL: "https://github.com/OctavianTocan/blog.octaviantocan.com/content"
  Text: "Suggest Changes" # edit text
  appendFilePath: true # to append file path to Edit link
---

Lately, I've been playing around with different refactoring techniques for blueprints in Unreal Engine 5. Although I wouldn't say that I've come to the optimal conclusion or final conclusion, I'm definitely getting to a really interesting point which I want to share with you.

I'll start with why. I'm currently working on an update for the Realistic Assault Rifle template for Infima Games. It's update v2. Not that that's very relevant to the point of this entry. But we're currently at the point where the features are all implemented, all the assets are in there, and everything is really finished save for the fact that all the code (in this case, all the blueprints) is extremely messy because that's how I left them during development.

I always sit down for what usually is a few weeks at the end of a development cycle and go through every single blueprint that's been modified and refactor all the pieces of code that we need to push. It's always been a process that takes a long time. For a few reasons:

1. The fact that there's usually a lot of content that I need to go through. Initially, I didn't know exactly where to look because I didn't leave myself any kind of signs of what might have been modified, and so with the growth of the project that became more and more necessary. Not having any signs, any comments, or any places that I could just jump to immediately in the editor meant that I would have to go through every single blueprint, and that's just a no-no. So what I started doing is leaving big to-do comments which you can then search for using the built-in searching functionality in Unreal.
2. Sometimes these features are implemented in very different parts of the development cycle, and often times I've made the mistake of not thinking very much about how they fit together while I'm making them. For the end result, that's not really a problem because I always sit down and figure out a way to refactor them and to reconstruct the entire system such that it works. But for me, when I sit down, it's horrible to have to go through so many blueprints that I've worked on maybe months ago and have to think about what I was doing again and how that's going to tie into everything else without any comments, explanations, or documentation. So that's been a really big mistake that I've made over time.

### Enter My New Refactoring Process

What I thought about doing recently is doing a little bit more planning both in the stage of development and in the current stage of refactoring. Given that I'm currently in the stage of refactoring the project, fixing all the technical debt that's been accumulating, I'm going to talk about that part here.

I've thought about going through each and every single blueprint that I want to refactor:

1. Looking up what functions it has
2. Understanding what variables it has
3. Reading through the implementations of all those and its events
4. Writing it all down as I understand it
   It might sound like a really long process when you read it like that, but doing it isn't actually all that long. It probably takes around 25 minutes to 30 minutes to go through one blueprint to do that, and there's often not that many in a project.

What this does is refresh my understanding of what the blueprint was supposed to be doing, what it already has. And it gives me a perspective of how it's currently fitting together all in one. That's within the unit of a blueprint, but when you look at all the blueprints together after you've done this process, what you have is a really interesting and complex description of the current state of your project in text described by yourself. Having this lets you picture which changes you want to make. And in fact, that's exactly the next step.

### Planning the Refactor

Once I've gone through every blueprint that I want to do this for, I will open a new document for each of those blueprints where I will outline which changes I think they need or which changes I think I need to make to them in order for that blueprint to be more cohesive with the rest of the system and more internally polished and just generally clean and easy to read. It's here that I really put thought into what is what.

I give thought to which functions I want to extract from that blueprint and perhaps move into other blueprints because it makes more sense to be there for them, or into function libraries or macro libraries. I think about which variables the blueprint really needs. Do I maybe need a data type to store them somewhere external? Does that make sense with the rest of the project? Is it cohesive? And I start kind of writing rules for that blueprint at the top of the file before even listing the rest of the changes.

Another important part of the planning process is thinking about the connections that each blueprint is going to have with other blueprints. A really easy way to do this is to establish the responsibilities of a blueprint at the top of these Markdown or text files that you're writing like so:

```
# Responsibilities
- Handle player input
- Manage player state
- Communicate with the game manager
- Update UI elements
```

Doing this means that when you look at this blueprint later (or at least when you look at its definition in text), you can immediately say what it's supposed to be doing and what it's not supposed to be doing. And then that means you can easily identify which problems it has and which things do not fit with it. Eventually, doing this for the entire project relatively often means you are always working with clean, easy-to-maintain blueprints. In fact, even if you don't do what I'm thinking of doing next, which is integrating this into my daily process as opposed to doing it all at once at the end of a development cycle, this is still a really good idea that will help you long-term.

### The Implementation

All that's left now is to implement the changes that I've outlined in these files. And that's usually the easiest part because I've already done all the thinking, all the planning, and I know exactly what I need to do. So it's just a matter of going through and doing it.

This is still something I'm trying out. If you're following us on the Infima Games channel, then you've likely seen me in some of our videos where I work on this. I really want to keep trying this for the future and actually improve the workflow. Maybe at some point I'll make a little page somewhere where I can publicly post the different understandings I get out of it. That might be interesting. But for now, I'm going to keep trying to figure out how to smooth out any kinks in the process and make it as easy to implement as possible.

(I'm also really obsessed with the idea of adding AI somewhere in all this, but I don't want to talk about that just yet. I'll keep that for another post.)

---

Octavian Tocan
CTO & Co-Founder @ Infima Games
www.infimagames.com
