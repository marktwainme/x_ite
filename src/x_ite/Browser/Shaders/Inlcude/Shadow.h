/* -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-*/

uniform sampler2D x3d_ShadowMap [x3d_MaxLights];

#pragma X3D include "Pack.h"

#ifdef X3D_SHADOWS

float
getShadowDepth (in int index, in vec2 shadowCoord)
{
	#if x3d_MaxShadows > 0
	if (index == 0)
		return unpack (texture2D (x3d_ShadowMap [0], shadowCoord));
	#endif

	#if x3d_MaxShadows > 1
	if (index == 1)
		return unpack (texture2D (x3d_ShadowMap [1], shadowCoord));
	#endif

	#if x3d_MaxShadows > 2
	if (index == 2)
		return unpack (texture2D (x3d_ShadowMap [2], shadowCoord));
	#endif

	#if x3d_MaxShadows > 3
	if (index == 3)
		return unpack (texture2D (x3d_ShadowMap [3], shadowCoord));
	#endif

	#if x3d_MaxShadows > 4
	if (index == 4)
		return unpack (texture2D (x3d_ShadowMap [4], shadowCoord));
	#endif

	#if x3d_MaxShadows > 5
	if (index == 5)
		return unpack (texture2D (x3d_ShadowMap [5], shadowCoord));
	#endif

	#if x3d_MaxShadows > 6
	if (index == 6)
		return unpack (texture2D (x3d_ShadowMap [6], shadowCoord));
	#endif

	#if x3d_MaxShadows > 7
	if (index == 7)
		return unpack (texture2D (x3d_ShadowMap [7], shadowCoord));
	#endif

	return 0.0;
}

float
texture2DCompare (in int i, in vec2 texCoord, in float compare)
{
	return step (getShadowDepth (i, texCoord), compare);
}

float
getShadowIntensity (in int index, in int lightType, in float lightAngle, in float shadowIntensity, in float shadowBias, in mat4 shadowMatrix, in int shadowMapSize)
{
	if (shadowIntensity <= 0.0 || lightAngle <= 0.0)
		return 0.0;

	if (lightType == x3d_PointLight)
	{
//		#define SHADOW_TEXTURE_EPS 0.01
//		
//		mat4 rotationProjectionBias [6];
//		rotationProjectionBias [0] = mat4 (-0.1666666666666667, -0.25, -1.0001250156269537, -1.0, 0, 0.1443375672974065, 0.0, 0.0, -0.09622504486493763, 0.0, 0.0, 0.0, 0.0, 0.0, -0.12501562695336918, 0.0);
//		rotationProjectionBias [1] = mat4 (0.16666666666666666, 0.25, 1.0001250156269537, 1.0, 0, 0.1443375672974065, 0.0, 0.0, 0.09622504486493771, 0.0, 0.0, 0.0, 0.0, 0.0, -0.12501562695336918, 0.0);
//		rotationProjectionBias [2] = mat4 (0.09622504486493766, 0.0, 0.0, 0.0, 0.0, 0.1443375672974065, 0.0, 0.0, -0.16666666666666666, -0.25, -1.0001250156269532, -1.0, 0.0, 0.0, -0.12501562695336918, 0.0);
//		rotationProjectionBias [3] = mat4 (-0.09622504486493766, 0.0, 0.0, 0.0, 0, 0.1443375672974065, 0.0, 0.0, 0.16666666666666666, 0.25, 1.0001250156269532, 1.0, 0.0, 0.0, -0.12501562695336918, 0.0);
//		rotationProjectionBias [4] = mat4 (0.09622504486493766, 0.0, 0.0, 0.0, -0.16666666666666669, -0.25, -1.0001250156269537, -1.0, 0.0, -0.14433756729740646, 0.0, 0.0, 0.0, 0, -0.12501562695336918, 0.0);
//		rotationProjectionBias [5] = mat4 (0.09622504486493766, 0.0, 0.0, 0.0, 0.16666666666666669, 0.25, 1.0001250156269537, 1.0, 0.0, 0.14433756729740657, 0.0, 0.0, 0.0, 0.0, -0.12501562695336918, 0.0);
//
//		// Offsets to the shadow map.
//		vec2 offsets [6];
//		offsets [0] = vec2 (0.0,       0.0);
//		offsets [1] = vec2 (1.0 / 3.0, 0.0);
//		offsets [2] = vec2 (2.0 / 3.0, 0.0);
//		offsets [3] = vec2 (0.0,       0.5);
//		offsets [4] = vec2 (1.0 / 3.0, 0.5);
//		offsets [5] = vec2 (2.0 / 3.0, 0.5);
//
//		int value   = 0;
//		int samples = 0;
//
//		for (int m = 0; m < 6; ++ m)
//		{
//			for (int i = 0; i < x3d_ShadowSamples; ++ i)
//			{
//				if (samples >= x3d_ShadowSamples)
//					return shadowIntensity * float (value) / float (x3d_ShadowSamples);
//
//				vec3  vertex      = closest_point (shadowPlane, v + random3 () * shadowDiffusion);
//				vec4  shadowCoord = rotationProjectionBias [m] * shadowMatrix * vec4 (vertex, 1.0);
//				float bias        = shadowBias / shadowCoord .w; // 0.005 / shadowCoord .w;
//
//				shadowCoord .xyz /= shadowCoord .w;
//
//				if (shadowCoord .x < SHADOW_TEXTURE_EPS || shadowCoord .x > 1.0 / 3.0 - SHADOW_TEXTURE_EPS)
//					continue;
//
//				if (shadowCoord .y < SHADOW_TEXTURE_EPS || shadowCoord .y > 1.0 / 2.0 - SHADOW_TEXTURE_EPS)
//					continue;
//
//				if (shadowCoord .z >= 1.0)
//					continue;
//
//				if (getShadowDepth (index, shadowCoord .xy + offsets [m]) < shadowCoord .z - bias)
//				{
//					++ value;
//				}
//
//				// We definitely have a shadow sample.
//				++ samples;
//			}
//		}
//
//		return shadowIntensity * float (value) / float (x3d_ShadowSamples);
	}
	else
	{
		vec4 shadowCoord = shadowMatrix * vec4 (v, 1.0);
		vec2 texelSize   = vec2 (1.0) / vec2 (shadowMapSize);

		shadowCoord .z   -= shadowBias;
		shadowCoord .xyz /= shadowCoord .w;

		float dx0 = - texelSize .x;
		float dy0 = - texelSize .y;
		float dx1 = + texelSize .x;
		float dy1 = + texelSize .y;

		float value = (
			texture2DCompare (index, shadowCoord .xy + vec2 (dx0, dy0), shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy + vec2 (0.0, dy0), shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy + vec2 (dx1, dy0), shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy + vec2 (dx0, 0.0), shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy, shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy + vec2 (dx1, 0.0), shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy + vec2 (dx0, dy1), shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy + vec2 (0.0, dy1), shadowCoord .z) +
			texture2DCompare (index, shadowCoord .xy + vec2 (dx1, dy1), shadowCoord .z)
		) * (1.0 / 9.0);

		return shadowIntensity * value;
	}
//	else
//	{
//		vec4 shadowCoord = shadowMatrix * vec4 (v, 1.0);
//
//		shadowCoord .z   -= shadowBias;
//		shadowCoord .xyz /= shadowCoord .w;
//
//		float value = 0.0;
//
//		for (int i = 0; i < x3d_ShadowSamples; ++ i)
//		{
//			value += step (getShadowDepth (index, shadowCoord .xy), shadowCoord .z - bias);
//		}
//
//		return shadowIntensity * value / float (x3d_ShadowSamples);
//	}

	return 0.0;
}

#else

float
getShadowIntensity (in int i, in int lightType, in float lightAngle, in float shadowIntensity, in float shadowBias, in mat4 shadowMatrix, in int shadowMapSize)
{
	return 0.0;
}

#endif