---
title: "Exercise 1: Insert Mode"
---

Unlike Emacs, gedit, notepad, etc., ViM was designed with the idea of "modes" of editing. This means that the same strokes may result in different outcomes based on the mode that you are currently in. This may seem confusing, but it should make more sense soon. Let's get started.

<div class="code">$ vim</div>

We start in "command mode." This is the default mode for the text editor and the mode in which most of ViM's features are implemented. No matter what action we are performing, we can always press Escape to finish or cancel the current operation and return to command mode. This mode allows you to manipulate text very quickly, but does not provide for means to create new text. For that we should enter "insert mode." To do so, press 'i':

<div class="code">i</div>

First, notice that, in the lower left-hand corner, you should see "-- INSERT --", which gives you an indication of your current mode. Insert mode is very similar to the default interface in Emacs or the only interfaces in Notepad, gedit, etc. Each stroke that you type will be written to the screen. Try writing the following (with typos):

<div class="code">The ccow jumpedd ovverr thhe mmmoon[Return]<br />
There are a some words fun that do not do not belong paper in this sentence. [Return]<br />
sOMEBODY typed the end of THIS LINE twice. end of this line twice. [Return]<br />
Spike Excellent Joy Fyre
</div>

Now press escape to return to command mode. Notice first that the cursor appears to move back one character when entering command mode from insert mode. This is because when we are inserting, the cursor is placed at the position of the next character that will be written, while in command mode, we want to operate on the characters already written, so we cannot operate on a space where no character exists.


Mode | Command | Outcome
-----|---------|--------
Any  | &lt;Escape&gt; | Enter Command mode
Command | i | Enter Insert mode

- [&lt; CSC 201 Laboratory: ViM](..)
- [Exercise 2: Moving around &gt;](../exercise-2-moving-around)
