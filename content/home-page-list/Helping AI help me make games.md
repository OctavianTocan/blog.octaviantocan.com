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

I've been giving some thought to the idea of creating an MCP for Unreal Engine that allows you to connect an AI model like Claude to Unreal Engine, not to do thing like what you see the YouTube gurus preach, like spawn cubes or create levels, which I've always found awfully lame, but instead to help enhance your daily workflows.

I've been giving some thought to the idea of creating a model context protocol for Unreal Engine that would allow you to connect an AI model like Claude desktop to Unreal. But not to do things that I've seen a lot of other people tout on YouTube. Like, wow, you can spawn cubes and create levels. I've always thought that was a little... lame, I think.

So instead, what's been more interesting to me is the idea of integrating the models into what you do on a daily basis and enhancing things that you perhaps already do as opposed to trying to get them to do complete level creation, or complete blueprint creation, which are very complicated and require a very long set of steps.

I don't think you can really get an LLM to do something like that successfully right now. At least not to a level which is really convincingly good.

### Here's what I actually want to build:

I've been thinking about basically giving it access to things that you do on a daily basis like creating blueprints, refactoring nodes, extracting the parts that are interesting out of functions. Just writing tool tips, writing documentation, speeding up workflows that we all do.

My first and most prioritized usage right now is the blueprint refactoring usage. So prioritizing that usage for me is very important.

### My blueprint refactoring toolkit

I'm thinking of taking some of the code I have in the BlueprintTraverser class, and moving it to a tool inside of custom implementation of the MCP thing.

**Functions:**
- `GetAllGraphNames` - Returns the names of all the graphs in the Blueprint
- `GetAllEventNamesInGraph(String: graph_name)` - Returns the names of all the events in the specific graph in the asset
- `GetAllFunctionNames` - Returns an array of strings with the function names
- `GetFunctionInfo(String: function_name)` - Returns information about a specific function in JSON format with name, tooltip, category, whether it's pure, thread safe, const, plus all the inputs and outputs with their types

**Variables:**
- `GetAllVariableNames` - If I get one of these then it can use the names to access more information about this variable
- `GetVariableInfo(String: variable_name)` - This one is really useful to get all the information about one specific variable
- `SetVariableInfo(VariableInfo: variable_info)` - For making changes

I could also add things like:
- `GetFunctionExplanation(String: function_name)` - Explains what a function does in a simple manner
- `CreateFunction(FunctionInfo: function_info)`

### I'm stuck on this problem...

I'm not really sure if it's useful to give all the nodes and the connections like I had them in the blueprint documentation generator. But I could because I already have all the code for that. Though if I do it that way, I'm not sure if I have the benefit of saving it to memory.

And regardless of anything else, none of these ways of talking about things will actually let it help me arrange them or do things in the editor. All of these are about it reading and most it can maybe write tooltips, or categorize functions, but actually changing nodes seems really far-fetched.

### The memory problem that's anoying me

I need a form of memory for this AI where it'll remember the connections really well, and I'll be able to retrace them somehow.

I want to have some sort of toolset for Claude to be able to help me refactor blueprints. Refactoring in this case understood as: the process of shifting nodes from one function to another after having thoroughly analyzed the systems in the project to see what can be improved, creating new functions to extract sets of nodes into... etc.

One example of such refactoring might be understanding a graph (through JSON), and being capable of using tools to extract nodes, move nodes... etc. to ensure that the functionality remains but we achieve a better result at a system level.

### Some interesting stuff I ran into while building this

I found someone on YouTube who had already created a base MCP, but it was for UE 5.6, and I'm working in UE 5.0, so I had to port that first. Additionally, the base structure was way too over-architected and had too many components, so I had to reduce a ton and simplify.

In the process, a lot of things broke. I think a lot of that was quite interesting, actually, and I wish I had filmed it.

One thing I think is interesting to mention is that in Claude Desktop, there are now two types of "MCPs." There's stdio MCPs which would just be using a normal Python script, and then there are DTX files, which are basically packaged connectors. They seem to have a better way of dealing with dependencies. It kind of reminded me of Docker files in a way, which is interesting because Docker Hub has a section for dockerized MCPs.

### Where I think this could actually go

The idea isn't to have AI write blueprints from scratch, but to give it the analytical capabilities needed to suggest meaningful refactoring opportunities. Like understanding a sprawling event graph, identifying logical groupings of nodes, and suggesting extractions into focused, reusable functions.

It's not about replacing the developer's insight about system architecture or design patterns. It's about providing better tools for analyzing existing systems and identifying improvement opportunities.

The Blueprint refactoring assistant might not generate YouTube views, but if it saves developers time and helps maintain cleaner codebases, it represents a more sustainable and practical approach to AI integration.