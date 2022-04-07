#version 300 es

// -*- Mode: C++; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-

// BEGIN DEFINES
// END DEFINES

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
#extension GL_EXT_frag_depth : enable
#endif

precision highp float;
precision highp int;

out vec4 x3d_FragColor;

uniform x3d_LightSourceParameters x3d_LightSource [1];
uniform mat4 x3d_CameraSpaceMatrix;
#define lightDirection (-x3d_LightSource [0] .direction)
#define lightColor (x3d_LightSource [0] .color)

#ifdef USE_IBL
	uniform samplerCube diffuseEnvironmentTexture;
	uniform samplerCube specularEnvironmentTexture;
	uniform sampler2D brdfLUT;
#endif

#ifdef HAS_NORMAL_MAP
	uniform sampler2D normalTexture;
	uniform float normalScale;
#endif

#ifdef HAS_EMISSIVE_MAP
	uniform sampler2D emissiveTexture;
	uniform vec3 emissiveFactor;
#endif

#ifdef HAS_OCCLUSION_MAP
	uniform sampler2D occlusionTexture;
	uniform float occlusionStrength;
#endif

uniform vec4 baseColorFactor;
uniform vec2 metallicRoughnessValues;

#ifdef HAS_BASE_COLOR_MAP
	uniform sampler2D baseColorTexture;
#endif

#ifdef HAS_METAL_ROUGHNESS_MAP
	uniform sampler2D metallicRoughnessTexture;
#endif

#define camera (vec3 (0.0))

in vec3 position;
in vec2 texCoord;

#ifdef HAS_COLORS
	in vec4 color;
#endif

#ifdef HAS_NORMALS
	#ifdef HAS_TANGENTS
		in mat3 TBN;
	#else
		in vec3 normal;
	#endif
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
uniform float x3d_LogarithmicFarFactor1_2;
in float depth;
#endif

// Encapsulate the various inputs used by the various functions in the shading equation
// We store values in this struct to simplify the integration of alternative implementations
// of the shading terms, outlined in the Readme.MD Appendix.
struct PBRInfo
{
	float NdotL;                  // cos angle between normal and light direction
	float NdotV;                  // cos angle between normal and view direction
	float NdotH;                  // cos angle between normal and half vector
	float LdotH;                  // cos angle between light direction and half vector
	float VdotH;                  // cos angle between view direction and half vector
	float perceptualRoughness;    // roughness value, as authored by the model creator (input to shader)
	float metalness;              // metallic value at the surface
	vec3 reflectance0;            // full reflectance color (normal incidence angle)
	vec3 reflectance90;           // reflectance color at grazing angle
	float alphaRoughness;         // roughness mapped to a more linear change in the roughness (proposed by [2])
	vec3 diffuseColor;            // color contribution from diffuse lighting
	vec3 specularColor;           // color contribution from specular lighting
};

const float M_PI           = 3.141592653589793;
const float c_MinRoughness = 0.04;

vec4
SRGBtoLINEAR (vec4 srgbIn)
{
	#ifdef MANUAL_SRGB
		#ifdef SRGB_FAST_APPROXIMATION
			vec3 linOut = pow (srgbIn .xyz, vec3 (2.2));
		#else //SRGB_FAST_APPROXIMATION
			vec3 bLess  = step (vec3 (0.04045) ,srgbIn .xyz);
			vec3 linOut = mix (srgbIn .xyz / vec3 (12.92), pow ((srgbIn .xyz + vec3 (0.055)) / vec3 (1.055), vec3 (2.4)), bLess);
		#endif //SRGB_FAST_APPROXIMATION
		return vec4 (linOut, srgbIn .w);
	#else //MANUAL_SRGB
		return srgbIn;
	#endif //MANUAL_SRGB
}

// Find the normal for this fragment, pulling either from a predefined normal map
// or from the interpolated mesh normal and tangent attributes.
vec3
getNormal ()
{
	// Retrieve the tangent space matrix
	#ifndef HAS_TANGENTS
		vec3 pos_dx = dFdx (position);
		vec3 pos_dy = dFdy (position);
		vec3 tex_dx = dFdx (vec3 (texCoord, 0.0));
		vec3 tex_dy = dFdy (vec3 (texCoord, 0.0));
		vec3 t      = (tex_dy .t * pos_dx - tex_dx .t * pos_dy) / (tex_dx .s * tex_dy.t - tex_dy .s * tex_dx .t);

		#ifdef HAS_NORMALS
			vec3 ng = normalize (normal);
		#else
			vec3 ng = normalize (cross (pos_dx, pos_dy));
		#endif

		t = normalize (t - ng * dot (ng, t));

		vec3 b   = normalize (cross (ng, t));
		mat3 tbn = mat3 (t, b, ng);
	#else // HAS_TANGENTS
		mat3 tbn = TBN;
	#endif

	#ifdef HAS_NORMAL_MAP
		vec3 n = texture (normalTexture, texCoord) .rgb;

		n = normalize (tbn * ((n * 2.0 - 1.0) * vec3 (normalScale, normalScale, 1.0)));
	#else
		vec3 n = tbn [2] .xyz;
	#endif

	return n;
}

#ifdef USE_IBL
// Calculation of the lighting contribution from an optional Image Based Light source.
// Precomputed Environment Maps are required uniform inputs and are computed as outlined in [1].
// See our README.md on Environment Maps [3] for additional discussion.
vec3
getIBLContribution (PBRInfo pbrInputs, vec3 n, vec3 reflection)
{
	float mipCount = 9.0; // resolution of 512x512
	float lod      = pbrInputs .perceptualRoughness * mipCount;

	// retrieve a scale and bias to F0. See [1], Figure 3
	vec3 brdf         = SRGBtoLINEAR (texture (brdfLUT, vec2 (pbrInputs .NdotV, 1.0 - pbrInputs .perceptualRoughness))) .rgb;
	vec3 diffuseLight = SRGBtoLINEAR (textureCube (diffuseEnvironmentTexture, n)) .rgb;

	#ifdef USE_TEX_LOD
		vec3 specularLight = SRGBtoLINEAR (textureCubeLodEXT (specularEnvironmentTexture, reflection, lod)) .rgb;
	#else
		vec3 specularLight = SRGBtoLINEAR (textureCube (specularEnvironmentTexture, reflection)) .rgb;
	#endif

	vec3 diffuse  = diffuseLight * pbrInputs .diffuseColor;
	vec3 specular = specularLight * (pbrInputs .specularColor * brdf .x + brdf .y);

	return diffuse + specular;
}
#endif

// Basic Lambertian diffuse
// Implementation from Lambert's Photometria https://archive.org/details/lambertsphotome00lambgoog
// See also [1], Equation 1
vec3
diffuse (PBRInfo pbrInputs)
{
	return pbrInputs .diffuseColor / M_PI;
}

// The following equation models the Fresnel reflectance term of the spec equation (aka F())
// Implementation of fresnel from [4], Equation 15
vec3
specularReflection (PBRInfo pbrInputs)
{
	return pbrInputs .reflectance0 + (pbrInputs .reflectance90 - pbrInputs .reflectance0) * pow (clamp (1.0 - pbrInputs .VdotH, 0.0, 1.0), 5.0);
}

// This calculates the specular geometric attenuation (aka G()),
// where rougher material will reflect less light back to the viewer.
// This implementation is based on [1] Equation 4, and we adopt their modifications to
// alphaRoughness as input as originally proposed in [2].
float
geometricOcclusion (PBRInfo pbrInputs)
{
	float NdotL = pbrInputs .NdotL;
	float NdotV = pbrInputs .NdotV;
	float r     = pbrInputs .alphaRoughness;

	float attenuationL = 2.0 * NdotL / (NdotL + sqrt (r * r + (1.0 - r * r) * (NdotL * NdotL)));
	float attenuationV = 2.0 * NdotV / (NdotV + sqrt (r * r + (1.0 - r * r) * (NdotV * NdotV)));

	return attenuationL * attenuationV;
}

// The following equation(s) model the distribution of microfacet normals across the area being drawn (aka D())
// Implementation from \"Average Irregularity Representation of a Roughened Surface for Ray Reflection\" by T. S. Trowbridge, and K. P. Reitz
// Follows the distribution function recommended in the SIGGRAPH 2013 course notes from EPIC Games [1], Equation 3.
float
microfacetDistribution (PBRInfo pbrInputs)
{
	float roughnessSq = pbrInputs .alphaRoughness * pbrInputs .alphaRoughness;
	float f           = (pbrInputs .NdotH * roughnessSq - pbrInputs .NdotH) * pbrInputs .NdotH + 1.0;

	return roughnessSq / (M_PI * f * f);
}

void
main ()
{
	// Metallic and Roughness material properties are packed together
	// In glTF, these factors can be specified by fixed scalar values
	// or from a metallic-roughness map
	float perceptualRoughness = metallicRoughnessValues .y;
	float metallic            = metallicRoughnessValues .x;

	#ifdef HAS_METAL_ROUGHNESS_MAP
		// Roughness is stored in the 'g' channel, metallic is stored in the 'b' channel.
		// This layout intentionally reserves the 'r' channel for (optional) occlusion map data
		vec4 mrSample = texture (metallicRoughnessTexture, texCoord);

		perceptualRoughness = mrSample .g * perceptualRoughness;
		metallic            = mrSample .b * metallic;
	#endif

	perceptualRoughness = clamp (perceptualRoughness, c_MinRoughness, 1.0);
	metallic            = clamp (metallic, 0.0, 1.0);

	// Roughness is authored as perceptual roughness; as is convention,
	// convert to material roughness by squaring the perceptual roughness [2].
	float alphaRoughness = perceptualRoughness * perceptualRoughness;

	// The albedo may be defined from a base texture or a flat color
	#ifdef HAS_BASE_COLOR_MAP
		vec4 baseColor = SRGBtoLINEAR (texture (baseColorTexture, texCoord)) * baseColorFactor;
	#else
		vec4 baseColor = baseColorFactor;
	#endif

	// If a primitive specifies a vertex color using the attribute semantic property COLOR_0,
	// then this value acts as an additional linear multiplier to baseColor.
	#ifdef HAS_COLORS
		baseColor *= color;
	#endif

	vec3 f0 = vec3 (0.04);

	vec3 diffuseColor = baseColor .rgb * (vec3 (1.0) - f0);
	diffuseColor *= 1.0 - metallic;

	vec3 specularColor = mix (f0, baseColor .rgb, metallic);

	// Compute reflectance.
	float reflectance = max (max (specularColor .r, specularColor .g), specularColor .b);

	// For typical incident reflectance range (between 4% to 100%) set the grazing reflectance to 100% for typical fresnel effect.
	// For very low reflectance range on highly diffuse objects (below 4%), incrementally reduce grazing reflecance to 0%.
	float reflectance90          = clamp (reflectance * 25.0, 0.0, 1.0);
	vec3  specularEnvironmentR0  = specularColor .rgb;
	vec3  specularEnvironmentR90 = vec3 (1.0, 1.0, 1.0) * reflectance90;

	vec3 n = getNormal ();                         // normal at surface point
	vec3 v = normalize (camera - position);        // Vector from surface point to camera
	vec3 l = normalize (lightDirection);           // Vector from surface point to light
	vec3 h = normalize (l + v);                    // Half vector between both l and v

	float NdotL = clamp (dot (n, l), 0.001, 1.0);
	float NdotV = abs (dot (n, v)) + 0.001;
	float NdotH = clamp (dot (n, h), 0.0, 1.0);
	float LdotH = clamp (dot (l, h), 0.0, 1.0);
	float VdotH = clamp (dot (v, h), 0.0, 1.0);

	PBRInfo pbrInputs = PBRInfo (
		NdotL,
		NdotV,
		NdotH,
		LdotH,
		VdotH,
		perceptualRoughness,
		metallic,
		specularEnvironmentR0,
		specularEnvironmentR90,
		alphaRoughness,
		diffuseColor,
		specularColor
	);

	// Calculate the shading terms for the microfacet specular shading model
	vec3  F = specularReflection (pbrInputs);
	float G = geometricOcclusion (pbrInputs);
	float D = microfacetDistribution (pbrInputs);

	// Calculation of analytical lighting contribution
	vec3 diffuseContrib = (1.0 - F) * diffuse (pbrInputs);
	vec3 specContrib    = F * G * D / (4.0 * NdotL * NdotV);
	vec3 finalColor     = NdotL * lightColor * (diffuseContrib + specContrib);

	// Calculate lighting contribution from image based lighting source (IBL)
	#ifdef USE_IBL
	vec3 reflection = -normalize (reflect (v, n));
	finalColor += getIBLContribution (pbrInputs, n, reflection);
	#endif

	// Apply optional PBR terms for additional (optional) shading
	#ifdef HAS_OCCLUSION_MAP
		float ao = texture (occlusionTexture, texCoord) .r;
		finalColor = mix (finalColor, finalColor * ao, occlusionStrength);
	#endif

	#ifdef HAS_EMISSIVE_MAP
		vec3 emissive = SRGBtoLINEAR (texture (emissiveTexture, texCoord)) .rgb * emissiveFactor;
		finalColor += emissive;
	#endif

	x3d_FragColor = vec4 (pow (finalColor, vec3 (1.0 / 2.2)), baseColor .a);

	#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
	//http://outerra.blogspot.com/2013/07/logarithmic-depth-buffer-optimizations.html
	if (x3d_LogarithmicFarFactor1_2 > 0.0)
		gl_FragDepth = log2 (depth) * x3d_LogarithmicFarFactor1_2;
	else
		gl_FragDepth = gl_FragCoord .z;
	#endif
}
