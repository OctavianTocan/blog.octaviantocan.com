---
author: ["Octavian Tocan"]
title: "Building a Toggleable First/Third Person Character in Unreal Engine"
date: "2025-07-20"
description: "Building a Toggleable First/Third Person Character in Unreal Engine"
summary: "Building a Toggleable First/Third Person Character in Unreal Engine"
tags: ["AI", "Unreal Engine"]
categories: ["AI", "Unreal Engine"]
series: ["Tutorials"]
ShowToc: true
TocOpen: true
---

# Building a Toggleable First/Third Person Character in Unreal Engine

**Important:**
This post is a companion piece to a YouTube video I made for the Infima Games channel. If you haven’t watched the video, please do so. I’ve written this post assuming readers have already watched it, so I don’t go into detail about things already covered there.

## Introduction

Developers often struggle to combine first-person and third-person animation sets. High-quality packs that work in both perspectives are rare, so most projects end up with a dedicated first-person set for actions like reloading and a generic third-person locomotion set that doesn’t match.

Third-person movement, jumping, and first-person weapon handling rarely fit together because they weren’t designed to.

Take weapons. In first person, shooting and reloading look fine. In third person, you’re often stuck with a stock rifle animation that doesn’t fit the gun, or worse, hacky IK solutions where the left hand is forced onto the gun with manual offsets. The result usually looks awkward. I’ve even seen developers try complicated Blender constraints and procedural offset systems, but those fixes are slow and messy.

This system isn’t about polish. It’s about consistency and speed. In ten minutes, you can get something that looks better and functions more reliably than most quick setups.

Even major studios like Call of Duty have used this approach, applying first-person animations in third person with only minor tweaks. It’s a pragmatic foundation even for polished AAA projects.

The point is simple: you don’t always need to master animation to solve animation problems. With the right architecture, you can prototype quickly without being blocked by missing skills.

## About Me

My name is Octavian, and I currently work at Infima Games, a company I co-founded with my friend David.
It’s also where I’ve spent years adding features to Unreal Engine projects, often breaking them along the way. I shipped the Low Poly Shooter Pack and the Realistic Assault Rifle Template. More importantly, I love making mistakes and learning from them.

This post comes from those mistakes. I’ve spent weeks, even months, trying to force incompatible animations to work together.
The system here is built from those lessons.

## Character Mesh Setup

I use a separate mesh for third person because it solves two problems:

- **Multiplayer**: other players see your full body without interfering with first-person arms.

- **Shadows**: you get proper character shadows instead of distorted ones that appear when forcing a single mesh to do both jobs. Unless you want to build a unified system like Star Citizen, using separate meshes is the practical choice.

Visibility toggling is another big reason to use two skeletal meshes. Without it, the camera clips into the third-person body. Since FP and TP animations aren’t authored to work together, clipping is unavoidable if you skip this.

## Camera System

The `SpringArm` component is important in this implementation. It controls camera distance, prevents clipping into walls, and comes with built-in interpolation that makes transitions smooth. All of this improves gameplay feel without extra work.

Yaw rotation goes on the capsule, while pitch rotation belongs on the `SpringArm`. Rotating collision shapes is bad practice and can lead to unpredictable physics, while letting the mesh tilt with the camera looks wrong. Splitting rotations like this is the best solution I’ve found.

This setup is flexible long term. You can modify the camera’s distance from the player by changing the `distance` value on the `SpringArm`. This makes it easy to update camera placement based on state. Transitions also look natural because you can smoothly interpolate the `distance` value when swapping between first and third person.

## Input & State Management

For input, I’m using a `Do Once` node right after the `Triggered` event from the Enhanced Input Actions.

In the Enhanced Input System, `Triggered` is called once per frame with the default `InputAction` setup. That’s great for movement but causes problems with actions like reloading or switching perspectives.

The `Do Once` node fixes this by ensuring each key press only triggers one toggle. (It resets on key release.)

For visibility, I use `SetOwnerNoSee` instead of `SetVisibility`. The former hides the mesh only for the owning player but keeps it visible to others and preserves shadows. `SetVisibility` removes shadows completely, which you don’t want.

When the player toggles views, I reparent the `SpringArm` to keep rotations correct. I also reparent the weapon so it stays attached to the correct mesh, FP or TP. Without this, things break quickly.

I also add error handling:

- Prevent reloads from starting if one is already in progress. Interrupting reloads feels bad and breaks immersion.

- Validate actors before using them to avoid crashes or invalid references.

## Weapons & Virtual Bones

Weapons attach to a virtual bone on the third-person character. This lets me continue using the standard `ik_hand_gun` while ensuring spine animations like breathing and torso rotation affect the weapon. Without this, the FP gun bone floats independently of the body.

I place the virtual bone under the right hand for convenience, since the weapon is always held there. In practice, you _could_ parent it elsewhere in the chain, as long as you understand which offsets won’t propagate.

I keep the left hand on the weapon with an IK node. When offsets move the weapon, the left hand follows. If you’re not applying procedural transforms, this isn’t strictly needed.

Sockets stay at zero. The animations handle positioning, so no arbitrary offsets are required.

## Post-Process Animation Blueprint

A Post-Process AnimBP keeps the setup flexible. If I built this directly into the main AnimBP, I’d need to add toggles for FP and TP, making the blueprint messy. A PostProcessAnimBP keeps the third-person AnimBP clean while layering FP behavior on top.

The core setup:

- **Copy Pose from Mesh**: references the FP AnimBP output.

- **Layer Blend per Bone**: blends third-person animations into the lower body and first-person into the upper body.

This gives you locomotion from TP and weapon handling from FP.

I use component tags to reference the first-person arms, though other methods work. Clavicle corrections prevent drift, and the left-hand IK solve ensures everything stays consistent in the final pose.

## Extensibility & Limitations

This architecture is designed for rapid prototyping, especially multiplayer. It also works for FP-with-body setups or even plain FP when all you want is a clean shadow.

The limits:

- **Visual polish**: you can push TP quality with procedural tweaks, but that kills the speed advantage.

- **Multiplayer sync**: FP animations need to run on all clients to keep TP synced. Normally you can skip FP anims for non-owners, but not here.

Ways to expand:

- Add procedural aim offsets or spine rotation for third-person.

- Experiment with alternate control schemes, like free-look where the pawn rotates only when moving.

- Rebuild the `SpringArm` yourself as a learning exercise. It’s not too complex and teaches a lot about camera control.

## Conclusion

_This system is about speed and consistency, not polish._

By combining separate meshes, a SpringArm-driven camera, clean input handling, virtual bones, and a Post-Process Anim BP, you can switch between first and third person in minutes instead of wrestling mismatched animations for months.

It’s a pragmatic base for prototyping. And if you want more polish, you can always build on top of it.

Octavian Tocan
CTO & Co-Founder @ Infima Games
