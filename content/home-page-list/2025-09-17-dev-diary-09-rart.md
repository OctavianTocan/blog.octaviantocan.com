---
author: ["Octavian Tocan"]
title: "Dev Diary #09: Refactoring the AnimBP and Fixing Aim"
date: "2025-07-20"
description: "Dev Diary #09: Refactoring the AnimBP and Fixing Aim"
summary: "We're hard at work refactoring the animation blueprints and fixing the aiming system. Here's an update on our progress."
tags:
  [
    "Infima Games",
    "Unreal Engine",
    "Dev Diary",
    "Realistic Assault Rifle Template",
  ]
categories:
  [
    "Infima Games",
    "Unreal Engine",
    "Dev Diary",
    "Realistic Assault Rifle Template",
  ]
series: ["Dev Diary | Realistic Assault Rifle Template"]
ShowToc: true
TocOpen: true
---

## 1. Fixing Aim and Setting the Stage:

_Fixed the aiming system, which wasn’t working before. It’s still not working perfectly because of some issues with movement sway, but it’s close._

The AnimBP for the character is finally working again. It took a few days to fix. If you’re not caught up on the progress, I’ve been working on a major refactor of our animation blueprints. Lately, that has meant fixing bugs that have popped up during the process.

Another significant part of this refactor is an effort to standardize the project's naming conventions. The hope is that this, along with a documentation page explaining the naming system, will help template owners find things easily. I’ve noticed people get confused about where to find things, so this update directly addresses that.

**Examples of changes:**

- Added `_cached` to CachedPoses in Anim Graphs → easier to differentiate them in the outline.
- Added `_StateMachine` to State Machines for clarity.

I’m open to alternative naming systems, but after going through at least three different iterations over the past year, I’m settling on this for now.

---

## 2. Things That Finally Worked Again:

- **Movement animations working again.** They had been broken for a while.
- **Black hole reload bug.** This one came down to incorrect animation setup.

  - Usually it’s the additive setting being wrong, or the base pose not being assigned when you click that setting.
  - That’s what causes the reload bug where the whole screen goes black and the model morphs into a black hole.
  - I’m not sure if that kind of issue can be fixed easily.

Separately, another big part of what I’ve been doing is **renaming the animation layers**. As I mentioned before, I think the naming conventions will be really important for navigation.

I’ve discussed my reasoning for using animation layers in these sorts of blueprints in a past video, so I’m not going to go in-depth here. In short:

- The animation blueprint is big.
- Splitting it into smaller chunks and naming them correctly makes it easier to understand what’s happening and where each piece belongs.

{{<kit-download-form-shortcode file_identifier="rart-dev-diary-09"  >}}

```
[=== BUY THE TEMPLATE HERE: [Template Link Placeholder] ===]
```

---

## 3. Cleaning Up the Anim Graph:

The main restructuring work has been in the animation graph and focused on making relationships obvious:

- **Reordering nodes** so big chunks are placed near the parts they’re related to.
- **Bunching them together** instead of spreading them out.
- **Adding comments with numbering** so if parts are related, you know the sequence:

  1. First part
  2. Second part
  3. Third part

Why this matters is simple:

- In animation blueprints, once you cache a pose, if you don’t place the use of that cached pose near it, you’re going to lose track of it.
- That means every time you try to find it, you waste time searching.
- Grouping + numbering avoids this problem.

Here's what that looks like in practice:
{{< ue-blueprint-iframe src="https://blueprintue.com/render/f-ns6ina/" >}}

---

## 4. What’s Still on the Table:

There’s still a lot to do:

- **Finish first-person AnimBP refactor.**
- **Do the same for the third-person AnimBP.**
- **Move on to weapon blueprints** (these also need major cleanup).
- Figure out better ways to **refactor while refactoring** — part of my process has been testing methods as I go.

Because we’re doing this refactor right before releasing the update, most features are already complete and just need to be cleaned up to be usable. The near-term work is primarily focused on cleanup and consolidation, rather than introducing new features.

---

## 5. Wrapping Up with Next Steps:

If you’ve read this far, you’re probably someone who’s really interested in technical details. Usually, I have a lot of features and exciting changes to discuss. For the next few Dev Diaries, though, while I’m still in the middle of this refactor, you can expect more technical breakdowns like this.

If you want to dig into the project yourself:

- Check out the project here: [Project Link Placeholder](https://www.unrealengine.com/marketplace/en-US/product/freefps-template)
- Get the Low Poly Shooter Pack here: [Low Poly Shooter Link Placeholder](https://www.unrealengine.com/marketplace/en-US/product/low-poly-shooter-pack)
- Download the FreeFPS Template here: [FreeFPS Link Placeholder](https://www.unrealengine.com/marketplace/en-US/product/freefps-template)
- Sign up for the newsletter here: [Newsletter Link Placeholder](https://www.unrealengine.com/marketplace/en-US/product/freefps-template)

Final note: I hope you’re finding it interesting that I’m discussing all these topics in the blog. This is a new format. I really like writing here, but we’ll see how it goes. If you like it, I’ll do more. If not, I’ll probably still write some entries, but maybe not in this format; so let me know.
