export default /* glsl */ `
#if defined (X3D_SKINNING)

in float x3d_CoordIndex;

uniform sampler2D x3d_JointsTexture;
uniform sampler2D x3d_DisplacementsTexture;
uniform sampler2D x3d_JointMatricesTexture;

mat4
getJointMatrix (const in int joint)
{
   vec4 a = texelFetch (x3d_JointMatricesTexture, joint * 8,     0);
   vec4 b = texelFetch (x3d_JointMatricesTexture, joint * 8 + 1, 0);
   vec4 c = texelFetch (x3d_JointMatricesTexture, joint * 8 + 2, 0);
   vec4 d = texelFetch (x3d_JointMatricesTexture, joint * 8 + 3, 0);

   return mat4 (a, b, c, d);
}

mat3
getDisplacementJointMatrix (const in int joint)
{
   mat4 m = getJointMatrix (joint);

   return mat3 (m [0] .xyz, m [1] .xyz, m [2] .xyz);
}

#if defined (X3D_NORMALS)
vec3 skinNormal = vec3 (0.0);

mat3
getJointNormalMatrix (const in int joint)
{
   vec4 a = texelFetch (x3d_JointMatricesTexture, joint * 8 + 4, 0);
   vec4 b = texelFetch (x3d_JointMatricesTexture, joint * 8 + 5, 0);
   vec4 c = texelFetch (x3d_JointMatricesTexture, joint * 8 + 6, 0);

   return mat3 (a .xyz, vec3 (a .w, b .xy), vec3 (b .zw, c .x));
}

#define getSkinNormal(normal) (skinNormal)
#else
   #define getSkinNormal(normal) (normal)
#endif

vec4
getSkinVertex (const in vec4 vertex, const in vec3 normal)
{
   int  coordIndex = int (x3d_CoordIndex);
   vec4 skin       = vertex;

   #if defined (X3D_NORMALS)
      skinNormal = normal;
   #endif

   #if X3D_NUM_DISPLACEMENTS > 0
   {
      int coordIndexD = coordIndex * X3D_NUM_DISPLACEMENTS;
      int width       = textureSize (x3d_DisplacementsTexture, 0) .x;
      int offset      = (width * width) / 2;

      for (int i = 0; i < X3D_NUM_DISPLACEMENTS; ++ i)
      {
         int   index        = coordIndexD + i;
         vec4  displacement = texelFetch (x3d_DisplacementsTexture, index,          0);
         float weight       = texelFetch (x3d_DisplacementsTexture, index + offset, 0) .x;

         skin .xyz += getDisplacementJointMatrix (int (displacement .w)) * displacement .xyz * weight;
      }
   }
   #endif

   int coordIndexJ = coordIndex * (X3D_NUM_JOINT_SETS * 2);

   for (int i = 0; i < X3D_NUM_JOINT_SETS; ++ i)
   {
      int   index   = coordIndexJ + i;
      ivec4 joints  = ivec4 (texelFetch (x3d_JointsTexture, index, 0));
      vec4  weights = texelFetch (x3d_JointsTexture, index + X3D_NUM_JOINT_SETS, 0);

      for (int i = 0; i < 4; ++ i)
      {
         int   joint  = joints  [i];
         float weight = weights [i];

         skin += (getJointMatrix (joint) * vertex - vertex) * weight;

         #if defined (X3D_NORMALS)
            skinNormal += (getJointNormalMatrix (joint) * normal - normal) * weight;
         #endif
      }
   }

   return skin;
}
#else
   #define getSkinVertex(vertex,normal) (vertex)
   #define getSkinNormal(normal) (normal)
#endif
`;
