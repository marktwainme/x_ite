---
title: EnvironmentLight
date: 2023-01-31
nav: components-Lighting
categories: [components, Lighting]
tags: [EnvironmentLight, Lighting]
---
<style>
.post h3 {
   word-spacing: 0.2em;
}
</style>

## Overview

EnvironmentLight ...

The EnvironmentLight node belongs to the **Lighting** component and its default container field is *children.* It is available since X3D version 4.0 or later.

>**Info:** Please note that this node is still **experimental**, i.e. the functionality of this node may change in the future. This node is available in X_ITE.
{: .prompt-info }

## Hierarchy

```
+ X3DNode
  + X3DChildNode
    + X3DLightNode
      + EnvironmentLight
```

## Fields

### SFNode [in, out] **metadata** NULL <small>[X3DMetadataObject]</small>

Information about this node can be contained in a [MetadataBoolean](../../core/metadataboolean), [MetadataDouble](../../core/metadatadouble), [MetadataFloat](../../core/metadatafloat), [MetadataInteger](../../core/metadatainteger), [MetadataString](../../core/metadatastring) or [MetadataSet](../../core/metadataset) node.

#### Hint

- [X3D Architecture 7.2.4 Metadata](https://www.web3d.org/specifications/X3Dv4Draft/ISO-IEC19775-1v4-IS.proof//Part01/components/core.html#Metadata){:target="_blank"}

### SFBool [in, out] **global** FALSE

Global lights illuminate all objects within their volume of lighting influence. Scoped lights only illuminate objects within the same transformation hierarchy.

#### Warning

- [DirectionalLight](../../lighting/directionallight) default *global*=false to limit scope and avoid inadvertently illuminating every object in a large scene. [PointLight](../../lighting/pointlight) and [SpotLight](../../lighting/spotlight) default *global*=true since their effects are each limited by maximum radius value.

### SFBool [in, out] **on** TRUE

Enables/disables this light source.

### SFColor [in, out] **color** 1 1 1 <small>[0,1]</small>

*color* of light, applied to colors of objects.

#### Hint

- [X3D Scene Authoring Hints, Color](https://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Color){:target="_blank"}

### SFFloat [in, out] **intensity** 1 <small>[0,∞)</small>

Brightness of direct emission from the light.

### SFFloat [in, out] **ambientIntensity** 0 <small>[0,1]</small>

Brightness of ambient (nondirectional background) emission from the light. Interchange profile hint: this field may be ignored, applying the default value regardless.

### SFRotation [in, out] **rotation** 0 0 1 0 <small>[-1,1] or (-∞,∞)</small>

### SFNode [in, out] **diffuseTexture** NULL <small>[X3DEnvironmentTextureNode]</small>

### MFFloat [in, out] **diffuseCoefficients** [ ]

### SFNode [in, out] **specularTexture** NULL <small>[X3DEnvironmentTextureNode]</small>

### SFBool [in, out] **shadows** FALSE

*shadows* field indicates whether or not this light casts a shadow behind illuminated X3DShapeNode geometry.

### SFColor [in, out] **shadowColor** 0 0 0 <small>[0,1]</small> <small class="yellow">non standard</small>

Color of shadow, applied to colors of objects.

### SFFloat [in, out] **shadowIntensity** 1 <small>[0,1]</small>

*shadowIntensity* field defines how much light is obscured by shapes that cast shadows, ranging from 0 (light not obscured, no visible shadows) to 1 (light completely obscured, full-intensity shadows).

### SFFloat [in, out] **shadowBias** 0.005 <small>[0,1]</small> <small class="yellow">non standard</small>

The shadowBias value controls the visibility of *shadow acne*.

### SFInt32 [ ] **shadowMapSize** 1024 <small>[0,∞)</small> <small class="yellow">non standard</small>

Size of the shadow map in pixels, must be power of two.

## See Also

- [X3D Specification of EnvironmentLight node](https://www.web3d.org/documents/specifications/19775-1/V4.0/Part01/components/lighting.html#EnvironmentLight){:target="_blank"}
