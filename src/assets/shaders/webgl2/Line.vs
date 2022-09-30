#version 300 es

precision highp float;
precision highp int;

uniform bool x3d_ColorMaterial;   // true if a X3DColorNode is attached, otherwise false
uniform x3d_UnlitMaterialParameters x3d_Material;

uniform mat4 x3d_ProjectionMatrix;
uniform mat4 x3d_ModelViewMatrix;

in float x3d_FogDepth;
in vec4  x3d_Color;
in vec4  x3d_Vertex;
in vec3  x3d_ParticlePosition;

out float fogDepth; // fog depth
out vec4  color;    // color
out vec3  vertex;   // point on geometry

#ifdef X_ITE
in  vec4 x3d_TexCoord0;
out vec3 startPosition;  // line stipple start
out vec3 vertexPosition; // current line stipple position
#endif

#ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
out float depth;
#endif

void
main ()
{
   vec4 local    = vec4 (x3d_ParticlePosition + x3d_Vertex .xyz, x3d_Vertex .w);
   vec4 position = x3d_ModelViewMatrix * local;

   fogDepth = x3d_FogDepth;
   vertex   = position .xyz;

   gl_Position = x3d_ProjectionMatrix * position;

   #ifdef X_ITE
   // Line Stipple
   vec4 start = x3d_ProjectionMatrix * x3d_ModelViewMatrix * vec4 (x3d_ParticlePosition + x3d_TexCoord0 .xyz, x3d_TexCoord0 .w);

   startPosition  = start .xyz / start .w;
   vertexPosition = gl_Position .xyz / gl_Position .w;
   #endif

   #ifdef X3D_LOGARITHMIC_DEPTH_BUFFER
   depth = 1.0 + gl_Position .w;
   #endif

   float alpha = 1.0 - x3d_Material .transparency;

   if (x3d_ColorMaterial)
   {
      color .rgb = x3d_Color .rgb;
      color .a   = x3d_Color .a * alpha;
   }
   else
   {
      color .rgb = x3d_Material .emissiveColor;
      color .a   = alpha;
   }
}
