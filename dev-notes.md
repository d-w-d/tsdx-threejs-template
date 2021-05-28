# Dev Notes

## Threejs Directional Light Helper Subtleties

DL = Directional Light

I came across some issue setting up DLs. If you create your own scene entity with a directional light, then you do NOT want to use that light to initialize the helper. Why? Because the light and the helper need to get added to the `_sceneEntityGroup` to get shown in the scene. However, if you animate that sceneEntity by, say, rotating the group then the helper will get transformed twice because it first gets the rotation applied to it in virtue of being in the group, but it also gets rotated in virtue of being associated with the light, which itself gets rotated in virtue of being in the group. So you need to clone the light and use that clone to initialize the helper.

Next, you need to be mindful of subtlities when it comes to scaling directional lights and their helpers. Basically, it doesn't seem to be that helpers were designed with scaling in mind. I encountered several issues when importing an FBX object with a DL as child. The imported object is actually a THREE.Group instance, and when you scale this group, all the internal children do NOT have their own scales adjusted, rather, they get scaled at render time in virtue of having a group as parent with non-unitary scale.

So if you try to use that child DL as the initiator of the helper -- or even a clone of that child -- then that helper will be drawn according to the "ungrouped" face-value scale of that child.

So you have to "manually" scale that helper somehow. So first, you have to get the scale from the parent group. Next, you can't just scale the helper directly because; I can;t recall the exact techincal reason why not, but just treat it as a brute fact about the helper's design; really, the helper is designed to mimick the light that initiates it. So why not just scale the clone of the DL before initiating the helper? The problem is that DL's don't have a geometry property, and so what the scale property does is not clear. Rather, a DL is characterized by its position, rotation and intensity. (Nonetheless, if you scale a group that contains a DL, then it seems to be that the DL will adjust its position accordingly.)

So if you want to get a "scaled" helper to reflect a DL found within a loaded FBX object, it seems to me that you need to first create a DL with a position that reflects the scaled DL, and then use that to create a helper. This is reflected in the code at the writing of this paragraph.

BTW -- I suspect that the FBX loader incorrectly imports the intensity of the DL, since it happens to be 1.
